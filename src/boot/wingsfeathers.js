// import something here
import wingsJS from 'wings-feathers'



// "async" is optional
export default async ({ Vue }) => {
  // something to do
  let dbCon = wingsJS('http://localhost:3030')
  Vue.prototype.$dbCon = dbCon

}
