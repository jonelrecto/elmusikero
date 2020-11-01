import Vue from 'vue'
import Vuex from 'vuex'

// import feathersVuex from 'feathers-vuex'
// import wingsJS from 'wings-feathers'
// import feathersClient from '../feathers-client'

import ClientModule from './client-module'
import BackEndModule from './backend-module'

// let app = wingsJS('http://localhost:3030')

// const { service, auth, FeathersVuex } = feathersVuex(app, { idField: '_id' })

Vue.use(Vuex)
// Vue.use(FeathersVuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

const Store = new Vuex.Store({
  modules: {
    ClientModule,
    BackEndModule
  },
  plugins: [
    // service('categories', {
    //   instanceDefaults: {
    //     name: ''
    //   }
    // }),
    // auth({ userService: 'users' })
  ],

  // enable strict mode (adds overhead!)
  // for dev mode only
  // strict: process.env.DEV,
  strict: false
})

export default Store
