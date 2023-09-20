import {reqShppingCartList,reqShoppCheckCart,reqDeleteCart} from '@/api'
// 引入id
import {getUUID} from '@/utils/uuid_token'

const state = {
    UUIDdata: getUUID(),
    shoppShowList: []
}
const actions = {
    async getshoppcartlist({commit}){
        let shoplist = await reqShppingCartList()

        if(shoplist.code === 200){
            commit('GETSHOPPCARTLIST',shoplist.data)
        }
    },

    // 购物车勾选框
    async getshoppcheckcart({commit},{skuID,isChecked}){
        let chack = await reqShoppCheckCart(skuID,isChecked)
        if(chack.code === 200){
            return 'ok'
        }
    },

    // 删除购物车数据
    async deletecartdata({commit},skuId){
        let dele = await reqDeleteCart(skuId)
        if(dele.code === 200){
            return 'ok'
        }
    },

    // 全选按钮修改
    changeallchecked({dispatch,getters},isChecked){
        let pars = []
        getters.getShoppListData.cartInfoList.forEach(item => {
            let par = dispatch('getshoppcheckcart',{skuID:item.skuId,isChecked})

            pars.push(par)
        });

        return Promise.all(pars)
    },
}
const mutations = {
    GETSHOPPCARTLIST(state,vlaue){
        state.shoppShowList = vlaue
    },
}
const getters = {
    getShoppListData(state){
        return state.shoppShowList[0] || {}
    },
}

export default {
    state,
    actions,
    mutations,
    getters
}