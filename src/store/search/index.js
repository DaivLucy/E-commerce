import {reqSearchdata} from '@/api'

// search模块
const state = {
    // 商品数据
    searchData: []
}

const actions = {
    async getsearch({commit} , params){
        let shuju = await reqSearchdata(params)
        if(shuju.code === 200){
            commit('GETSEARCH',shuju)
        }
    }
}

const mutations = {
    GETSEARCH(state,value){
        state.searchData = value.data
    }
}

const getters = {
    attrsList(state){
        return state.searchData.attrsList || []
    },
    goodsList(state){
        return state.searchData.goodsList || []
    },
    trademarkList(state){
        return state.searchData.trademarkList || []
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}