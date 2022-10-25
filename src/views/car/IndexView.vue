<template>
  <header class="header">
    <van-nav-bar title="购物车" left-arrow @click-left="$router.back()" />
  </header>
  <div class="content">
    <div class="no-shop" v-if="empty">
      <van-empty description="购物车空空如也">
        <van-button round type="danger" class="bottom-button" @click="$router.push('/kind')">立即购物</van-button>
      </van-empty>
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"> 快点来看看 </van-divider>
      <ProComponent :list="proList"></ProComponent>
    </div>
    <div class="shop-list" v-else>
      <van-swipe-cell v-for="item of carList" :key="item.cartid" :before-close="beforeClose">
        <van-row class="myItem">
          <van-col span="2">
            <van-checkbox v-model="item.flag" @change="selectOne(item)"></van-checkbox>
          </van-col>
          <van-col span="22">
            <van-card :price="item.originprice" :title="item.proname" :thumb="item.img1">
              <template #num>
                <van-stepper v-model="item.num" theme="round" button-size="22" disable-input @change="updateNum(item)" />
              </template>
            </van-card>
          </van-col>
        </van-row>

        <template #right>
          <van-button square text="删除" type="danger" @click="getDeleteId(item.cartid)" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"> 可能你想要 </van-divider>
      <ProComponent :list="proList"></ProComponent>

      <van-submit-bar @click="submit" capture stop :disabled="totalNum === 0" :price="totalPrice" :button-text="totalNum > 0 ? `去结算(${totalNum})` : `去结算`">
        <van-checkbox v-model="checked" @click="changeType" stop capture>全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ICartItem } from './car'
import type { IPro } from '../home/home'
import { getCartListData, removeOneData, selectAllData, selectOneData, updateOneDataNum, getCartRecommendData } from '@/api/car'
import { Dialog } from 'vant'
import { addOrderData } from '@/api/order'
import ProComponent from './ProComponents.vue'
interface IData {
  carList: ICartItem[]
  id: string
  checked: boolean
  proList: IPro[]
}

export default defineComponent({
  components: { ProComponent },
  data(): IData {
    return {
      carList: [],
      id: '',
      checked: false,
      proList: []
    }
  },

  mounted() {
    if (localStorage.getItem('userid')) {
      this.getCartList()
    } else {
      this.$router.push('/login')
    }

    getCartRecommendData().then(res => {
      this.proList = res.data.data
    })
  },
  computed: {
    empty(): boolean {
      return this.carList.length === 0
    },
    totalNum(): number {
      return this.carList.reduce((sum, item) => {
        // 选中才累加
        return item.flag ? (sum += item.num) : (sum += 0)
      }, 0)
    },

    totalPrice(): number {
      return (
        this.carList.reduce((sum, item) => {
          return item.flag ? (sum += item.num * item.originprice) : (sum += 0)
        }, 0) * 100
      )
    }
  },
  methods: {
    getCartList() {
      getCartListData({ userid: localStorage.getItem('userid')! }).then(res => {
        if (res.data.code === '10020') {
          this.carList = []
        } else {
          this.carList = res.data.data

          this.checked = this.carList.every(item => item.flag)
        }
      })
    },
    beforeClose({ position }: { position: 'left' | 'right' | 'cell' | 'outside' }): any {
      switch (position) {
        case 'right':
          return new Promise<void>(resolve => {
            Dialog.confirm({
              title: 'Are you sure you want to delete this?'
            }).then(() => {
              removeOneData({ cartid: this.id }).then(() => {
                this.getCartList()
                this.id = ''
                resolve()
              })
            })
          })
        case 'outside':
          return true
      }
    },
    getDeleteId(cartid: string): void {
      this.id = cartid
    },
    updateNum({ cartid, num }: ICartItem) {
      updateOneDataNum({ cartid, num }).then(() => {
        this.getCartList()
      })
    },
    changeType() {
      selectAllData({ userid: localStorage.getItem('userid')!, type: this.checked }).then(res => {
        this.checked = this.carList.every(item => item.flag)
        this.getCartList()
      })
    },
    selectOne({ cartid, flag }: ICartItem) {
      selectOneData({ cartid, flag }).then(() => {
        this.getCartList()
      })
    },
    submit() {
      if ((event?.target! as HTMLElement).tagName !== 'BUTTON') return

      addOrderData({ userid: localStorage.getItem('userid')! }).then(res => {
        // this.$router.push('/order/' + res.data.time) // /order/:time
        this.$router.push('/order?time=' + res.data.time) // /order
      })
    }
  }
})
</script>
<style lang="scss">
.delete-button {
  height: 100%;
}
.myItem {
  background: var(--van-card-background-color);
  .van-col--2 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
