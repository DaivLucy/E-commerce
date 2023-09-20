<template>
  <div>
    <!-- 使用全局注册的三级联动 -->
    <Typenav></Typenav>

    <!-- 列表 -->
    <Listcontainer></Listcontainer>

    <!-- 今日推荐 -->
    <Todayrecommend></Todayrecommend>

    <!-- 商品排行 -->
    <Productrank></Productrank>

    <!-- 猜你喜欢 -->
    <Like></Like>

    <!-- 楼层 -->
    <Floor v-for="floor in FloorData" :key="floor.id" :list="floor"></Floor>

    <!-- 商标 -->
    <Trademark></Trademark>
  </div>
</template>

<script>
import Listcontainer from "@/pages/Home/Listcontainer";
import Todayrecommend from "@/pages/Home/Todayrecommend"
import Productrank from "@/pages/Home/Productrank"
import Like from "@/pages/Home/Like"
import Floor from "@/pages/Home/Floor"
import Trademark from "@/pages/Home/Trademark"

import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    Listcontainer,
    Todayrecommend,
    Productrank,
    Like,
    Floor,
    Trademark,
  },
  mounted(){
    // 请求floor数据
    this.$store.dispatch('getbannermockdata')

    // 获取登录后的用户信息
    this.$store.dispatch('getusermessage')
  },
  computed: {
    ...mapState({
      FloorData: (state) => state.home.getfloordata
    })
  },
};
</script>

<style>
</style>