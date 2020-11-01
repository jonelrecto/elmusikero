<template>
  <div class="flex flex-center">
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
            {{props.row.quantity}}
            <!-- <q-input 
            @input="onChangeQuantity(props.row)"
            v-model.number="props.row.quantity"
            type="number"
            filled
            dense
            style="max-width: 200px"></q-input> -->
          </q-td>
          <q-td key="total" :props="props">
            {{ getItemTotal(props.row) | currency}}
          </q-td>

        </q-tr> 
      </template>

      <template v-slot:pagination>
        
      </template>
      
    </q-table>
  </div>
</template>
<script>
export default {
  props: {
    cartList: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      columns: [
        { name: 'imageSrc', align: 'center', label: 'Item', field: 'imageSrc' },
        { name: 'desc', align: 'right', label: 'Description', field: 'desc' },
        { name: 'price', label: 'Price', field: 'price' },
        { name: 'operation', label: '' },
        { name: 'quantity', label: 'Quantity', field: 'quantity' },
        { name: 'total', label: 'Total', field: 'total' }
      ]
    }
  },
  computed: {
    getTotal () {
      return this.$store.getters['ClientModule/getTotalAmount']
      // return this.$_.sumBy(this.cartList, 'total')
    },
  },
  methods: {
    getItemTotal (row) {
      // console.log(row, 'getitemtotal')
      return row.quantity * row.price
    },
  }
}
</script>