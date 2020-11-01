<template>
  <q-page>
    <div class="q-pa-md">
      
    <span class="text-h4"><q-icon color="primary" size="50px" name="mdi-basket"></q-icon>Your Basket</span>
      
    <q-table
      :data="cartList"
      :columns="columns"
      row-key="quantity"
      flat
      no-data-label="Empty Cart"
      ref="tableRefs"
    >
      <template v-slot:body="props">
        
        <q-tr :props="props">
          <!-- {{props}} -->
          <q-td key="imageSrc" :props="props">
            <!-- {{ props.row.imageSrc }} -->
            <q-img  
              :src="$store.getters['BackEndModule/getImage'](props.row.productImages[0].newNameWithPath)"
              spinner-color="red"
              style="height: 140px; width: 150px"
            />
          </q-td>
          <q-td key="desc" :props="props">{{ props.row.description.slice(0, 100) }} ... </q-td>
          <q-td key="price" :props="props">{{ props.row.price | currency}}</q-td>
          <q-td key="operation" :props="props"> X </q-td>
          <q-td key="quantity" :props="props">
            <q-input 
            @input="onChangeQuantity(props.row)"
            v-model.number="props.row.quantity"
            type="number"
            filled
            dense
            style="max-width: 200px"></q-input>
          </q-td>
          <q-td key="total" :props="props">
            {{ getItemTotal(props.row) | currency}}
          </q-td>
          <q-td key="actions" :props="props">
            <q-btn  flat color="negative" round icon="delete" @click="removeItem(props.row)"></q-btn>
          </q-td> 
        </q-tr> 
      </template>

      <template v-slot:top-right>
        <q-btn v-if="cartList.length > 0" rounded color="secondary" icon-right="mdi-arrow-right-circle" @click="$router.push('/billing')">Proceed to Checkout</q-btn>
        
      </template>

      <template v-slot:top-left>
        <span class="text-bold text-h6">Total: {{getTotal | currency}}</span>
      </template>
      <template v-slot:pagination>
        
      </template>
      
    </q-table>
    </div>
    
  </q-page>
</template>
<script>
var sampleImg = require('../../statics/carouselItems/eguitar.png')

export default {
  data () {
    return {
      columns: [
        { name: 'imageSrc', align: 'center', label: 'Item', field: 'imageSrc' },
        { name: 'desc', align: 'right', label: 'Description', field: 'desc' },
        { name: 'price', label: 'Price', field: 'price' },
        { name: 'operation', label: '' },
        { name: 'quantity', label: 'Quantity', field: 'quantity' },
        { name: 'total', label: 'Total', field: 'total' },
        { name: 'actions', label: 'Actions', field: 'actions' }
      ]
    }
  },
  computed: {
    cartList: {
      get () {
        return this.$store.getters['ClientModule/getCartList']
      },
      set (v) {
        this.$store.commit('ClientModule/updateCartList', v)
      }
    },
    getTotal () {
      return this.$store.getters['ClientModule/getTotalAmount']
      // return this.$_.sumBy(this.cartList, 'total')
    }
  },
  methods: {
    getItemTotal (row) {
      // console.log(row, 'getitemtotal')
      return row.quantity * row.price
    },
    onChangeQuantity (row) {
      let data = {...row}
      data.total = row.quantity * row.price
      let cart = this.cartList
      cart[row.__index] = data
      // console.log(this.cartList, 'list')
      // console.log(cart, 'cart')
      // this.$store.commit('ClientModule/setTotal', {index: row.__index, total: data.total})
      this.cartList = []
      this.$set(this, 'cartList', cart)
      this.$forceUpdate()
    },
    removeItem (row) {
      // let cart = this.cartList
      // cart.splice(row.__index, 1)
      // this.cartList = []
      // this.$set(this, 'cartList', cart)
      // this.$forceUpdate()
      // console.log(cart, 'row')
      this.$store.commit('ClientModule/removeCartListItem', row.__index)
    }
  }
}
</script>