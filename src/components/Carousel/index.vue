<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(img, index) in list" :key="index">
        <img :src="img.imaUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";

export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
        // 上来立即执行一次
      immediate: true,
      handler(vla, oldvla) {
        this.$nextTick(() => {
          let mySwiper = new Swiper(this.$refs.cur, {
            loop: true,
            // 需要分页器
            pagination: {
              el: "swiper-pagination",
              clickable: true,
            },
            // 需要前后按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>