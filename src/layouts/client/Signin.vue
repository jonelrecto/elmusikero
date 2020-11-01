<template>
  <q-page padding>
    <div class="fit row wrap justify-center items-center content-start">
      <div>
        <q-card bordered class="my-card">
          
          <q-card-section>
            <div class="text-h3 text-center">Sign in</div>
          </q-card-section>
    
          <q-separator inset/>

          <q-card-section>
            <signin></signin>
          </q-card-section>
          
          <q-card-section>
            <div class="text-center">
              <span>Dont have account? <span @click="$router.push('/signup')" class="text-blue-10" style="cursor: pointer">Sign up </span>now!</span>
            </div>
            
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import Signin from '../../components/Signin'

export default {
  components: {
    Signin
  }
}
</script>
<style>
.my-card {
  width: 400px;
  max-width: 100%
}
  
</style>
