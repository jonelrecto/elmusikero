import Vue from 'vue'

export const auth_request = (state) => {
  state.status = 'loading'
}

export const auth_success = (state, token, user) => {
  state.user = 'success'
  state.token = token
  state.user = user
}

export const auth_error = (state) => {
  state.status = 'error'
}

export const logout = (state) => {
  state.status = ''
  state.token = ''
}

export const setCategories = (state, payload) => {
  state.categories = payload
}

export const setBrands = (state, payload) => {
  state.brands = payload
}

export const setMadeIns = (state, payload) => {
  state.madeIns = payload
}

export const setNewProductDialog = (state, payload) => {
  state.newProductDialog = payload
}

export const setViewProductDialog = (state, payload) => {
  state.viewProductDialog = payload
}