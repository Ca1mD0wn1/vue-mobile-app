import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router"; // 路由规则的类型 ---- 路由规则的类型注解

// 2.引入页面组件
import Footer from '../components/FooterComponent.vue'
import HomeView from "../views/home/IndexView.vue";
import KindView from "../views/kind/IndexView.vue";
import CarView from "../views/car/IndexView.vue";
import UserView from "../views/user/IndexView.vue";
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
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home", // 地址栏地址 - 路由
    name: "home", // 命名路由  ---   唯一性
    components: {
      default: HomeView,
      footer: Footer
    }, // 路由映射的页面组件
  },
  {
    path: "/kind",
    name: "kind",
    components: {
      default: KindView,
      footer: Footer
    }
  },
  {
    path: "/car",
    name: "car",
    components: {
      default: CarView,
      footer: Footer
    }
  },
  {
    path: "/user",
    name: "user",
    components: {
      default: UserView,
      footer: Footer
    }
  },
  {
    path: "/detail/:proid",
    name: "detail",
    components: {
      default: DetailView,
    }
  }, {
    path: "/register",
    name: "register",
    redirect: '/register/index',
    component: RegisterView,
    children: [
      {
        path: "index",
        component: CheckTelComponent
      },
      {
        path: "sms",
        component: SendTelCodeComponent
      },
      {
        path: 'pwd',
        component: SetPasswordComponent
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/order',
    name: 'order',
    component: OrderView
  },
  {
    path: '/orderAddress',
    name: 'orderAddress',
    component: OrderAddressListView
  },
  {
    path: '/orderAddAddress',
    name: 'orderAddAddress',
    component: OrderAddAddressView
  },
  { // +++++
    path: '/search',
    name: 'search',
    component: SearchView
  }

];
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
