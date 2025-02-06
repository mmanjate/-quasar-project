import useSupabase from 'src/boot/supabase'
import useAuthUser from './UseAuthUser'
import { v4 as uuidv4 } from 'uuid'
import { useRoute } from 'vue-router'
import useBrand from 'src/composables/UseBrand'
import { ref } from 'vue'
import { useQuasar } from 'quasar'

const brand = ref({
  name: '',
  phone: '',
  primary: '',
  secondary: '',
  paralax_url: ''
})
export default function useApi (table) {
  const { supabase } = useSupabase()
  const { user } = useAuthUser()
  const route = useRoute()
  const { setBrand } = useBrand()
  const $q = useQuasar()

  const list = async () => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
    if (error) throw error
    return data
  }

  const listPublic = async (id, columnFilter = '', filter = '') => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('user_id', id)
      .eq(columnFilter, filter)
    if (error) throw error
    return data
  }

  const fetchCount = async (table, id) => {
    const { data, error, count } = await supabase
      .from(table)
      .select('*', { count: 'exact' })
      .eq('user_id', id)
    if (error) throw error
    return {
      data,
      count
    }
  }

  const getById = async (id) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
    if (error) throw error
    return data[0]
  }

  const post = async (form) => {
    const { data, error } = await supabase
      .from(table)
      .insert([
        {
          ...form,
          user_id: user.value.id
        }
      ])
    if (error) throw error
    return data
  }

  const update = async (form) => {
    const { data, error } = await supabase
      .from(table)
      .update({
        ...form
      })
      .match({ id: form.id })
    if (error) throw error
    return data
  }

  const remove = async (id) => {
    const { data, error } = await supabase
      .from(table)
      .delete()
      .match({ id })
    if (error) throw error
    return data
  }

  const uploadImg = async (file, storage) => {
    const fileName = uuidv4()
    const { error } = await supabase
      .storage
      .from(storage)
      .upload(fileName, file, {
        cacheControl: '3600',
        upsert: false
      })
    const publicUrl = await getUrlPublic(fileName, storage)
    if (error) throw error
    return publicUrl
  }

  const getUrlPublic = async (fileName, storage) => {
    const { data, error } = await supabase
      .storage
      .from(storage)
      .getPublicUrl(fileName)
    if (error) throw error
    return data.publicUrl
  }

  const getBrand = async () => {
    const id = route.params?.id || user?.value?.id
    if (id) {
      $q.loading.show({
        backgroundColor: 'dark'
      })
      const { data, error } = await supabase
        .from('config')
        .select('*')
        .eq('user_id', id)
      if (error) throw error
      if (data.length > 0) {
        brand.value = data[0]
        setBrand(brand.value.primary, brand.value.secondary)
      }
      $q.loading.hide()
      return brand
    }
  }

  return {
    list,
    getById,
    post,
    update,
    remove,
    uploadImg,
    listPublic,
    getBrand,
    brand,
    fetchCount
  }
}
