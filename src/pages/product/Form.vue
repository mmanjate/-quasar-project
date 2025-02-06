<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center" >
        <p class="text-h6">
          Form Protuct
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-lg" @submit.prevent="handleSubmit">
        <q-input
          label="Imagem"
          stack-label
          v-model="img"
          type="file"
          accept="image/*"
        />
        <q-input
          label="Name"
          v-model="form.name"
          :rules=" [val => (val && val.length > 0) || 'Name is required']"
        />
        <q-editor
          v-model="form.discription"
          min-height="5rem"
        />
        <q-input
          label="Amount"
          v-model="form.amount"
          type="number"
          :rules=" [val => !!val || 'Amount is required']"
        />
        <q-input
          label="Price"
          v-model="form.price"
          :rules=" [val => !!val || 'Price is required']"
          prefix="R$"
        />
        <q-select
          v-model="form.category_id"
          :options="optionsCategory"
          label="Category"
          option-value="id"
          option-label="name"
          map-options
          emit-value
          :rules="[val => !!val || 'category is required' ] "
        />
        <q-btn
          :label="isUpdate ? 'Updade' : 'Save'"
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
          :to="{ name: 'product' }"
          rounded
          flat
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import useProductService from 'src/services/product'
import useNotify from 'src/composables/UseNotify'
import useCategoryService from 'src/services/category'

const route = useRoute()
const router = useRouter()
const { post, getById, update, uploadImg } = useProductService()
const { notifySuccess, notifyError } = useNotify()
const isUpdate = computed(() => route.params.id)
const { list } = useCategoryService()

let product = {}
const form = ref({
  name: '',
  discription: '',
  amount: 0,
  price: 0,
  category_id: '',
  img_url: ''
})
const optionsCategory = ref([])
const img = ref([])

const handleListCategories = async () => {
  try {
    optionsCategory.value = await list()
  } catch (error) {
    notifyError(error.message)
  }
}
const handleSubmit = async () => {
  try {
    if (img.value.length > 0) {
      const imgUrl = await uploadImg(img.value[0], 'products')
      form.value.img_url = imgUrl
    }
    if (isUpdate.value) {
      await update(form.value)
      notifySuccess('Update Successfully')
    } else {
      await post(form.value)
      notifySuccess('Save Successfully')
    }
    router.push({ name: 'product' })
  } catch (error) {
    notifyError(error.message)
  }
}

const handleProductById = async (id) => {
  try {
    product = await getById(id)
    form.value = product
  } catch (error) {
    notifyError(error.message)
  }
}
onMounted(() => {
  handleListCategories()
  if (isUpdate.value) {
    handleProductById(isUpdate.value)
  }
})
defineOptions({
  name: 'PageForm'
})
</script>
