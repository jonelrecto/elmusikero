<template>
  <q-page>
    <div class="q-pa-md flex justify-center">
      <q-stepper v-model="step" 
      alternative-labels ref="stepper" color="primary" animated style="max-width: 700px; width: 100%">
        <q-step :name="1" title="Sign In" icon="settings" :done="step > 1" :header-nav="step > 1" >
          
          <div class="flex justify-center">
            <q-card flat class="my-card">
            <q-card-section>
              <div class="flex item-start self-center justify-left">
                <q-radio v-model="optSigninMethod" val="signin" label="Sign In" />
                <q-radio v-model="optSigninMethod" val="signup" label="Create an account" />
              </div>
              <sign-in v-if="optSigninMethod === 'signin'"></sign-in>
              <sign-up v-else> </sign-up>
            </q-card-section>
          </q-card>
          </div>
        </q-step>

        <q-step :name="2" title="Your Details" icon="create_new_folder" :done="step > 2" :header-nav="step > 2">
          <client-details></client-details>
        </q-step>

        <q-step :name="3" title="Payment" icon="add_comment" :done="step > 3" :header-nav="step > 3">
          <payment></payment>  
        </q-step>

        <q-step :name="4" title="Complete Order" icon="add_comment" :header-nav="step > 4">
          <complete-order></complete-order>
        </q-step>
      </q-stepper>
    </div>
  </q-page>
</template>
<script>
  import SignUp from '../../components/Signup'
  import SignIn from '../../components/Signin'
  import ClientDetails from '../client/ClientDetails'
  import Payment from '../client/Payment'
  import CompleteOrder from '../client/CompleteOrder.vue'

  export default {
    components: {
      SignUp,
      SignIn,
      ClientDetails,
      Payment,
      CompleteOrder
    },
    created () {
      if (this.isLoggedIn) {
        this.$store.commit('ClientModule/nextStep', 2)
      } else {
        this.$store.commit('ClientModule/nextStep', 1)
      }
    },
    mounted () {
      // console.log(this.$store, 'step')
    },
    computed: {
      step: { 
        get () {
          return this.$store.state.ClientModule.billingStep
        },
        set (v) {
          this.$store.commit('ClientModule/nextStep', v)
        }
      },
      isLoggedIn () {
        return this.$store.getters['BackEndModule/isLoggedIn']
      }
    },
    data() {
      return {
        // step: 4,
        optSigninMethod: 'signin'
      }
    },
    beforeDestroy () {
      this.$store.commit('ClientModule/clearDetails')
    }
  }
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 500px
}

</style>
