import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '../store/index.js'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

 

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.path === '/login' && store.getters['BackEndModule/isLoggedIn']) {
      next(from.path)
      return
    }
    if (to.matched.some(record => record.meta.requiredAuth)) {
      if (store.getters['BackEndModule/isLoggedIn']) {
        next()
        return
      } else {
        console.log('not authenticated')
        next('/login')
        return
      }
      
    } else {
      next ()
    }
  })

  return Router
}
