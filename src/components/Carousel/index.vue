<template>
  <!-- swiper外层容器 -->
  <div class="swiper-container"
       @mouseenter="swiper[0].autoplay.stop()"
       @mouseleave="swiper[0].autoplay.start()">
    <!-- 轮播图容器 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide"
           v-for="img in carouselList"
           :key="img.id">
        <img :src="img.imgUrl"
             :alt="img.title" />
      </div>
    </div>
    <!-- 左右按钮 -->
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
    <!-- 小圆点 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/css/swiper.min.css'

export default {
  name: "Carousel",
  props: {
    carouselList: Array,
  },
  watch: {
    carouselList () {
      // 监视数据回来了触发函数，数据回来但还未渲染DOM元素
      // this.$nextTick 等DOM元素渲染完成才触发回调
      this.$nextTick(() => {
        this.swiper = new Swiper(".swiper-container", {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          pagination: {
            el: ".swiper-pagination",
          },
          loop: true,
          autoplay: {
            delay: 1000,
          },
        });
      })
    }
  },

}
</script>

<style>
</style>