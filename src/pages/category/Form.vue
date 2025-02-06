<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-12 text-center" >
        <p class="text-h6">
          Form Category
        </p>
      </div>
      <q-form class="col-md-7 col-xs-12 col-sm-12 q-gutter-y-lg" @submit.prevent="handleSubmit">
        <q-input
          label="Name"
          v-model="form.name"
          :rules=" [val => (val && val.length > 0) || 'Name is required']"
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
          :to="{ name: 'category' }"
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
import useCategoryService from 'src/services/category'
import useNotify from 'src/composables/UseNotify'

const route = useRoute()
const router = useRouter()
const { post, getById, update } = useCategoryService()
const { notifySuccess, notifyError } = useNotify()
const isUpdate = computed(() => route.params.id)

let category = {}
const form = ref({
  name: ''
})

const handleSubmit = async () => {
  try {
    if (isUpdate.value) {
      await update(form.value)
      notifySuccess('Update Successfully')
    } else {
      await post(form.value)
      notifySuccess('Save Successfully')
    }
    router.push({ name: 'category' })
  } catch (error) {
    notifyError(error.message)
  }
}

const handleById = async (id) => {
  try {
    category = await getById(id)
    form.value = category
  } catch (error) {
    notifyError(error.message)
  }
}
onMounted(() => {
  if (isUpdate.value) {
    handleById(isUpdate.value)
  }
})
defineOptions({
  name: 'PageForm'
})
</script>
