import {reqGetUserOption , reqGetUserTradeMessage} from '@/api'

const state = {
    userOption: [],
    userTradeMess: {},
}
const actions = {
    // 获取用户地址信息
    async getuseroption({commit}){
        let option = await reqGetUserOption()
        if(option.code === 200){
            commit('GETUSEROPTION',option.data)
        }
    },

    // 获取用户交易信息
    async getusertrade({commit}){
        let trade = await reqGetUserTradeMessage()
        if(trade.code === 200){
            commit('GETUSERTRADE',trade.data)
        }
    },
}
const mutations = {
    // 获取用户地址信息
    GETUSEROPTION(state,value){
        state.userOption = value
    },

    // 获取用户交易信息
    GETUSERTRADE(state,value){
        state.userTradeMess = value
    },
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}