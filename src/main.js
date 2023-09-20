import Vue from 'vue'
import App from './App.vue'

// 导入路由
import router from '@/router'

// 引入vuex
import store from './store'

// 注册三级联动组件
import Typenav from '@/components/Typenav'
Vue.component(Typenav.name , Typenav)
// 注册轮播图共用组件
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name , Carousel)
// 注册分页器
import Pagination from '@/components/Pagination'
Vue.component(Pagination.name , Pagination)

// 导入接口文件
import * as API from '@/api'

// 按需导入element
import { Button, MessageBox } from 'element-ui';
Vue.component(Button.name, Button);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// mock模拟数据执行
import '@/mock/mockServe'

import 'swiper/css/swiper.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate(){
    // 定义全局事件
    Vue.prototype.$bus = this

    // 定义全局事件总线的api接口
    Vue.prototype.$API = API
  },
  router,
  store,
}).$mount('#app')
