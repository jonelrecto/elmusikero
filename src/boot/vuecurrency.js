// import something here
import VueCurrencyFilter from 'vue-currency-filter'

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.use(VueCurrencyFilter,
    {
      symbol : 'P',
      thousandsSeparator: ',',
      fractionCount: 2,
      fractionSeparator: '.',
      symbolPosition: 'front',
      symbolSpacing: true
    })
}
