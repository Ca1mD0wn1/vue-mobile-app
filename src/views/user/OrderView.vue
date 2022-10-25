<!-- src/views/user/OrderView.vue -->
<template>
  <header class="header">
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #title>
        <span class="title">订单查看</span>
      </template>
    </van-nav-bar>
  </header>
  <div class="content">
    <van-tabs v-model:active="active">
      <van-tab title="全部订单">
        <van-card v-for="item of orderList" :key="item" :price="item.originprice" :title="item.proname" :desc="item.time" :thumb="item.img1">
          <template #num>
            <van-button key v-if="item.status === 0" type="warning" size="mini">去支付</van-button>
            <van-button v-else-if="item.status === 1" type="danger" size="mini">确认收货</van-button>
            <van-button v-else type="primary" size="mini">去评价</van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待付款">
        <van-card v-for="item of payList" :key="item" :price="item.originprice" :title="item.proname" :desc="item.time" :thumb="item.img1">
          <template>
            <van-button type="warning" size="mini">去支付</van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待收货">
        <van-card v-for="item of receiptList" :key="item" :price="item.originprice" :title="item.proname" :desc="item.time" :thumb="item.img1">
          <template #num>
            <van-button type="danger" size="mini">确认收货</van-button>
          </template>
        </van-card>
      </van-tab>
      <van-tab title="待评价">
        <van-card v-for="item of assessList" :key="item" :price="item.originprice" :title="item.proname" :desc="item.time" :thumb="item.img1">
          <template #num>
            <van-button type="primary" size="mini">去评价</van-button>
          </template>
        </van-card>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getAllOrderData } from '@/api/user'
export default defineComponent({
  data(): any {
    return {
      active: 0,
      orderList: []
    }
  },
  computed: {
    payList() {
      return (this as any).orderList.filter((item: any) => item.status === 0)
    },
    receiptList() {
      return (this as any).orderList.filter((item: any) => item.status === 1)
    },
    assessList() {
      return (this as any).orderList.filter((item: any) => item.status === 2)
    }
  },
  mounted() {
    this.active = Number(this.$route.query.type)

    getAllOrderData({ userid: localStorage.getItem('userid')! }).then(res => {
      console.log(res.data)
      this.orderList = res.data.data
    })
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
</style>