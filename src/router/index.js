import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AddressList from '../views/AddressList'
import AddressNew from '../views/AddressNew'
import AddressEdit from '../views/AddressEdit'
import Detail from '../views/Detail'
import Success from '../views/Success'
import Info from '../views/Info'
import OrderList from "../views/OrderList";
import UserInfo from "../views/UserInfo";
import Login from "../views/Login";
import store from "../store";
import Register from "../views/Register";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/addressList',
        name: '地址列表',
        component: AddressList,
        meta: {
            needLogin: true
        }
    },
    {
        path: '/orderList',
        name: '订单列表',
        component: OrderList,
        meta: {
            needLogin: true
        }
    },
    {
        path: '/userInfo',
        name: '用户界面',
        component: UserInfo
    },
    {
        path: '/addressNew',
        name: '新增地址',
        component: AddressNew
    },
    {
        path: '/addressEdit',
        name: '编辑地址',
        component: AddressEdit,
        meta: {
            needLogin: true
        }
    },
    {
        path: '/detail',
        name: '订单详情',
        component: Detail
    },
    {
        path: '/success',
        name: '付款成功',
        component: Success
    },
    {
        path: '/info',
        name: '订单信息',
        component: Info
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// 每一次切换路由时，beforeEach都执行
router.beforeEach(async (to, from, next) => {
    // console.log("hello")  isLogin是否登录了
    // let isLogin = store.state.isLogin

    let isLogin = localStorage.getItem("JWT_TOKEN") != null;
    console.log("isLogin in store:" + isLogin)
    // needLogin  表示哪些路由需要在登录条件下才能访问
    let needLogin = to.matched.some(match => match.meta.needLogin)
    console.log("needLogin in store:" + needLogin)
    if (needLogin) {
        // 需要登录
        if (isLogin) {
            // 登录过了
            next()
        } else {
            next("/login")
        }
    } else {
        // 不需要登录
        if (isLogin && to.path === "/login") {
            next("/");
        } else {
            next()
        }
    }
})


export default router
