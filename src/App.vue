<template>
  <div>
    <router-view />
    <Footer v-if="!$route.meta.isHide" />
    <!-- 测试拦截器 -->
    <!-- <button @click="handleClick">按钮</button> -->
  </div>
</template>

<script >
// 测试拦截器
// import request from './utils/request'
export default {
  name: "App",
  computed: {
    // ifShowFooter () {
    //   const { path } = this.$route
    //   return path !== '/login' && path !== '/register'
    // }
  },
  methods: {
    // 测试拦截器
    // handleClick () {
    //   request({
    //     url: 'http://39.98.123.211/api/user/passport/login',
    //     method: 'POST',
    //     headers: {
    //       token: 'XXX',
    //     },
    //     data: {
    //       phone: '13700000000',
    //       password: '111111',
    //     }
    //   }).catch(err => {
    //     console.log(err);
    //   })
    // }
  }
}
</script>

<style lang="less">
</style>
