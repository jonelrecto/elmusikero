// import something here
import lodash from 'lodash'

// "async" is optional
export default async ({ Vue }) => {
  // something to do
  Vue.prototype.$_ = lodash
}
