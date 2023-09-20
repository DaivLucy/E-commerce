
import {reqDetaildata , reqShppingCart} from '@/api'

const state = {
    DetailData: {},
}
const actions = {
    async getdetaildata({commit},value){
        let detail = await reqDetaildata(value)
        if(detail.code === 200){
            commit('GETDETAILDATA',detail.data)
        }
    },

    // 添加到购物车  ||  修改已有的购物车数据
    async sendshoppingCart({commit},{skuId,skuNum}){
        let send = await reqShppingCart(skuId,skuNum)
        // promise返回要么成功要么失败
        if(send.code === 200){
            return 'ok';
        }else{
            return Promise.reject(new Error('faile'));
        }
    },
}
const mutations = {
    GETDETAILDATA(state,value){
        state.DetailData = value
    },
}
const getters = {
    categoryView(state){
        return state.DetailData.categoryView || {}
    },
    skuInfo(state){
        return state.DetailData.skuInfo || {}
    },
    spuSaleAttrList(state){
        return state.DetailData.spuSaleAttrList || []
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}