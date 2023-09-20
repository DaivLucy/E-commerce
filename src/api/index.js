
// 对api进行统一管理
import requests from '@/api/request'

// 引入模拟数据接口
import mockRequest from '@/api/mockRequest'

// 三级联动接口
// /api/product/getBaseCategoryList  get  无参数
export const reqCategory = () => requests({url: 'product/getBaseCategoryList' , method: 'get'})

// 模拟数据mock接口
export const mockGetdata = () => mockRequest.get('/banner')
export const mockGetdatafloor = () => mockRequest.get('/floors')

// search组件接口
// /api/list  post  有参
export const reqSearchdata = (params) => requests({url: '/list' , method: 'post' , data: params})

// detail组件接口
// /api/item/{ skuId }   GET   参数为 id
export const reqDetaildata = (skuId) => requests({url: `/item/${skuId}` , method: 'get'})

// 添加到购物车
// /api/cart/addToCart/{ skuId }/{ skuNum }   post  双参数
export const reqShppingCart = (skuId , skuNum) => requests({url: `/cart/addToCart/${ skuId }/${ skuNum }` , method: 'post'})

// 获取购物车列表
// /api/cart/cartList   get   无参
export const reqShppingCartList = () => requests({url: '/cart/cartList' , method: 'get'})

// 购物车点击勾选框
// /api/cart/checkCart/{skuID}/{isChecked}    get
export const reqShoppCheckCart = (skuID,isChecked) => requests({url: `/cart/checkCart/${skuID}/${isChecked}` , method: 'get'})

// 购物车删除数据
// /api/cart/deleteCart/{skuId}    DELETE
export const reqDeleteCart = (skuId) => requests({url: `/cart/deleteCart/${skuId}`,method: 'delete'})

// 手机验证码请求
// /api/user/passport/sendCode/{phone}  get
export const reqSendCode = (phone) => requests({url: `/user/passport/sendCode/phone` , method: 'get' , data: phone})

// 注册
// /api/user/passport/register   post          phone  password   code  

export const reqEnroll = (data) => requests({url: '/user/passport/register' , data , method: 'post'})

// 登录
// /api/user/passport/login    post   phone  password
export const reqUserLogin = (data) => requests({url: '/user/passport/login' , data , method: 'post'})

// 用户信息
// /api/user/passport/auth/getUserInfo    get
export const reqGetUserMessage = () => requests({url: '/user/passport/auth/getUserInfo' , method: 'get'})

// 退出登录
//  /api/user/passport/logout    get
export const reqSignOut = () => requests({url: '/user/passport/logout' , method: 'get'})

// 获取用户交易地址信息
// /api/user/userAddress/auth/findUserAddressList     get
export const reqGetUserOption = () => requests({url:'/user/userAddress/auth/findUserAddressList' , method: 'get'})

// 获取用户交易信息
// /api/order/auth/trade     get
export const reqGetUserTradeMessage = () => requests({url:'/order/auth/trade' , method: 'get'})

// 提交按钮
// /api/order/auth/submitOrder?tradeNo={tradeNo}     post   consignee  consigneeTel  deliveryAddress  paymentWay  orderComment  orderDetailList
export const reqSubmitOrder = (tradeNo,data) => requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`, data , method: 'post'})


// 获取订单支付信息
//  /api/payment/weixin/createNative/{orderId}   get
export const reqPayment = (orderId) => requests({url: `/payment/weixin/createNative/${orderId}` , method: 'get'})

// 获取我的订单列表
// /api/order/auth/{page}/{limit}   get
export const reqMyOrders = (page,limit) => requests({url: `/order/auth/${page}/${limit}` , method:'get'})