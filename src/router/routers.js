
// 一级路由
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess'
import Center from '@/pages/Center'

// 二级路由
import MyOrders from '@/pages/Center/MyOrders'
import GroupOrders from '@/pages/Center/GroupOrders'

export default [
    {
        path: '/',
        // 默认显示
        redirect: '/Home',
    },
    {
        path:'/Center',
        component: Center,
        meta: {
            // 判断foot而是否展示
            show: false
        },
        // 默认显示
        redirect: '/Center/MyOrders',
        children: [
            {
                path: '/Center/MyOrders',
                component: MyOrders,
            },
            {
                path: 'GroupOrders',
                component: GroupOrders
            }
        ],
    },
    {
        path: '/PaySuccess',
        component: PaySuccess,
        meta: {
            // 判断foot而是否展示
            show: false
        },
    },
    {
        path: '/Pay',
        component: Pay,
        meta: {
            // 判断foot而是否展示
            show: false
        },
        beforeEnter: (to, from, next) => {
            if(from.path == '/Trade'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        path: '/Trade',
        component: Trade,
        meta: {
            // 判断foot而是否展示
            show: false
        },
        beforeEnter: (to, from, next) => {
            if(from.path == '/ShopCart'){
                next()
            }else{
                next(false)
            }
        }
    },
    {
        name: 'ShopCart',
        path: '/ShopCart',
        component: ShopCart,
        meta: {
            // 判断foot而是否展示
            show: false
        },
    },
    {
        name: 'Detail',
        path: '/Detail/:skuid',
        component: Detail,
        meta: {
            // 判断foot而是否展示
            show: false
        },
    },
    {
        name: 'AddCartSuccess',
        path: '/AddCartSuccess',
        component: AddCartSuccess,
        meta: {
            // 判断foot而是否展示
            show: false
        },
    },
    {
        path: '/Home',
        component: Home,
        meta: {
            // 判断foot而是否展示
            show: true,
        },
    },
    {
        path: '/Login',
        component: Login,
        meta: {
            // 判断foot而是否展示
            show: false,
        },
    },
    {
        path: '/Register',
        component: Register,
        meta: {
            // 判断foot而是否展示
            show: false,
        },
    },
    {
        name: 'Search',
        path: '/Search/:keyword?',
        component: Search,
        props: true,
        meta: {
            // 判断foot而是否展示
            show: true,
        },
    },
]