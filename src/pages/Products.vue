<template>
  <q-page class="">

     <q-tabs
        v-model="tab"
        no-caps
        dense
        class="bg-secondary text-white shadow-2 full-width"
      
      >
        <q-tab name="all" label="All" />
        <q-tab name="guitar" label="Guitar" />
        <q-tab name="drums" label="Drums" />
      </q-tabs>

    <product-list></product-list>
  </q-page>
</template>

<style>
</style>

<script>
// import Products from '../components/products/Products'
import ProductList from '../components/products/ProductList'

export default {
  name: 'Products',
  components: {
    // Products: 'products',
    ProductList
  },
  data () {
    return {
      tab: ''
    }
  }
}
</script>
<style scoped>

</style>
