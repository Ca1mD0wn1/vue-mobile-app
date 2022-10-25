<!-- src/views/user/IndexView.vue -->
<template>
  <header class="header">
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #title>
        <span class="title">个人中心</span>
      </template>
      <template #right>
        <router-link v-if="userFlag" to="/set"><van-icon name="setting-o" size="18" color="#333" /></router-link>
      </template>
    </van-nav-bar>
  </header>
  <div class="content">
    <div class="avatarBox">
      <van-image round width="0.8rem" height="0.8rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
      <a href="#" v-if="userFlag"
        ><p>欢迎您:{{ username }}</p></a
      >
      <router-link v-else to="/login"><p>请点击登录</p></router-link>
    </div>
    <van-grid>
      <van-grid-item icon="refund-o" text="待付款" @click="getOrder(1)" />
      <van-grid-item icon="shop-o" text="待收货" @click="getOrder(2)" />
      <van-grid-item icon="thumb-circle-o" text="待评价" @click="getOrder(3)" />
      <van-grid-item icon="orders-o" text="全部订单" @click="getOrder(0)" />
    </van-grid>

    <van-cell title="地址管理" is-link @click="toAddressList" />
    <van-cell title="我的收藏夹" is-link @click="toFavorite" />
    <van-cell title="关于我们" is-link @click="toAbout" />

    <div class="logo">
      <van-image :src="logo"></van-image>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import logo from '@/assets/logo.png'
import { getUserInfo } from '@/api/user'
export default defineComponent({
  data() {
    return {
      logo,
      userFlag: false,
      username: ''
    }
  },
  mounted() {
    if (localStorage.getItem('userid')) {
      // 用户登录
      this.userFlag = true
      getUserInfo({ userid: localStorage.getItem('userid')! }).then(res => {
        console.log(res.data)
        this.username = res.data.data[0].username ? res.data.data[0].username : res.data.data[0].tel
      })
    } else {
      // 用户未登录
      this.userFlag = false
      // this.$router.push('/login')
    }
  },

  methods: {
    getOrder(type: number) {
      if (localStorage.getItem('loginState') === 'true') {
        this.$router.push('/userOrder?type=' + type)
      } else {
        this.$router.push('/login')
      }
    },
    toAddressList() {
      if (localStorage.getItem('loginState') === 'true') {
        this.$router.push('/userAddress')
      } else {
        this.$router.push('/login')
      }
    },
    toFavorite() {
      this.$router.push('/userFavorite')
    },
    toAbout() {
      this.$router.push('/about')
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  // box-sizing: border-box;
  border-bottom: 3px solid #666;
  .van-nav-bar {
    // background-color: #f66;
    .title {
      color: #333;
    }
  }
}
.avatarBox {
  width: 100%;
  height: 1rem;
  box-sizing: border-box;
  padding: 10px;
  background-color: rgb(246, 210, 210);
  display: flex;
  a {
    display: block;
    display: flex;
    align-items: center;
    margin-left: 20px;
    p {
      font-size: 16px;
      color: #333;
    }
  }
}
.logo {
  margin: 30px auto;
  display: flex;
  justify-content: center;
}
</style>