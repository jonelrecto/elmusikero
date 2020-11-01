import Vue from 'vue'
import { date } from 'quasar'

export function getCartList (state) {
  return state.cartList
}

export const getClientDetails = (state) => {
  return state.clientDetails
}

export const getCardDetails = (state) => {
  return state.cardDetails
}

export const getTotalAmount = (state) => {
  let _ = Vue.prototype.$_
  return _.sumBy(state.cartList, 'total')
}

export const getDateDeliverTo = () =>  {
  let assignDate = date.addToDate(new Date(), { days: 10})
  return date.formatDate(assignDate, 'MMM DD')
}

export const getDateDeliverUntil = (state, getters) => {
  let assignDate = date.addToDate(getters.getDateDeliverTo, { days: 7})
  return date.formatDate(assignDate, 'MMM DD')
}