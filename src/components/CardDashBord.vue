<template>
    <q-card class="my-card" bordered v-ripple:primary>
      <q-skeleton height="50px" v-if="load" />
        <q-card-section horizontal v-else>
            <div class="col flex flex-center text-h5 ">
             {{ count }} - {{ props.label }}
            </div>
            <q-card-actions vertical class="justify-around q-px-md">
                <q-btn flat round color="primary" :icon="props.icon" />
            </q-card-actions>
        </q-card-section>
    </q-card>
</template>
<script setup>
import useAuthUser from 'src/composables/UseAuthUser'
import { ref, onMounted } from 'vue'
import useApi from 'src/composables/UseApi'

defineOptions({
  name: 'CardDashboard'
})

const props = defineProps({
  table: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: false,
    default: 'mdi-database-outline'
  }
})

const count = ref(0)
const { user } = useAuthUser()
const { fetchCount } = useApi('category')
const load = ref(true)

onMounted(async () => {
  const response = await fetchCount(props.table, user.value.id)
  count.value = response.count
  load.value = false
})
</script>
