<template>
  <!-- swiper外层容器 -->
  <div class="swiper-container"
       @mouseenter="swiper[0].autoplay.stop()"
       @mouseleave="swiper[0].autoplay.start()">
    <!-- 轮播图容器 -->
    <div class="swiper-wrapper">
      <div class="swiper-slide">
        <img src="./images/banner1.jpg" />
      </div>
      <div class="swiper-slide">
        <img src="./images/banner2.jpg" />
      </div>
      <div class="swiper-slide">
        <img src="./images/banner3.jpg" />
      </div>
      <div class="swiper-slide">
        <img src="./images/banner4.jpg" />
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
  mounted () {
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
  },
}
</script>

<style>
</style>