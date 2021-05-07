import Vue from 'vue'

import App from './App.vue'
import Footer from './components/Footer'
import TypeNav from './components/TypeNav'

import router from './router'
import store from './store'

import * as API from './api'

import './assets/css/normalize.css'

Vue.config.productionTip = false

Vue.component('Footer', Footer)
Vue.component('TypeNav', TypeNav)

Vue.prototype.$API = API

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
