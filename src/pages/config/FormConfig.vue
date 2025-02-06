<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center" >
        <p class="text-h6">
          Form Config
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-lg" @submit.prevent="handleSubmit">
        <q-input
          label="Story Name"
          v-model="form.name"
          :rules=" [val => (val && val.length > 0) || 'Name is required']"
        />
        <q-input
          label="Phone"
          v-model="form.phone"
          mask="(##) ####-####"
          unmasked-value
        />
        <q-input
          label="Imagem Paralax"
          stack-label
          v-model="paralax"
          type="file"
          accept="image/*"
        />
        <div class="row justify-center q-gutter-md q-pa-md">
          <q-color v-model="form.primary" class="col-md-4 col-sm-12 col-xs-12" />
          <q-color v-model="form.secondary" class="col-md-4 col-sm-12 col-xs-12" />
        </div>
        <q-btn
          :label="form.id ? 'Updade' : 'Save'"
          color="primary"
          :icon="isUpdate ? 'mdi-update' : 'mdi-content-save-all'"
          type="submit"
          class="full-width"
          rounded
        />
        <q-btn
          label="Cancel"
          color="primary"
          icon="mdi-close-circle"
          class="full-width"
          :to="{ name: 'category' }"
          rounded
          flat
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import useNotify from 'src/composables/UseNotify'
import useBrand from 'src/composables/UseBrand'
import useApi from 'src/composables/UseApi'
import useAuthUser from 'src/composables/UseAuthUser'
import useProductService from 'src/services/product'

const table = 'config'
const router = useRouter()
const { notifySuccess, notifyError } = useNotify()
const { post, update, listPublic } = useApi(table)
const { setBrand } = useBrand()
const user = useAuthUser()
const { uploadImg } = useProductService()

let config = {}
const paralax = ref([])
const form = ref({
  name: '',
  phone: '',
  primary: '',
  secondary: '',
  paralax_url: ''
})

const handleSubmit = async () => {
  try {
    if (paralax.value.length > 0) {
      const paralaxUrl = await uploadImg(paralax.value[0], 'paralax')
      form.value.paralax_url = paralaxUrl
    }
    if (form.value.id) {
      await update(form.value)
      notifySuccess('Update Successfully')
    } else {
      await post(form.value)
      notifySuccess('Save Successfully')
    }
    setBrand(form.value.primary, form.value.secondary)
    router.push({ name: 'me' })
  } catch (error) {
    notifyError(error.message)
  }
}

const handleGetConfig = async () => {
  try {
    config = await listPublic(user.user.value.id)
    form.value = config[0]
  } catch (error) {
    notifyError(error.message)
  }
}

onMounted(() => {
  handleGetConfig()
})
defineOptions({
  name: 'PageFormConfig'
})
</script>
