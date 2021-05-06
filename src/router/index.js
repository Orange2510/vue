import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import Search from '../views/Search'
Vue.use(VueRouter)
export default new VueRouter({
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
    },
    {
      name: 'Search',
      path: '/search',
      component: Search,
    },
    {
      name: 'Register',
      path: '/register',
      component: Register,
    },
  ],
})
