<template>
  <q-page padding>
    <div v-if="brand.name" class="row">
      <div class="col-12 text-center text-h6">
        {{ brand.name }}
      </div>
    </div>
    <div class="row">
      <q-select outlined v-model="categoryId" :options="optionsCategories" option-label="name" option-value="id"
        map-options emit-value clearable label="Category" class="col-3" dense
        @update:model-value="handleListProducts(route.params.id)" />
      {{ categoryId }}
      <q-table class="col-12" title="Treats" :rows="products" :columns="columnsProduct" row-key="calories"
        :loading="loading" :filter="filter" grid v-model:pagination="initialPagination" hide-pagination>

        <template v-slot:top>
          <span class="text-h6">
            Products
          </span>
          <q-space />
          <q-input outlined dense debounce="300" v-model="filter" placeholder="Search" class="q-mr-sm">
            <template v-slot:append>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </template>

        <template v-slot:item="props">
          <transition-group
            appear
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated fadeOutRight"
          >
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3" key="card">
            <q-card class="cursor-pointer" v-ripple:primary @click="handleShowDetails(props.row)">
              <img :src="props.row.img_url" :ratio="4/3">
              <q-card-section class="text-center">
                <div class="text-h6">{{ props.row.name }}</div>
                <div class="subtitle2">{{ formatCurrency(props.row.price) }}</div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12" v-if="props.rowIndex === 3 && brand.paralax_url" key="paralax">
            <q-parallax :height="200" :speed="0.5">
              <template v-slot:media>
                <img :src="brand.paralax_url">
              </template>

              <h3 class="text-white">{{brand.name}}</h3>
            </q-parallax>
          </div>
        </transition-group>
        </template>

      </q-table>
    </div>
    <div class="row justify-center q-mt-md">
      <q-pagination v-model="initialPagination.page" :max="pagesNumber" direction-links
        @update:model-value="handleScrollToTop" />
    </div>
    <dialog-product-details :show="showDialogDetails" :product="productDetails"
      @hide-dialog="showDialogDetails = false" />
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import useProductService from 'src/services/product'
import useNotify from 'src/composables/UseNotify'
import { columnsProduct, initialPagination } from './table'
import { useRoute } from 'vue-router'
import { formatCurrency } from 'src/Utils/format'
import DialogProductDetails from 'components/DialogProductDetails.vue'
import useApi from 'src/composables/UseApi'

const { notifyError } = useNotify()
const products = ref([])
const loading = ref(true)
const { listPublic } = useProductService()
const route = useRoute()
const filter = ref('')
const showDialogDetails = ref(false)
const productDetails = ref({})
const { brand } = useApi('config')
const { list } = useApi('category')
const optionsCategories = ref([])
const categoryId = ref('')

const handleListProducts = async (idUser) => {
  try {
    loading.value = true
    products.value = categoryId.value ? await listPublic(idUser, 'category_id', categoryId.value) : await listPublic(idUser)
    loading.value = false
  } catch (error) {
    notifyError(error.message)
  }
}

const handleShowDetails = (product) => {
  productDetails.value = product
  showDialogDetails.value = true
}

const handleListCategories = async () => {
  optionsCategories.value = await list()
}

const pagesNumber = computed(() => Math.ceil(products.value.length / initialPagination.value.rowsPerPage))
const handleScrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
onMounted(() => {
  if (route.params.id) {
    handleListCategories()
    handleListProducts(route.params.id)
  }
})
defineOptions({
  name: 'PageProductPublic',
  components: {
    DialogProductDetails
  }
})
</script>
