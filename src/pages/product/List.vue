<template>
    <q-page padding>
        <div class="row">
            <q-table
              class="col-12"
              title="Treats"
              :rows="products"
              :columns="columnsProduct"
              v-model:pagination="initialPagination"
              row-key="calories"
              :loading="loading"
              hide-pagination>

              <template v-slot:top>
                <span class="text-h6">
                  Products
                </span>
                <q-btn
                label="My Store"
                dense
                size="sm"
                outline
                class="q-ml-sm"
                icon="mdi-store"
                color="primary"
                @click="handleGoToStore"/>

                <q-btn
                label="Copy Link"
                dense
                size="sm"
                outline
                class="q-ml-sm"
                icon="mdi-content-copy"
                color="primary"
                @click="handleCopyPublicUrl"/>

                <q-space/>
                <q-btn
                 class="desktop-only"
                 label="Add New"
                 color="primary"
                 icon="mdi-plus-box-multiple-outline"
                 dense
                 :to="{ name: 'form-product' }"
                 />
              </template>
              <template v-slot:body-cell-img_url="props">
                <q-td :props="props">
                  <q-avatar v-if="props.row.img_url">
                    <img :src="props.row.img_url">
                  </q-avatar>
                  <q-avatar v-else color="grey" text-color="white" icon="mdi-image-off" />
                </q-td>
              </template>
              <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="q-gutter-x-sm" >
                  <q-btn icon="mdi-pencil-box-multiple" color="info" dense size="sm" @click="handleUpdateProduct(props.row)">
                    <q-tooltip>
                      Edit
                    </q-tooltip>
                  </q-btn>
                  <q-btn icon="mdi-delete-forever" color="negative" dense size="sm" @click="handleDeleteProduct(props.row)">
                    <q-tooltip>
                      Delete
                    </q-tooltip>
                  </q-btn>
                </q-td>
             </template>
            </q-table>
        </div>
        <div class="row justify-center q-mt-md">
              <q-pagination
                v-model="initialPagination.page"
                :max="pagesNumber"
                direction-links
                @update:model-value="handleScrollToTo"
              />
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
             :to="{ name: 'form-product' }"
             />
          </q-page-sticky>
    </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import useProductService from 'src/services/product'
import useNotify from 'src/composables/UseNotify'
import { useRouter } from 'vue-router'
import { useQuasar, openURL, copyToClipboard } from 'quasar'
import { columnsProduct, initialPagination } from './table'
import useAuthUser from 'src/composables/UseAuthUser'

const { notifyError, notifySuccess } = useNotify()
const products = ref([])
const loading = ref(true)
const { listPublic, remove } = useProductService()
const router = useRouter()
const $q = useQuasar()
const user = useAuthUser()

const handleListProducts = async () => {
  try {
    loading.value = true
    products.value = await listPublic(user.user.value.id)
    loading.value = false
  } catch (error) {
    notifyError(error.message)
  }
}

const handleUpdateProduct = async (product) => {
  router.push({ name: 'form-product', params: { id: product.id } })
}
const handleDeleteProduct = async (product) => {
  try {
    $q.dialog({
      title: 'Confirm',
      message: `Do you really want delete ${product.name} ?`,
      cancel: true,
      persistent: true
    }).onOk(async () => {
      await remove(product.id)
      handleListProducts()
      notifySuccess('Removed with Successfull')
    })
  } catch (error) {
    notifyError(error.message)
  }
}
const handleGoToStore = async () => {
  const idUser = user.user.value.id
  const link = router.resolve({ name: 'product-public', params: { id: idUser } })
  openURL(window.origin + link.href)
}
const handleCopyPublicUrl = () => {
  const idUser = user.user.value.id
  const link = router.resolve({ name: 'product-public', params: { id: idUser } })
  const externalLink = window.origin + link.href
  copyToClipboard(externalLink)
    .then(() => {
      notifySuccess('Successfullly copied')
    })
    .catch(() => {
      notifyError('Error copied link')
    })
}
const pagesNumber = computed(() => Math.ceil(products.value.length / initialPagination.value.rowsPerPage))
const handleScrollToTo = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
onMounted(() => {
  handleListProducts()
})
defineOptions({
  name: 'PageProductList'
})
</script>
