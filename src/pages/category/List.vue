<template>
    <q-page padding>
        <div class="row">
            <q-table
              class="col-12"
              title="Treats"
              :rows="categories"
              :columns="columnsCategory"
              row-key="calories"
              :loading="loading">

              <template v-slot:top>
                <span class="text-h6">
                  Category
                </span>
                <q-space/>
                <q-btn
                 class="desktop-only"
                 label="Add New"
                 color="primary"
                 icon="mdi-plus-box-multiple-outline"
                 dense
                 :to="{ name: 'form-category' }"
                 />
              </template>

              <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="q-gutter-x-sm" >
                  <q-btn icon="mdi-pencil-box-multiple" color="info" dense size="sm" @click="handleUpdateCategory(props.row)">
                    <q-tooltip>
                      Edit
                    </q-tooltip>
                  </q-btn>
                  <q-btn icon="mdi-delete-forever" color="negative" dense size="sm" @click="handleDeleteCategory(props.row)">
                    <q-tooltip>
                      Delete
                    </q-tooltip>
                  </q-btn>
                </q-td>
             </template>
            </q-table>
        </div>
        <q-page-sticky
          position="bottom-right"
          :offset="[18, 18]"
        >
            <q-btn
             class="mobile-only"
             fab
             icon="mdi-plus-box-multiple-outline"
             color="primary"
             :to="{ name: 'form-category' }"
             />
          </q-page-sticky>
    </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import useCategoryService from 'src/services/category'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { columnsCategory } from './table'

const { notifyError, notifySuccess } = useNotify()
const categories = ref([])
const loading = ref(true)
const { list, remove } = useCategoryService()
const router = useRouter()
const $q = useQuasar()

const handleListCategories = async () => {
  try {
    loading.value = true
    categories.value = await list()
    loading.value = false
  } catch (error) {
    notifyError(error.message)
  }
}

const handleUpdateCategory = async (category) => {
  router.push({ name: 'form-category', params: { id: category.id } })
}
const handleDeleteCategory = async (category) => {
  try {
    $q.dialog({
      title: 'Confirm',
      message: `Do you really want delete ${category.name} ?`,
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await remove(category.id)
      handleListCategories()
      notifySuccess('Removed with Successfull')
    })
  } catch (error) {
    notifyError(error.message)
  }
}
onMounted(() => {
  handleListCategories()
})
defineOptions({
  name: 'PageList'
})
</script>
