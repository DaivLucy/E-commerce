import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 导入模块
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import enrollandlogin from './enrollandlogin'
import trade from './trade'

export default new Vuex.Store({
    // 使用模块
    modules: {
        home,
        search,
        detail,
        shopcart,
        enrollandlogin,
        trade,
    }
})