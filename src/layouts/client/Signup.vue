<template>
  <q-page padding>
    <div class="fit row wrap justify-center items-center content-start">
      <div>
        <q-card bordered class="my-card">
          
          <q-card-section>
            <div class="text-h3 text-center">Sign up</div>
          </q-card-section>
    
          <q-separator inset/>

          <q-card-section>
            <signup></signup>
          </q-card-section>
          
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import Signup from '../../components/Signup'

export default {
  components: {
    Signup
  },
  methods: {
    test () {
      console.log(this.$router)
    }
  }
}
</script>
<style>
.my-card {
  width: 600px;
  max-width: 100%
}
  
</style>