import { formatCurrency } from 'src/Utils/format'
import { ref } from 'vue'
const columnsProduct = [
  { name: 'img_url', align: 'left', label: 'Imagem', field: 'img_url', sortable: false },
  { name: 'name', align: 'left', label: 'name', field: 'name', sortable: true },
  { name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: true },
  { name: 'price', align: 'left', label: 'Price', field: 'price', format: (val) => formatCurrency(val), sortable: true },
  { name: 'actions', align: 'right', label: 'Actins', field: 'actions' }
]

const initialPagination = ref({
  page: 1,
  rowsPerPage: 8
})

export {
  columnsProduct,
  initialPagination
}
