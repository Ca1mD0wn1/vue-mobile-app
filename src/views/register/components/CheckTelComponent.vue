
<template>
  <div class="box">
    <van-field v-model="tel" type="text" placeholder="请输入手机号" />
    <van-button block round :disabled="flag" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="next"> 下一步 </van-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { doCheckPhone } from '@/api/user'
import { Dialog } from 'vant'
export default defineComponent({
  data() {
    return {
      tel: ''
    }
  },
  computed: {
    flag(): boolean {
      return !/^(?:(?:\+|00)86)?1[3-9]\d{9}$/.test(this.tel)
    }
  },
  methods: {
    next() {
      doCheckPhone({ tel: this.tel }).then(res => {
        console.log(res.data)
        if (res.data.code === '10005') {
          Dialog.confirm({
            message: '该手机号已被注册，请直接登录',
            confirmButtonText: '立即登录',
            cancelButtonText: '取消'
          })
            .then(() => {
              this.$router.back()
            })
            .catch(() => {})
        } else {
          console.log(res.data)
          localStorage.setItem('tel', this.tel)
          this.$router.push('/register/sms')
        }
      })
    }
  }
})
</script>
<style lang="scss" scoped>
.box {
  padding: 35px 15px;
  .van-button {
    margin-top: 0.55rem;
  }
}
</style>