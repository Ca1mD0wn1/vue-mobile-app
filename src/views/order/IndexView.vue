<template>
  <header class="header">
    <van-nav-bar title="确定订单" left-arrow @click-left="$router.back()" />
  </header>
  <div class="content">
    <van-cell center v-if="flag" title="请添加地址" is-link @click="toAddressList" />
    <van-cell center v-else :title="name + ' ' + tel" is-link :label="address" @click="toAddressList" />

    <van-card v-for="item of orderList" :key="item.orderid" :num="item.num" :price="item.originprice" :title="item.proname" :thumb="item.img1" />
    <div class="tip">
      <p>
        <span>原价：</span><span>{{ totalPrice }}</span>
      </p>
      <p>
        <span>快递费：</span><span>{{ express }}</span>
      </p>
    </div>
    <van-submit-bar :price="totalPrice * 100 + express * 100" button-text="去支付" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getOrderListData } from '../../api/order'
interface IOrderItem {
  addressDetail: string
  city: string
  county: string
  discount: number
  img1: string
  name: string
  num: number
  orderid: string
  originprice: number
  proid: string
  proname: string
  province: string
  status: number
  tel: string
  time: string
  userid: string
}
interface IData {
  orderList: IOrderItem[]
  time: string
  express: number
}
export default defineComponent({
  data(): IData {
    return {
      orderList: [],
      time: '',
      express: 0
    }
  },
  computed: {
    totalPrice(): number {
      return this.orderList.reduce((sum, item) => {
        return (sum += item.num + item.originprice)
      }, 0)
    },
    flag(): boolean {
      return this.orderList[0]?.tel === ''
    },
    name(): string {
      return this.orderList[0]?.name
    },
    tel(): string {
      return this.orderList[0]?.tel
    },
    address() {
      const province = this.orderList[0]?.province
      const city = this.orderList[0]?.city
      const county = this.orderList[0]?.county
      const addressDetail = this.orderList[0]?.addressDetail

      let str = ''
      if (province === city) {
        str += province + county + addressDetail
      } else {
        str += province + city + county + addressDetail
      }
      return str
    }
  },
  mounted() {
    this.time = this.$route.query.time as string
    this.express = Math.floor(Math.random() * 20)

    const userid = localStorage.getItem('userid')!
    getOrderListData({ time: this.time, userid }).then(res => {
      console.log(res.data)
      this.orderList = res.data.data
    })
  },
  methods: {
    toAddressList() {
      this.$router.push('/orderAddress?time=' + this.time)
    }
  }
})
</script>

<style lang="scss" scoped>
.tip {
  margin-top: 15px;
  margin-right: 10px;
  text-align: right;
  p {
    display: flex;
    span {
      &:nth-child(1) {
        flex: 1;
      }
      &:nth-child(2) {
        width: 40px;
      }
    }
  }
}
</style>