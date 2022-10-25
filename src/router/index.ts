// src/router/index.ts
// 1.引入 创建路由的模块 以及 路由历史记录模式的模块 
// 路由的历史模式：
// createWebHistory  HTML5模式  /home /kind /cart /user  需要后端配合
// createWebHashHistory Hash 模式  /#/home   /#/kind  /#/cart  /#/user
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw, Router } from 'vue-router' // 路由规则的类型 ---- 路由规则的类型注解

// 2.引入页面组件
import Footer from '../components/FooterComponent.vue'
import HomeView from './../views/home/IndexView.vue'

// import KindView from './../views/kind/IndexView.vue'
const KindView = () => import('./../views/kind/IndexView.vue')
// import ResultView from './../views/kind/ResultView.vue'
const ResultView = () => import('./../views/kind/ResultView.vue')
// import CartView from './../views/cart/IndexView.vue'
const CartView = () => import('./../views/car/IndexView.vue')
// import UserView from './../views/user/IndexView.vue'
const UserView = () => import('./../views/user/IndexView.vue')
// import UserOrderView from '../views/user/OrderView.vue'
const UserOrderView = () => import('../views/user/OrderView.vue')
// import UserAddressView from '../views/user/AddressView.vue'
const UserAddressView = () => import('../views/user/AddressView.vue')
// import UserAddAddressView from '../views/user/AddAddressView.vue'
const UserAddAddressView = () => import('../views/user/AddAddressView.vue')
import UserFavoriteView from '../views/user/FavoriteView.vue'
import AboutView from '../views/user/AboutView.vue'
import VuexView from '../views/vuex/IndexView.vue'

import SetView from './../views/user/SetView.vue'
import DetailView from '../views/detail/IndexView.vue'
import RegisterView from '../views/register/IndexView.vue'
import CheckTelComponent from '../views/register/components/CheckTelComponent.vue'
import SendTelCodeComponent from '../views/register/components/SendTelCodeComponent.vue'
import SetPasswordComponent from '../views/register/components/SetPasswordComponent.vue'
import LoginView from '../views/login/IndexView.vue'
import OrderView from '../views/order/IndexView.vue'
import OrderAddressListView from '../views/order/AddressListView.vue'
import OrderAddAddressView from '../views/order/AddAddressView.vue'
import SearchView from '../views/search/IndexView.vue'
import SearchResultView from '../views/search/SearchResultView.vue'
import CityView from '../views/city/IndexView.vue'

// 3.构建路由的规则
const routes: RouteRecordRaw[] = [
  { // 路由的重定向
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home', // 地址栏地址 - 路由
    name: 'home', // 命名路由  ---   唯一性
    alias: '/h',
    // component: HomeView // 路由映射的页面组件
    components: {
      default: HomeView,
      footer: Footer
    },
    meta: { transition: 'fade' },
  },
  {
    path: '/kind',
    name: 'kind',
    // component: KindView 
    components: {
      default: KindView,
      footer: Footer
    },
    meta: { transition: 'fade' },
  },
  {
    path: '/result',
    name: 'result',
    component: ResultView,
    meta: { transition: 'slide-left' },

  },
  {
    path: '/car',
    name: 'car',
    // component: CartView 
    components: {
      default: CartView,
      footer: Footer
    },
    meta: { transition: 'fade' },
  },
  {
    path: '/user',
    name: 'user',
    // component: UserView 
    components: {
      default: UserView,
      footer: Footer
    },
    meta: { transition: 'fade' },
  },
  {
    path: '/set',
    name: 'set',
    component: SetView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/userOrder',
    name: 'userOrder',
    component: UserOrderView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/userAddress',
    name: 'userAddress',
    component: UserAddressView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/userAddAddress',
    name: 'userAddAddress',
    component: UserAddAddressView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/userFavorite',
    name: 'userFavorite',
    component: UserFavoriteView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/detail/:proid',
    name: 'detail',
    // component: DetailView
    components: {
      default: DetailView
    },
    meta: { transition: 'slide-left' },
  },
  {
    path: '/register',
    name: 'register',
    redirect: '/register/index',
    component: RegisterView,
    children: [
      {
        path: 'index',
        component: CheckTelComponent
      },
      {
        path: 'sms',
        component: SendTelCodeComponent
      },
      {
        path: 'pwd',
        component: SetPasswordComponent
      }
    ],
    meta: { transition: 'slide-left' },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView,
    meta: { transition: 'slide-left' },

  },
  {
    path: '/orderAddress',
    name: 'orderAddress',
    component: OrderAddressListView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/orderAddAddress',
    name: 'orderAddAddress',
    component: OrderAddAddressView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/searchResult',
    name: 'searchResult',
    component: SearchResultView,
    meta: { transition: 'slide-left' },
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: VuexView
  },
  {
    path: '/city',
    name: 'city',
    component: CityView,
    meta: { transition: 'slide-left' },
  }
]

// 4.生成路由
const router: Router = createRouter({
  // vue2 vue-router3 history: 'history' | 'hash' 
  history: createWebHashHistory(),
  routes // routes: routes 简写形式
})

// 全局前置导航守卫 - 一般适用于后台管理系统
// router.beforeEach((to, from, next) => {
//   next()
// })
// 5.暴露路由
export default router