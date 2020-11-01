<template>
  <div>
    <q-form @submit="onSubmit" class="q-gutter-md" ref="formRef">
      <q-input filled :value="clientDetails.firstName" label="First Name *" lazy-rules
      @input="updateFirstName"
        :rules="[ val => val && val.length > 0 || 'Please enter your first name']" />

      <q-input filled :value="clientDetails.lastName" label="Last Name *" lazy-rules
        @input="updateLastName"
        :rules="[ val => val && val.length > 0 || 'Please enter your last name']" />

      <q-input filled :value="clientDetails.contactNo" label="Contact No *" lazy-rules
       mask="(+63) ##########"
        hint="(+63) ##########"
        @input="updateContactNo"
        :rules="[ val => val && val.length > 0 || 'Please enter your contact number']" />

      <q-input filled type="textarea" :value="clientDetails.address" label="Address *" lazy-rules
      @input="updateAddress"
        :rules="[ val => val && val.length > 0 || 'Please enter your address']" />

      <q-input filled :value="clientDetails.city" label="City *" lazy-rules
      @input="updateCity"
        :rules="[ val => val && val.length > 0 || 'Please enter your city address']" />



      <div>
        <p>Required fields *</p>
        <q-btn label="Proceed to Payment" type="submit" color="primary" />
      </div>
    </q-form>
  </div>
</template>
<script>
export default {
  created () {
    this.$dbCon.authenticate()
      .then(resp => {
        this.$store.commit('ClientModule/setClientDetailsUserId', resp.user._id)
        this.$store.commit('ClientModule/setClientDetailsFirstName', resp.user.firstName)
        this.$store.commit('ClientModule/setClientDetailsLastName', resp.user.lastName)
        this.$store.commit('ClientModule/setClientDetailsEmail', resp.user.email)
      })
  },
  data () {
    return {
    }
  },
  computed: {
    clientDetails: {
      get () {
        return this.$store.getters['ClientModule/getClientDetails']
      },
      set (v) {
        this.$store.commit('ClientModule/setClientDetails', v)
      }
    }
  },
  methods: {
    updateFirstName (v) {
      this.$store.commit('ClientModule/setClientDetailsFirstName', v)
    },
    updateLastName (v) {
      this.$store.commit('ClientModule/setClientDetailsLastName', v)
    },
    updateContactNo (v) {
      this.$store.commit('ClientModule/setClientDetailsContactNo', v)
    },
    updateAddress (v) {
      this.$store.commit('ClientModule/setClientDetailsAddress', v)
    },
    updateCity (v) {
      this.$store.commit('ClientModule/setClientDetailsCity', v)
    },
    onSubmit () {
      // console.log(this.$refs.formRef)
      this.$store.commit('ClientModule/nextStep', 3)
    }
  } 
}
</script>
