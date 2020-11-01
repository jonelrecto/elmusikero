<template>
  <div class="flex justify-center">
    <q-card flat class="my-card">
      <q-card-section>
        <div class="text-h6">Payment Details</div>
      </q-card-section>

      <q-card-section>
        <q-form   @submit="onSubmit" class="q-gutter-md">
          <q-input filled v-model="cardDetails.cardNumber" label="Card Number *" lazy-rules
          mask="#### - #### - #### - ####"
          placeholder="#### - #### - #### - ####"
            :rules="[ val => val && val.length > 0 || 'Please enter card number']" />

          
            <div>
              <p class="text-body1" >Expiry Date</p> 
              <div class="row flex items-center ">
                <q-select class="col q-mr-md" v-model="cardDetails.expireDate.month" :options="monthOpts" label="Month" />
                <q-select class="col" v-model="cardDetails.expireDate.year" :options="yearOpts" label="Year" />
              </div>
              
            </div>

          <q-input filled v-model="cardDetails.verificationNo" label="Verification No *" lazy-rules mask="####"
            :rules="[ val => val && val.length > 0 || 'Please enter verification number']" />
          

          <div>
            <p>Required fields *</p>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Back"  flat  @click="$store.commit('ClientModule/nextStep', 2)"/>
          </div>
        </q-form>
      </q-card-section>


      <q-inner-loading :showing="paymentProcess">
        <q-spinner-tail
          color="primary"
          size="2em"
        />
        Processing Payment
      </q-inner-loading>
    </q-card>
  </div>
</template>
<script>
var sampleImg = require('../../statics/carouselItems/eguitar.png')

export default {
  data () {
    return {
      paymentProcess: false,
      options: [],
      cardNumber: '',
      expiryDate: {
        month: '',
        year: ''
      },
      verificationNumber: ''
    }
  },
  computed: {
    monthOpts () {
      var months = []
      for (var i = 1; i <= 12; i++) {
        months.push({ label: i, value: i})
      }
      return months
    },
    yearOpts () {
      let years = []
      for (var i = 2030; i >= 2010; i--) {
        years.push({ label: i, value: i })
      }
      return years
    },
    cardDetails: {
      get () {
        return this.$store.getters['ClientModule/getCardDetails']
      },
      set (v) {
        // this.$store.commit('ClientModule/setCardDetails', v)
        // console.log(this.$store, 'store')
        this.$store.state.ClientModule.cardDetails = v
      }
    }
  },
  methods: {
    onSubmit () {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Confirm Payment?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.paymentProcess = true
        setTimeout(() => {
          this.$store.dispatch('ClientModule/processOrder')
            .then((resp) => {
              this.paymentProcess = false
              this.$q.notify({
                message: 'Payment Successful',
                color: 'positive'
              })
              this.$store.commit('ClientModule/nextStep', 4)
            })
            .catch(err => {
              console.log(err, 'err')
              this.$q.notify({
                message: err.message,
                color: 'negative'
              })
            })
          
        }, 5000);
      })
      
    }
  }
}
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 600px  
}
</style>
