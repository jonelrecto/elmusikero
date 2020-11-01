import Vue from 'vue'

export const isLoggedIn = (state) => {
  return !!state.token
}

export const authStatus = (state) => {
  return state.status
}

export const getCategories = (state) => {
  return state.categories
}

export const getBrands = (state) => {
  return state.brands
}

export const getMadeIns = (state) => {
  return state.madeIns
}

export const getNewProductDialog = (state) => {
  return state.newProductDialog
}

export const getViewProductDialog = (state) => {
  return state.viewProductDialog
}

export const getImage = () => (url) => {
  return  url ? 'http://localhost:3030/uploads/' + url.replace('public\\uploads\\', '') : require('../../assets/empty-image.png')
}

export const getPlainValue = (state) => (dataObject) => {
	var obj = JSON.parse(JSON.stringify(dataObject));
	Object.keys(obj).reduce(function (obj, key) {
	  if (obj["_" +  key] === obj[key]) {
	    delete obj["_" +  key]
	  }
	  return obj
	}, obj)
	return obj
}

