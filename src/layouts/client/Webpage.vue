<template>
  <q-layout view="hHh Lpr fff">
    <!-- Be sure to play with the Layout demo on docs -->
    <q-header class="bg-white">
      <q-toolbar>
        <div style="margin-left: 50px; max-height: 100px; cursor: pointer" @click="$router.push('/')">
          <img style="height: 80px" src="../../assets/logo.png" alt />
        </div>
        

        <q-space />
        <div style="width: 1000px;" class="row flex text-center">
          <q-icon size="20px" name="menu" class="col text-black"></q-icon>
          <a href="#/categorized/Guitar"  class="col">Guitars</a>
          <a href="#/categorized/Drums" class="col">Drums & Percussion</a>
          <a href="#/categorized/Keyboard" class="col">Keyboards</a>
          <a href="#/categorized/DJEquipments" class="col">Dj Equipments</a>
          <a href="#/categorized/Amplifiers" class="col">Amplifiers & Effects</a>
          <a href="#/categorized/Accessories" class="col">Accessories</a>
        </div>
        <q-space />
        <div >
          <q-btn flat round icon="shopping_cart" color="primary" @click="$router.push('/cart')"></q-btn>
          <q-btn v-if="!isLoggedIn" rounded size="15px" color="red" icon-right="mdi-login" label="Sign in" to="/signin"/>
          <q-btn v-else flat round icon="account_circle" color="secondary">
            <q-menu>
              <div class="row no-wrap q-pa-md">
                <div class="column">
                  <div class="text-h6 q-mb-md">Settings</div>
                  <q-btn size="sm" color="primary" icon="list_alt" label="Orders" to="/myorders" />
                  <!-- <q-toggle v-model="bluetooth" label="Bluetooth" /> -->
                </div>

                <q-separator vertical inset class="q-mx-lg" />

                <div class="column items-center">
                  <q-avatar size="72px">
                    <img src="https://cdn.quasar.dev/img/avatar4.jpg">
                  </q-avatar>

                  <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>

                  <q-btn
                    color="primary"
                    label="Logout"
                    push
                    size="sm"
                    @click="signOut"
                  />
                </div>
              </div>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view/>
    </q-page-container>

    <!-- (Optional) The Footer -->
    <q-footer>
      <q-toolbar class="bg-black text-white">
        <q-toolbar-title class="text-caption">Copyright @2019</q-toolbar-title>
        <q-btn flat round dense icon="mdi-facebook-box" class="q-mr-xs" />
        <q-btn flat round dense icon="mdi-twitter" />
        <q-btn flat round dense icon="mdi-instagram" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',

  data() {
    return {
      bluetooth: false,
      mobileData: false,
      leftDrawer: true,
      slide: 1
    };
  },
  computed: {
    isLoggedIn () {
      return this.$store.getters['BackEndModule/isLoggedIn']
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('BackEndModule/logout')
        .then(() => {
          this.$store.commit('ClientModuule/nextStep', 1)
          this.$router.push('/')
        })
        .catch((err) => { 
            this.$q.notify({
              message: err.message,
              color: 'negative'
            })
        })
    }
  }
};
</script>
<style lang="stylus">
a, u {
  text-decoration: none;
  color: black;
}

.carousel-inner > .item > img {
  width: 640px;
  height: 360px;
}
</style>