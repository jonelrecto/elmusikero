import Vue from 'vue'

let $v = Vue.prototype

const auth = {

  user: null,

  getUser() {
    return this.user
  },

  fetchUser (accessToken) {

    return $v.$dbCon.passport.verifyJWT(accessToken)
      .then(payload => {
        return $v.$dbCon.service('users').get(payload.userId)
      })
      .then(user => {
        return Promise.resolve(user)
      })
  },

  authenticate () {
    console.log('auth')

    return $v.$dbCon.authenticate()
      .then((response) => {
        console.log('auth successful')

        return this.fetchUser(response.accessToken)
      })
      .then(user => {
        console.log('got user')

        this.user = user

        return Promise.resolve(user)
      })
      .catch((err) => {
        console.log('auth failed', err)

        this.user = null

        return Promise.reject(err)
      })
  },

  authenticated () {
    return this.user != null
  },

  signout () {
    console.log('signout')

    return $v.$dbCon.logout()
      .then(() => {
        console.log('signout successful')

        this.user = null
      })
      .catch((err) => {
        console.log('signout failed', err)

        return Promise.reject(err)
      })
  },

  onLogout (callback) {

    $v.$dbCon.on('logout', () => {
      console.log('onLogout')

      this.user = null

      callback()
    })
  },

  onAuthenticated (callback) {

    $v.$dbCon.on('authenticated', response => {
      console.log('onAuthenticate', response)

      this.fetchUser(response.accessToken)
      .then(user => {
        console.log('onAuthenticate got user')

        this.user = user

        callback(this.user)
      })
      .catch((err) => {
        console.log('onAuthenticate get user failed', err)

        callback(this.user)
      })
    })
  },

  register (email, password) {
    return $v.$dbCon.service('users').create({
      email: email,
      password: password
    })
  },

  login (email, password) {
    console.log($v.$dbCon, 'dbcon')
    return $v.$dbCon.authenticate({
      strategy: 'local',
      email: email,
      password: password
    })
  }

}

export default auth
