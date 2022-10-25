<template>
  <div class="box">
    <div class="tip">
      <van-image :src="pwd" height="71"></van-image>
      <p>请设置登录密码</p>
    </div>
    <van-field :type="type" v-model="password" clearable placeholder="请设置至少6位登录密码" :right-icon="eye" @click-right-icon="changeType" />
    <p class="pwdTip">密码强度校验,最少6位,包括至少1个大写字母,1个小写字母,1个数字</p>
    <van-button block round :disabled="flag" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="next"> 完成 </van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import pwd from '@/assets/pwd.png'
import type { FieldType } from 'vant'
import { doFinishRegister } from '@/api/user'

interface IData {
  tel: string
  password: string
  pwd: string
  type: FieldType
}
export default defineComponent({
  data(): IData {
    return {
      tel: localStorage.getItem('tel')!,
      password: '',
      pwd,
      type: 'password'
    }
  },
  computed: {
    flag(): boolean {
      return !/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/.test(this.password)
    },
    eye(): string {
      return this.type === 'password' ? 'closed-eye' : 'eye-o'
    }
  },
  methods: {
    next(): void {
      console.log(this.tel, this.password)
      doFinishRegister({ tel: this.tel, password: this.password }).then(res => {
        console.log(123, res.data)
        localStorage.removeItem('tel')
        this.$router.go(-3)
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

<style lang="scss">
.box {
  padding: 35px 15px;
  .van-button {
    margin-top: 0.55rem;
  }
  .tip {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    p {
      margin-top: 20px;
    }
  }
  .pwdTip {
    margin-top: 10px;
  }
}
</style>