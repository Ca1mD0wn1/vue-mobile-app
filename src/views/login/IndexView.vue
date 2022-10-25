<template>
  <header class="header">
    <van-nav-bar title="登录" left-arrow @click-left="$router.back()" />
  </header>
  <div class="content">
    <div class="box">
      <van-field v-model="loginname" clearable placeholder="手机号/账户名/邮箱" />
      <van-field :type="type" v-model="password" clearable placeholder="请输入密码" :right-icon="eye" @click-right-icon="changeType" />
      <van-button block round :disabled="flag" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="login"> 登录 </van-button>
      <p class="tip">
        <router-link to="/register">手机快速注册</router-link>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { FieldType } from 'vant'
import { doLogin } from '../../api/user'
import { Dialog } from 'vant'
import { Toast } from 'vant'
interface IData {
  loginname: string
  password: string
  type: FieldType
}
export default defineComponent({
  data(): IData {
    return {
      loginname: '',
      password: '',
      type: 'password'
    }
  },
  computed: {
    flag() {
      return this.loginname === '' || this.password === ''
    },
    eye(): string {
      return this.type === 'password' ? 'closed-eye' : 'eye-o'
    }
  },
  methods: {
    login() {
      doLogin({ loginname: this.loginname, password: this.password }).then(res => {
        console.log(res.data)
        if (res.data.code === '10010') {
          Dialog.confirm({ message: '该账户未被注册，请先注册', confirmButtonText: '立即注册', cancelButtonText: '取消' })
            .then(() => {
              this.$router.push('/register')
            })
            .catch(() => {})
        } else if (res.data.code === '10011') {
          Toast('密码错误')
        } else {
          localStorage.setItem('token', res.data.data.token)
          localStorage.setItem('userid', res.data.data.userid)
          localStorage.setItem('loginState', String(true))
          this.$router.back()
        }
      })
    },
    changeType() {
      if (this.type === 'password') {
        this.type = 'text'
      } else {
        this.type = 'password'
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
  .box {
    padding: 35px 15px;
    .van-button {
      margin-top: 0.25rem;
    }
    .tip {
      float: right;
      margin-top: 15px;
    }
  }
}
</style>