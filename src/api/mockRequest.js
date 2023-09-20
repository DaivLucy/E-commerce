// 引入axios
import axios from "axios"
// 引入进度条
import nprogress from 'nprogress'
// console.log(nprogress);
// 引入进度条样式
import 'nprogress/nprogress.css'

// 创建实例
const requests = axios.create({
    // 每次请求都会加上这个
    baseURL: '/mock',
    // 请求超时，5s后报错
    timeout: 5000,
})

// 请求拦截器,在请求发出去之前可以拦截
requests.interceptors.request.use((config)=> {
    // config：配置对象，包含一个重要属性，headers请求头
    // 进度条开始
    nprogress.start()
    return config;
})

// 响应拦截器
requests.interceptors.response.use((res)=> {
    // 成功的回调函数，在服务器响应后可以拦截
    // 进度条结束
    nprogress.done()
    return res.data;
},(error)=> {
    // 响应失败的回调
    return Promise.reject(new Error("faile"))
})

// 暴露
export default requests