import { reqEnroll, reqSendCode , reqUserLogin , reqGetUserMessage , reqSignOut} from '@/api'

const state = {
    sendCode: '',
    LoginToken: localStorage.getItem('LoginToken'),
    UserMessage: {},
}
const actions = {
    // 获取验证码请求
    async getendode({ commit }, phone) {
        let send = await reqSendCode(phone)
        if (send.code === 200) {
            commit('GETENDODE', send.data)
            return 'OK'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },

    // 注册请求
    async pullenroll({ commit }, user) {
        let sss = await reqEnroll(user)
    },

    // 登录
    async userlogin({commit} , user){
        let ss = await reqUserLogin(user)
        if(ss.code === 200) {
            commit('USERLOGIN', ss.data.token)

            localStorage.setItem('LoginToken',ss.data.token)

            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },

    // 用户信息
    async getusermessage({commit}){
        let sss = await reqGetUserMessage()
        if(sss.code === 200){
            commit('GETUSERMESSAGE',sss.data)
        }
    },

    // 退出登录
    async signout({commit}){
        let out = await reqSignOut()

        if(out.code === 200){
            commit('SIGNOUT')
            return 'ok'
        }else{
            return Promise.reject(new Error('faile'))
        }
    },
}
const mutations = {
    GETENDODE(state, value) {
        state.sendCode = value
    },
    
    // 登录
    USERLOGIN(state , value){
        state.LoginToken = value
    },

    // 获取用户信息
    GETUSERMESSAGE(state,value){
        state.UserMessage = value
    },

    // 退出登录
    SIGNOUT(state){
        state.LoginToken = ''
        state.UserMessage = {}
        localStorage.removeItem('LoginToken')
    },
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}