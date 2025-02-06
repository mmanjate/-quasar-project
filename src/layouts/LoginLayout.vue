<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Quasar Estoque
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted } from 'vue'
import useApi from 'src/composables/UseApi'

const { getBrand } = useApi('config')

defineOptions({
  name: 'LoginLayout'
})
onMounted(() => {
  getBrand()
})
</script>
