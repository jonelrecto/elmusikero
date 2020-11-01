import axios from 'axios'

export default async ({ Vue }) => {
  axios.defaults.baseURL = 'http://localhost:3030'
  Vue.prototype.$axios = axios
}
