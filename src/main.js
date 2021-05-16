import Vue from 'vue'
// 引入组件
import App from './App.vue'
import Footer from './components/Footer'
import TypeNav from './components/TypeNav'
import Carousel from './components/Carousel'
//router和vuex
import router from './router'
import store from './store'
//
import * as API from './api'
// 重置样式
import './assets/css/normalize.css'
// icon
import './assets/fonts/iconfont.css'
// 测试模拟
import './mock'
Vue.config.productionTip = false
// 全局注册组件
Vue.component('Footer', Footer)
Vue.component('Carousel', Carousel)
Vue.component('TypeNav', TypeNav)

Vue.prototype.$API = API

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
