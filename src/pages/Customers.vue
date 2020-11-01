<template>
  <q-page padding>
    <!-- content -->
    <customer-list></customer-list>
  </q-page>
</template>

<script>
import CustomerList from '../components/Customers/CustomerList'
export default {
  name: 'customers',
  components: {
    CustomerList
  }
}
</script>

<style>
</style>
