<template>
  <div>
    <q-form
      @submit="onSubmit"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="user.email"
        label="Email *"
        :rules="[ val => val && val.length > 0 || 'Please enter your email']" />

      <q-input
        label="Password"
        v-model="user.password"
        filled
        :type="showPwd ? 'password' : 'text'"
        :rules="[ val => val && val.length > 0 || 'Please enter your password']">
        <template v-slot:append>
          <q-icon
            :name="showPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="showPwd = !showPwd" />
        </template>
      </q-input>

      <div>
        <q-btn
          class="full-width"
          label="Sign in"
          type="submit"
          color="primary" />
      </div>
    </q-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      showPwd: true
    }
  },
  methods: {
    onSubmit () {
      let user = {
        strategy: 'local',
        ...this.user
      }
      this.$store.dispatch('BackEndModule/login', user)
        .then(() => {
          if (this.$router.currentRoute.path === '/signin') {
            this.$router.push('/')
          } else {
            this.$store.commit('ClientModule/nextStep', 2)
          }
          
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
