import Vue from 'vue'

export function processOrder (context) {
  return new Promise((resolve, reject) => {
    let $dbCon = Vue.prototype.$dbCon
    let order = {
      cartList: context.state.cartList,
      ...context.state.clientDetails,
      ...context.state.cardDetails,
      deliveryDate: {
        to: context.getters.getDateDeliverTo,
        until: context.getters.getDateDeliverUntil
      },
      totalPayment: context.getters.getTotalAmount,
      status: { label: 'Processing', value: 'processing'}
    }
    let orderService = $dbCon.wingsService('orders')
    orderService.create(order)
      .then(resp => {
        resolve(resp)
      })
      .catch(err => {
        reject(err)
      })

  })
  
}
