import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import Search from '../views/Search'
Vue.use(VueRouter)
export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      name: 'Home',
      path: '/',
      component: Home,
    },
    {
      name: 'Login',
      path: '/login',
      component: Login,
      meta: {
        isHide: true,
      },
    },
    {
      name: 'Search',
      path: '/search/:keyword?',
      component: Search,
    },
    {
      name: 'Register',
      path: '/register',
      component: Register,
      meta: {
        isHide: true,
      },
    },
  ],
})
