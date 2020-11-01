import Vue from 'vue'

export function nextStep (state, n) {
  state.billingStep = n
}

export function setCartList (state, product) {
  //check if product is duplicate
  let _ = Vue.prototype.$_
  let index = _.findIndex(state.cartList, cart => {
    return cart._id === product._id
  })
  if (index < 0) {
    state.cartList.push(product)
  }
}

export function updateCartList (state, payload) {
  state.cartList = payload
}

export function setTotal (state, {index, total}) {
  console.log(index, 'index')
  console.log(total, 'total')
  state.cartList[index].total = total
}

export function removeCartListItem (state, index) {
  state.cartList.splice(index, 1)
}

export function setClientDetails (state, payload) {
  state.clientDetails = payload
}

export function setClientDetailsUserId (state, payload) {
  state.clientDetails.userId = payload
}

export function setClientDetailsFirstName (state, payload) {
  state.clientDetails.firstName = payload
}
export function setClientDetailsLastName (state, payload) {
  state.clientDetails.lastName = payload
}
export function setClientDetailsContactNo (state, payload) {
  state.clientDetails.contactNo = payload
}
export function setClientDetailsEmail (state, payload) {
  state.clientDetails.email = payload
}
export function setClientDetailsAddress (state, payload) {
  state.clientDetails.address = payload
}
export function setClientDetailsCity (state, payload) {
  state.clientDetails.city = payload
}

export function setCardDetails (state, payload) {
  state.cardDetails = payload
}

export function clearDetails (state) {
  state.clientDetails = {
    userId: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
    address: '',
    city: ''
  },
  state.cardDetails = {
    cardNumber: '',
    expireDate: {
      month: '',
      year: ''
    },
    verificationNo: ''
  }
  state.cartList = []
}