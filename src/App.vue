<template>
  <div>
    <router-view />
    <Footer v-if="!$route.meta.isHide" />
  </div>
</template>

<script >
export default {
  name: "App",
  computed: {
    // ifShowFooter () {
    //   const { path } = this.$route
    //   return path !== '/login' && path !== '/register'
    // }
  },
  mounted () {

  }
}
</script>

<style lang="less">
</style>
