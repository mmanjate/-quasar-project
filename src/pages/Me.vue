<template>
  <q-page padding>
    <div class="row q-col-gutter-md">
      <div class="col-md-4 col-xs-12 col-sm-6" >
        <card-dash-bord
          table="category"
          :label="cat"
          icon="mdi-shape-outline"
        />
      </div>
      <div class="col-md-4 col-xs-12 col-sm-6" >
        <card-dash-bord
          table="product"
          label="Products"
          icon="mdi-archive"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import CardDashBord from 'src/components/CardDashBord.vue'

defineOptions({
  name: 'PageMe'
})
const cat = 'Categories'
</script>
