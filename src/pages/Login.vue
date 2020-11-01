<template>
  <q-layout class="backgroundDesign" style="border: 1px solid black">
    <q-page-container  class="q-pa-md row q-gutter-md">
      <q-page padding class="tomiddle">
        <q-btn style="margin-left: 120px" v-if="!isShowLoginCard" size="50px" color="secondary " round icon="mdi-account" @click="isShowLoginCard = true"></q-btn>
        
        <transition
           v-else
          appear
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
        >
          <q-card >
          <q-card-section>
            <div class="items-center text-center">
             <span class="text-h3 text-weight-bold">Log In</span>
            </div>
          </q-card-section>

          <q-card-section>
             <q-input class="q-pb-md" v-model="email" filled type="email" label="Email" /> 

             <q-input v-model="password" filled :type="isPwd ? 'password' : 'text'" label="Password"  @keyup.enter="onSubmit()">
                <template v-slot:append>
                  <q-icon
                    :name="isPwd ? 'visibility_off' : 'visibility'"
                    class="cursor-pointer"
                    @click="isPwd = !isPwd"
                  />
                </template>
              </q-input>
              
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn color="secondary" class="full-width q-mt-md" label="Login" @click="onSubmit()"/>
          </q-card-actions>
        </q-card>
        </transition>
      </q-page>
    </q-page-container>
    
  </q-layout>
  
</template>

<script>
import auth from '../auth'

export default {
  name: 'Login',
  data () {
    return {
      isShowLoginCard: false,
      isPwd: false,
      email: '',
      password: ''
    }
  },
  methods: {
    onSubmit () {
      let user = {
        strategy: 'local',
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('BackEndModule/login', user)
        .then(() => {
          this.$router.push('/admin')
        })
        .catch(err => {
          this.$q.notify({
            message: err.message,
            color: 'negative'
          })
        })
    }
  }
}
</script>

<style>
.tomiddle {
    position:fixed;
    top: 50%;
    left: 50%;
    width:30em;
    height:18em;
    margin-top: -9em; /*set to a negative number 1/2 of your height*/
    margin-left: -15em; /*set to a negative number 1/2 of your width*/
}
.backgroundDesign {
  background-image: url('../assets/background_login.jpg');
  background-size: cover;
}
</style>
