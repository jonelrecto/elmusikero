
const routes = [
  {
    path: '/login',
    component: () => import('pages/Login.vue')
  },
  // admin router
  {
    path: '/admin',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { name: 'products', path: '', meta: { requiredAuth: true }, component: () => import('pages/Products.vue') },
      { name: 'orders', path: '/admin/orders', meta: { requiredAuth: true }, component: () => import('pages/Orders.vue') },
      { name: 'customers', path: '/admin/customers', meta: { requiredAuth: true }, component: () => import('pages/Customers.vue') },
    ]
  },
  // client router
  {
    path: '/',
    component: () => import('layouts/client/Webpage.vue'),
    children: [
      { path: '', component: () => import('layouts/client/HomePage.vue') },
      { path: '/productinfo/:id', component: () => import('layouts/client/ProductInfo.vue') },
      { path: '/cart', component: () => import('layouts/client/Cart.vue') },
      { path: '/billing', component: () => import('layouts/client/Billing.vue') },
      { path: '/categorized/:category', component: () => import('layouts/client/CategoryProducts.vue') },
      { path: '/myorders', component: () => import('layouts/client/MyOrders.vue') },
      { path: '/signin', component: () => import('layouts/client/Signin.vue') },
      { path: '/signup', component: () => import('layouts/client/Signup.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
