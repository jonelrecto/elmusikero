
<template>
  <q-page padding>
    <q-table
      title="Order List"
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

              <q-btn size="sm" color="accent" round icon="update" @click="updateOrder(props.row)">
                <q-tooltip>
                  Update Status
                </q-tooltip>
              </q-btn>

              <q-btn size="sm" color="positive" round icon="done" @click="finishOrder(props.row)">
                <q-tooltip>
                  Finish Order
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

    <q-dialog v-model="updateOrderDialog" persistent>
      <q-card>
        <q-toolbar>
          <q-toolbar-title><span class="text-weight-bold">Update Status Order</span></q-toolbar-title>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-toolbar>
        <q-card-section>
          <q-select filled v-model="toUpdateOrder.status" :options="updateOrderOptions" label="Status" />
        </q-card-section>
        <q-card-actions align="right">
          <div class="text-right">
            <q-btn label="Update" color="positive" @click="updateOrderStatus"></q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>
<script>
import ViewOrderList from '../components/products/ViewOrderList'

export default {
  components: {
    ViewOrderList
  },
  mounted () {
    let params = {
      query: {
        ['status.value']: {
          $ne: 'delivered'
        }
        
      }
    }

    let config = {
      channels: [
        {
          prop: 'status.value',
          value: (val) => val.value != 'delivered'
        }
      ]
    }
    let orderService = this.$dbCon.wingsService('orders', params, config)
    this.orderService = orderService

    orderService.on('dataChange', data => {
      console.log(data, 'orders')
      this.orders = data
    }).init()
  },
  data () {
    return {
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
        { name: 'fullName', label: 'Full Name', field: (row) => { return row.lastName + ', ' + row.firstName}, align: 'left'},
        { name: 'address', label: 'Address', field: 'address', align: 'left'},
        { name: 'city', label: 'City', field: 'city', align: 'left'},
        { name: 'contactNo', label: 'Contact No', field: 'contactNo', align: 'left' },
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
    finishOrder (order) {

      this.$q.dialog({
        title: 'Finish Order',
        message: 'Confirm order delivered?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        let id = order._id
        this.orderService.patch(id, {
          status: { label: 'Delivered', value: 'delivered'}
        }).then(() => {
          this.$q.notify({
            message: 'Order has been done',
            icon: 'info',
            color: 'positive'
          })
        }).catch(err => {
          console.log(err, 'error')
          this.$q.notify({
            message: 'An error occur',
            icon: 'error',
            color: 'negative'
          })
        })
      })

      
    }
  }
}
</script>