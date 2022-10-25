<template>
  <div class="box">
    <div class="tip">
      <van-image :src="sms" height="71"></van-image>
      <p>我们将以短信形式将验证码发送给您</p>
    </div>
    <van-field v-model="telcode" clearable placeholder="请输入短信验证码" class="field">
      <template #button>
        <van-button class="codeBtn" round size="small" type="primary" @click="sendCode" :disabled="isSend">{{ sendMessage }}</van-button>
      </template>
    </van-field>
    <van-button class="nextBtn" block round :disabled="flag" color="linear-gradient(to right, #ff6034, #ee0a24)" @click="next"> 下一步 </van-button>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import sms from '@/assets/sms.png'

import { Toast } from 'vant'
import { doSendMsgCode, doCheckCode } from '@/api/user'
export default defineComponent({
  data() {
    return {
      tel: localStorage.getItem('tel'),
      telcode: '',
      sms,
      isSend: false,
      sendMessage: '发送验证码'
    }
  },
  computed: {
    flag(): boolean {
      return !/^\d{5,}$/.test(this.telcode)
    }
  },
  mounted() {
    if (!localStorage.getItem('tel')) {
      this.$router.replace('/register/index')
    }
  },
  methods: {
    sendCode() {
      this.isSend = true
      let count = 60
      let timer = setInterval(() => {
        count--
        this.sendMessage = '重新发送' + count
        if (count <= 0) {
          this.sendMessage = '发送验证码'
          clearInterval(timer)
          this.isSend = false
        }
      }, 1000)

      doSendMsgCode({ tel: this.tel! }).then(res => {
        console.log(res.data)
      })
    },
    next() {
      doCheckCode({ tel: this.tel!, telcode: this.telcode }).then(res => {
        if (res.data.code === '10007') {
          Toast('验证码错误')
        } else {
          this.$router.push('/register/pwd')
        }
      })
    }
  }
})
</script>
<style lang="scss" scoped>
.box {
  padding: 35px 15px;
  .field {
    margin-top: 0.6rem;
  }
  .nextBtn {
    margin-top: 0.55rem;
  }
  .codeBtn {
    background-color: rgba(226, 35, 30, 0.2);
    color: #e2231a;
    border: 0 solid rgba(226, 35, 30, 0.2);
    margin-top: 0rem;
    padding: 15px 15px;
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
}
</style>