import Vue from 'vue'

import VueRouter from 'vue-router'

import routes from './routers'

import store from '@/store'

Vue.use(VueRouter)

// 解决搜索多次报错
// 备份 push and replace
const BacksPush = VueRouter.prototype.push
const BacksReplace = VueRouter.prototype.replace
// 重写  第一个参数，路由传入的值。第二，成功。第三，失败
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        BacksPush.call(this, location, resolve, reject)
    } else {
        BacksPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        BacksReplace.call(this, location, resolve, reject)
    } else {
        BacksReplace.call(this, location, () => { }, () => { })
    }
}

let router = new VueRouter({
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
})

// 全局路由组件
router.beforeEach((async (to, from, next) => {
    let token = store.state.enrollandlogin.LoginToken

    // 判断是否有登陆，有登陆不能去登录
    if (token) {
        // 如果要去登录就不给直接调回原处
        if (to.path === '/Login') {
            next(from)
        } else {
            // 其他都放行
            // 为了让每一次登录都能有用户信息展示，所以需要获取用户信息
            try {
                await store.dispatch('getusermessage')
                next()
            } catch (error) {
                store.dispatch('signout')
                next()
            }
        }
    } else {
        if(to.path.indexOf('AddCartSuccess') != -1 || to.path.indexOf('ShopCart') != -1 || to.path.indexOf('Trade') != -1 || to.path.indexOf('Pay') != -1 || to.path.indexOf('Center') != -1){
            alert('请先登录')
            next(`/Login?ret=${to.fullPath}`)
        }else{
            next()
        }
    }
}))

export default router