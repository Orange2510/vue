import Vue from 'vue'

import App from './App.vue'
import Footer from './components/Footer'

import router from './router'
import store from './store'
import './assets/css/normalize.css'

Vue.config.productionTip = false

Vue.component('Footer', Footer)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
