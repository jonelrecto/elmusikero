import Vue from 'vue'
import { rejects } from 'assert'


export function login ({commit}, user) {
  var $dbCon = Vue.prototype.$dbCon
  return new Promise((resolve, reject) => {
    console.log($dbCon, 'dbcon')
    commit('auth_request')
    $dbCon.authenticate(user)
      .then(resp => {
        const token = resp.accessToken
        const user = resp.user
        localStorage.setItem('token', token)
        commit('auth_success', token, user)
        resolve(resp)
      })
      .catch(err => {
        commit('auth_error')
        localStorage.removeItem('token')
        reject(err)
      })
  }) 
}

export function logout ({commit}) {
  var $dbCon = Vue.prototype.$dbCon
  return new Promise((resolve, reject) => {
    commit('logout')
    localStorage.removeItem('token')
    $dbCon.logout()
    resolve()
  })
}

export function populateCategories ({commit}) {
  return new Promise((res, rej) => {
    let $dbCon = Vue.prototype.$dbCon
    let catService = $dbCon.wingsService('categories')
    catService.find({
      query: {
        $sort: {
          name: 1
        }
      }
    })
      .then(resp => {
        commit('setCategories', resp)
        res(resp)
      })
      .catch(err => {
        rej(err)
      })
  })
  
}

export function populateBrands ({commit}) {
  return new Promise((res, rej) => {
    let $dbCon = Vue.prototype.$dbCon
    let brandService = $dbCon.wingsService('brands')
    brandService.find({
      query: {
        $sort: {
          name: 1
        }
      }
    })
      .then(resp => {
        commit('setBrands', resp)
        res(resp)
      })
      .catch(err => {
        rej(err)
      })
  })
}

export function populateMadeIns ({commit}) {
  return new Promise((res, rej) => {
    let $dbCon = Vue.prototype.$dbCon
    let madeInsService = $dbCon.wingsService('madeins')
    madeInsService.find({
      query: {
        $sort: {
          name: 1
        }
      }
    })
      .then(resp => {
        commit('setMadeIns', resp)
        res(resp)
      })
      .catch(err => {
        rej(err)
      })
  })
  
}

export function getImage (url) {
  
}