<template>
  <div>
    <q-card flat bordered >
      <q-card-section>
        <div class="text-h6">Your Details</div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col">
            <p>First Name: {{ clientDetails.firstName }} </p>
            <p>Last Name: {{ clientDetails.lastName }} </p>
            <p>Email: {{ clientDetails.email }} </p>
            <p>Contact No:  {{ clientDetails.contactNo }}</p>
          </div>
          <div class="col">
            <div style="word-wrap: break-word">
              <p>Delivery Address: {{ clientDetails.address }} </p>
            </div>
            
            <p>Delivery Date: {{ getDateDeliverTo }} - {{getDateDeliverUntil}} </p>    
          </div>
        </div>
        
        
      </q-card-section>

      <q-separator inset />

     <q-card-section>
        <div class="text-h6">Order Details</div>
        <q-table
          :data="cartList"
          :columns="columns"
          row-key="imageSrc"
          flat
          hide-bottom
          hide-header
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <!-- {{props}} -->
              <q-td key="imageSrc" :props="props">
                <!-- {{ props.row.imageSrc }} -->
                <q-img  
                  :src="$store.getters['BackEndModule/getImage'](props.row.productImages[0].newNameWithPath)"
                  spinner-color="red"
                  style="height: 140px; width: 100px"
                />
              </q-td>
              <q-td key="desc" :props="props">{{ props.row.productName }}</q-td>
              <q-td key="price" :props="props">{{ props.row.price | currency}}</q-td>
              <q-td key="operation" :props="props"> X </q-td>
              <q-td key="quantity" :props="props">{{ props.row.quantity}}</q-td>
              <q-td key="total" :props="props">
               {{ props.row.total | currency}}
              </q-td> 
            </q-tr> 
          </template>


          <template v-slot:top-left>
            <span class="text-bold text-h6">Total Payment: {{ $store.getters['ClientModule/getTotalAmount'] | currency}}</span>
          </template>
        </q-table>
      </q-card-section>

      <q-card-actions vertical>
        <q-btn color="secondary" @click="finishOrder">Finish</q-btn>
        <!-- <q-btn flat @click="$store.commit('ClientModule/nextStep', 3)" color="secondary">Back</q-btn> -->

      </q-card-actions>
    </q-card>
  </div>
</template>
<script>
import { date } from 'quasar'
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
        { name: 'total', label: 'Total', field: 'total' }
      ]
    }
  },
  computed: {
    cartList () {
      return this.$store.getters['ClientModule/getCartList']
    },
    getDateDeliverTo () {
      return this.$store.getters['ClientModule/getDateDeliverTo']
    },
    getDateDeliverUntil () {
      // let assignDate = date.addToDate(this.getDateDeliverTo, { days: 7})
      // return date.formatDate(assignDate, 'MMM DD')
      return this.$store.getters['ClientModule/getDateDeliverUntil']
    },
    clientDetails () {
      return this.$store.getters['ClientModule/getClientDetails']
    }
  },
  methods: {
    finishOrder () {
      console.log('heheh')
      this.$q.dialog({
        title: 'Finish Order',
        message: 'Thank you for shopping with us!'
      }).onOk(() => {
        // console.log('OK')
        this.$router.push('/')
      })
    }
  }
}
</script>
