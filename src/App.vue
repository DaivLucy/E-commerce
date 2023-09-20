<template>
  <div id="app">
    <!-- 头部 -->
    <Header></Header>

    <router-view></router-view>

    <!-- 底部  show判断是否展示 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  mounted(){
    // 获取数据
    this.$store.dispatch("gettypenavValue");
  }
}
</script>

<style>
</style>
