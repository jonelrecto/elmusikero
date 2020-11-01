<template>
  <q-page padding>
    <!-- <q-btn color="primary" icon="check" label="OK" @click="test" /> -->
    <q-table
      title="My Orders"
      :data="orders"
      :columns="columns"
      row-key="name"
    >

      <template v-slot:body-cell-actions="props">
        <q-tr :props="props">
          <q-td key="actions" :props="props">
            <div class="q-gutter-sm">
              <q-btn size="sm" color="info" round icon="list_alt" @click="viewOrderList(props.row)" >
                <q-tooltip>
                  View Orders
                </q-tooltip>
              </q-btn>

            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-dialog v-model="viewOrderListDialog" maximized>
      <q-card>
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold">Cart List</span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <view-order-list :cartList="toViewCart"></view-order-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
import ViewOrderList from '../../components/products/ViewOrderList'

export default {
  components: {
    ViewOrderList
  },
  mounted () {
    this.$dbCon.authenticate()
      .then(resp => {
        console.log(resp.user, 'user auth')
        this.user = resp.user

        let params = {
          query: {
            userId: resp.user._id
          }
        }
        console.log(params, 'prams')

        let orderService = this.$dbCon.wingsService('orders', params)
        this.orderService = orderService

        orderService.on('dataChange', data => {
          console.log(data, 'orders')
          this.orders = data
        }).init()

      })

    
  },
  data () {
    return {
      user: {},
      updateOrderOptions: [
        { label: 'Processing', value: 'processing'},
        { label: 'On shipment', value: 'on shipment'},
        { label: 'Item Return', value: 'item return'},
      ],
      toUpdateOrder: {},
      updateOrderDialog: false,
      toViewCart: [],
      viewOrderListDialog: false,
      orders: [],
      orderService: null,
      columns: [
        { name: 'date', label: 'Date', field: (row) => { return this.$moment(row.createdAt).format('MMM, DD YYYY') }, align: 'left'},
        { name: 'address', label: 'Address', field: 'address', align: 'left'},
        { name: 'city', label: 'City', field: 'city', align: 'left'},
        { name: 'deliveryDate', label: 'Delivery Date', field: (row) => { return row.deliveryDate.to + ' - ' + row.deliveryDate.until}, align: 'left' },
        { name: 'status', label: 'Status', field: (row) => { return row.status.label }, align: 'left' },
        { name: 'cart', label: 'Cart', field: (row) => { return row.cartList.length + " Items"}, align: 'left' },
        { name: 'actions', label: 'Actions', align: 'left'}
      ]
    }
  },
  methods: {
    viewOrderList (order) {
      this.toViewCart = order.cartList
      this.viewOrderListDialog = true
    },
    updateOrder (order) {
      this.toUpdateOrder = this.$store.getters['BackEndModule/getPlainValue'](order)
      this.updateOrderDialog = true
    },
    updateOrderStatus () {
      let id = this.toUpdateOrder._id

      this.orderService.patch(id, {
        status: this.toUpdateOrder.status
      }).then(resp =>{
        this.$q.notify({
          message: 'Order has been updated',
          icon: 'info',
          color: 'positive'
        })
        this.updateOrderDialog = false
      })
    },
    test () {
      
      

      
    }
  }
}
</script>
