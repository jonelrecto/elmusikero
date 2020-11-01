<template>
  <q-layout view="lHh Lpr lFf">
    
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          <img class="" style=" height: 50px" src="../assets/logo.png" alt="">
          El Musikero
        </q-toolbar-title>
        <q-btn
          flat
          dense
          round
          @click="logout()"
          aria-label="Menu"
        >
          <q-icon name="exit_to_app" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :width="200"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-scroll-area class="fit">
        <q-toolbar class="bg-primary text-white shadow-2">
          <q-toolbar-title>
            <q-icon name="mdi-account-circle" />
            Admin</q-toolbar-title>
        </q-toolbar>
        <q-list v-for="(menuItem, index) in menuList" :key="index">

          <q-item clickable v-ripple :to="menuItem.path">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>

          <q-separator v-if="menuItem.separator" />

        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>

      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

const menuList = [
  {
    icon: 'mdi-amplifier',
    label: 'Products',
    separator: false,
    path: '/admin'
  },
  {
    icon: 'mdi-format-list-checks',
    label: 'Orders',
    separator: false,
    path: '/admin/orders'
  },
  {
    icon: 'mdi-account-group',
    label: 'Clients',
    separator: false,
    path: '/admin/customers'
  },
  // {
  //   icon: 'mdi-account-badge',
  //   label: 'Users',
  //   separator: true
  // },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false
  }
]
export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: false,
      menuList
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('BackEndModule/logout')
        .then(() => {
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
</style>
