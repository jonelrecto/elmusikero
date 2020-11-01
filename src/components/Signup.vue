<template>
  <div class="q-pa-md q-gutter-sm">
    <!-- <q-btn @click="test">test</q-btn> -->
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
      ref="formRef"
    >
      <q-input
        filled
        v-model="user.firstName"
        label="First Name *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your first name']"
      />

      <q-input
        filled
        v-model="user.lastName"
        label="Last Name *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your last name']"
      />

      <q-input
        filled
        v-model="user.email"
        label="Email *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please enter your email']"
      />

       <q-input 
       label="Password" 
       v-model="user.password" 
       filled 
       :type="showPwd ? 'password' : 'text'"
        hint="Password must be max of 6 characters"
        :rules="[ val => val && val.length > 5 || 'Password must be max of 6 characters']">
        <template v-slot:append>
          <q-icon
            :name="showPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPwd = !showPwd"
          />
        </template>
      </q-input>

       <q-input 
        label="Confirm Password" 
        v-model="user.confirmPassword"
        filled 
        :type="showPwd ? 'password' : 'text'" 
        :rules="[ val => val === user.password || 'Password did not match']">
        <template v-slot:append>
          <q-icon
            :name="showPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPwd = !showPwd"
          />
        </template>
      </q-input>
      

      <q-toggle v-model="isAcceptLicense" label="I accept the license and terms" />
      
          <q-separator inset/>
      <div class="text-right">
       <q-btn label="Sign up" type="submit" class="full-width" color="primary"/>
      </div>
    </q-form>
  </div>
</template>
<script>

export default {
  created () {
    this.userService = this.$dbCon.wingsService('users')
  },
  data () {
    return {
      userService: null,
      user: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        isEnable: true
      },
      isAcceptLicense: false,
      showPwd: true
    }
  },
  methods: {
    onSubmit () {
      if (this.isAcceptLicense) {
        delete this.user.confirmPassword
        let vm = this
        this.userService.create({ ...this.user })
          .then(() => {
            let user = {
              strategy: 'local',
              email: this.user.email,
              password: this.user.password
            }
            this.$store.dispatch('BackEndModule/login', user)
              .then(() => {
                this.$q.notify({
                  message: 'Account succesfully created',
                  color: 'positive'
                })
                if (vm.$router.currentRoute.path === '/signup') {
                  console.log('is not in billing')
                  vm.$router.push('/')
                } else {
                  console.log('is in billing')
                  vm.$store.commit('ClientModule/nextStep', 2)
                }
                
              })
              .catch(err => {
                console.log(err, 'err')
              })
          }).catch(err => {
            console.log(err, 'error')
            this.$q.notify({
              message: err.message,
              color: 'negative'
            })
          })
      } else {
         this.$q.notify({
            message: 'Please Accept Terms and Agreement',
            color: 'negative'
          })
      }
    },
    test () {
      
    }
  }
}
</script>