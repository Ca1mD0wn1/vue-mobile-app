<!-- src/views/user/SetView.vue -->
<template>
  <header class="header">
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #title>
        <span class="title">设置</span>
      </template>
    </van-nav-bar>
  </header>
  <div class="content">
    <van-cell title="绑定用户名" is-link @click="showUpdateUsername" :value="username" />
    <van-cell title="修改密码" is-link @click="passwordShow = true" />

    <van-button class="btn" block round color="linear-gradient(to right, #ff6034, #ee0a24)" @click="logout"> 退出登录 </van-button>

    <van-overlay :show="userNameShow" @click="userNameShow = false">
      <div class="box" @click.stop>
        <h1>设置用户名</h1>
        <van-field v-model="username" placeholder="请输入用户名" />
        <van-button round type="danger" @click="updateUsernameFn">更新</van-button>
      </div>
    </van-overlay>
    <van-overlay :show="passwordShow" @click="passwordShow = false">
      <div class="box" @click.stop>
        <h1>更新密码</h1>
        <van-field class="new" v-model="oldPassword" placeholder="原始密码" />
        <van-field class="new" v-model="password" placeholder="新密码" />
        <van-button round type="danger" @click="updatePasswordFn">更新</van-button>
      </div>
    </van-overlay>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { updateUsername, getUserInfo, updatePassword } from '@/api/user'
import { Toast } from 'vant'
export default defineComponent({
  data() {
    return {
      userNameShow: false,
      passwordShow: false,
      username: '',
      oldPassword: '',
      password: ''
    }
  },
  mounted() {
    getUserInfo({ userid: localStorage.getItem('userid')! }).then(res => {
      console.log(res.data)
      this.username = res.data.data[0].username
    })
  },
  methods: {
    showUpdateUsername() {
      if (this.username) {
        Toast('用户名只能更改一次')
      } else {
        this.userNameShow = true
      }
    },
    updateUsernameFn() {
      updateUsername({ userid: localStorage.getItem('userid')!, username: this.username }).then(res => {
        Toast('更改用户名成功')
        this.userNameShow = false
      })
    },
    updatePasswordFn() {
      updatePassword({ userid: localStorage.getItem('userid')!, oldpassword: this.oldPassword, newpassword: this.password }).then(res => {
        if (res.data.code === '10030') {
          Toast('原始密码错误')
        } else {
          Toast('修改密码成功')
          localStorage.removeItem('loginState')
          localStorage.removeItem('userid')
          localStorage.removeItem('token')
          this.$router.push('/login')
        }
      })
    },
    logout() {
      localStorage.removeItem('loginState')
      localStorage.removeItem('userid')
      localStorage.removeItem('token')
      ;(this as any).$store.commit('user/changeLoginState', false)
      this.$router.push('/login')
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
.btn {
  margin-top: 50px;
}
.box {
  height: 30%;
  width: 80%;
  margin: 0 10%;
  background-color: #fff;
  border-radius: 20px;
  margin-top: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  h1 {
    text-align: center;
    flex: 1;
    margin-top: 20px;
  }
  .van-field {
    flex: 6;
    &.new {
      flex: 3;
    }
  }
  .van-button {
    flex: 3;
    margin-bottom: 20px;
  }
}
</style>