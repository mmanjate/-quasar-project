<template>
  <q-dialog
    :full-width="$q.platform.is.mobile"
    :model-value="show"
    @before-hide="handleClose"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          Details
        </div>
      </q-card-section>

      <q-card-section>
        <q-img :src="product.img_url" :ratio="4/3" style="min-width: 300px" />
      </q-card-section>

      <q-card-section>
        <div class="text-h6" >
          {{ product.name }}
        </div>
        <div class="text-subtitle2">
          {{ formatCurrency(product.price) }}
        </div>
        <div class="text-body2" v-html="product.discription"></div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Cancel" color="primary" outline v-close-popup />
        <q-btn v-if="brand.phone" label="BUY ON WHATSAPP" icon="mdi-whatsapp" color="green-7" @click="handleSendWapp" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { formatCurrency } from 'src/Utils/format'
import { openURL } from 'quasar'
import useApi from 'src/composables/UseApi'

const msg = 'Ola, Fiquei Interressado no teu produto'
const { brand } = useApi('config')

defineOptions({
  name: 'DialogProductDetails'
})
const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  product: {
    type: Object
  }
})

const emit = defineEmits(['hideDialog'])
const handleSendWapp = () => {
  const link = encodeURI(`https://api.whatsapp.com/send?phone=258${brand.value.phone}&text=${msg} - ${props.product.name} - ${formatCurrency(props.product.price)}`)
  openURL(link)
}
const handleClose = () => {
  emit('hideDialog')
}
</script>
