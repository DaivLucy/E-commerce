// home模块

// 获取三级联动数据
import {reqCategory , mockGetdata , mockGetdatafloor} from '@/api'

const state = {
    gettypenavValue: [],
    // banner模拟数据
    getbannerData:[],
    // floor模拟数据
    getfloordata:[],
}

const actions = {
    // 获取三级联动数据
    async gettypenavValue(context){
        let gettypenavValue = await reqCategory()
        if(gettypenavValue.code === 200){
            context.commit('GETTYPENAVVALUE',gettypenavValue.data)
        }
    },

    // 获取banner模拟数据
    async getbannerdata(bannerdata){
        let getbannerdata = await mockGetdata()
        if(getbannerdata.code === 200){
            bannerdata.commit('GETBANNDERDATA',getbannerdata.data)
        }
    },

    // 获取floor模拟数据
    async getbannermockdata(context){
        let bannermockdata = await mockGetdatafloor()
        if(bannermockdata.code === 200){
            context.commit('GETBANNERMOCKDATA',bannermockdata.data)
        }
    }
}

const mutations = {
    GETTYPENAVVALUE(state , value){
        state.gettypenavValue = value
    },

    // 获取banner模拟数据
    GETBANNDERDATA(state, bannnervalue){
        state.getbannerData = bannnervalue
    },

    // 获取floor数据
    GETBANNERMOCKDATA(state,value){
        state.getfloordata = value
    },
}

const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}