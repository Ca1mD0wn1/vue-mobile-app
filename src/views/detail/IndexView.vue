<!-- src/views/detail/IndexView.vue -->

<template>
  <div class="myHeader">
    <Transition name="fade">
      <header class="header1" v-show="scrollTop < 300">
        <ul>
          <li class="left" @click="$router.back()">
            <van-icon name="arrow-left" />
          </li>
          <li class="middle"></li>
          <li class="right">
            <van-popover placement="bottom-end" v-model:show="showPopover" :actions="actions" @select="onSelect" theme="dark">
              <template #reference>
                <van-icon name="ellipsis" />
              </template>
            </van-popover>
          </li>
        </ul>
      </header>
    </Transition>
    <Transition name="fade">
      <header class="header2" v-show="scrollTop > 300">
        <ul>
          <li class="left" @click="$router.back()">
            <van-icon name="arrow-left" />
          </li>
          <li class="middle">
            <span>详情</span>
            <span>推荐</span>
          </li>
          <li class="right">
            <van-popover placement="bottom-end" v-model:show="showPopover" :actions="actions" @select="onSelect" theme="dark">
              <template #reference>
                <van-icon name="ellipsis" />
              </template>
            </van-popover>
          </li>
        </ul>
      </header>
    </Transition>
  </div>
  <div class="content" @scroll="scroll" ref="content">
    <BannerComponent :list="banners" :video="video"></BannerComponent>
    <ProInfoComponent :proname="proname" :discount="discount" :originprice="originprice" :sales="sales" :brand="brand" :category="category"></ProInfoComponent>
    <ProComponent :list="recommendList"></ProComponent>

    <van-action-bar>
      <van-action-bar-icon icon="chat-o" text="客服" />
      <van-action-bar-icon icon="cart-o" text="购物车" />
      <van-action-bar-icon v-if="!isStar" icon="star-o" text="收藏" @click="changeStar" />
      <van-action-bar-icon v-else icon="star" text="已收藏" color="red" @click="changeStar" />

      <van-action-bar-button v-if="issale" type="warning" text="加入购物车" @click="addCartFn" />
      <van-action-bar-button v-if="issale" type="danger" text="立即购买" />
      <van-action-bar-button v-else type="danger" :disabled="issale === 0" text="商品已下架" />
    </van-action-bar>

    <van-share-sheet v-model:show="showShare" title="立即分享给好友" :options="options" @select="onShareSelect" />
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { getDetailData, getDetailRecommendData } from '@/api/detail'
import BannerComponent from './components/BannerComponent.vue'
import ProInfoComponent from './components/ProInfoComponent.vue'
import ProComponent from './components/ProComponent.vue'
import type { IPro } from '../home/home'
import { addCart } from '@/api/car'
import { Toast } from 'vant'
interface IData {
  proid: string
  banners: string[]
  proname: string // 名称
  originprice: number // 原价
  discount: number // 折扣
  brand: string // 品牌
  category: string // 分类
  sales: number // 销量
  issale: number // 1表示正在售卖，0表示已下架
  video: string //视频路径
  recommendList: IPro[]
  scrollTop: number
  showShare: boolean
  showPopover: boolean
  actions: Array<{ text: string; icon: string }>
  options: Array<{ name: string; icon: string }>
  isStar: boolean
}
export default defineComponent({
  data(): IData {
    return {
      proid: '',
      banners: [],
      proname: '',
      originprice: 0,
      discount: 0,
      brand: '',
      category: '',
      sales: 0,
      issale: 1,
      video: '',
      recommendList: [],
      scrollTop: 0,
      actions: [
        { text: '首页', icon: 'wap-home-o' },
        { text: '我的', icon: 'manager-o' },
        { text: '分享', icon: 'share-o' }
      ],
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ],
      showShare: false,
      showPopover: false,
      isStar: false
    }
  },
  components: {
    BannerComponent,
    ProInfoComponent,
    ProComponent
  },
  mounted() {
    this.proid = this.$route.params.proid as string
    this.getData(this.proid)
    getDetailRecommendData().then(res => {
      this.recommendList = res.data.data
    })
  },
  methods: {
    getData(proid: string) {
      getDetailData(proid).then(res => {
        const result = res.data.data
        this.banners = result.banners[0].split(',')
        this.proname = result.proname
        this.originprice = result.originprice
        this.discount = result.discount
        this.brand = result.brand
        this.category = result.category
        this.sales = result.sales
        this.issale = result.issale
        this.video = 'https://vod.300hu.com/4c1f7a6atransbjngwcloud1oss/542359bf391145770504425473/v.f20.mp4'
      })
    },
    scroll(event: Event) {
      this.scrollTop = (event.target as HTMLDivElement).scrollTop
    },
    onSelect(action: { text: string; icon: string }) {
      console.log(action)
      switch (action.text) {
        case '首页':
          this.$router.push('/home')
          break
        case '我的':
          this.$router.push('/user')
          break
        case '分享':
          this.showShare = true
          break
      }
    },
    onShareSelect(option: { name: string; icon: string }) {
      console.log(option)
    },
    changeStar() {
      if (this.isStar) {
        const starArr = JSON.parse(localStorage.getItem('stars')!)
        const index = starArr.findIndex((item: string) => item === this.proid)
        starArr.splice(index, 1)
        localStorage.setItem('stars', JSON.stringify(starArr))
        this.isStar = false
      } else {
        const arrStr: any = localStorage.getItem('stars') || '[]'
        const starArr = JSON.parse(arrStr)
        starArr.push(this.proid)
        localStorage.setItem('stars', JSON.stringify(starArr))
        this.isStar = true
      }
    },
    getStarFlag(proid: string) {
      const starArr = JSON.parse(localStorage.getItem('stars')!)
      if (starArr) {
        const index = starArr.findIndex((item: string) => item === proid)
        if (index !== -1) {
          this.isStar = true
        } else {
          this.isStar = false
        }
      } else {
        this.isStar = false
      }
    },
    addCartFn() {
      if (localStorage.getItem('loginState') === 'true') {
        // console.log(localStorage.getItem('localStorage'))
        addCart({ userid: localStorage.getItem('userid')!, proid: this.proid, num: 1 }).then(res => {
          if (res) {
            Toast('加入购物车成功')
          } else {
            Toast('请先登录')
          }
        })
      } else {
        this.$router.push('/login')
      }
    }
  },

  watch: {
    $route(val) {
      this.getData(val.params.proid)
      console.log(val.params.proid)
      this.proid = val.params.proid
      this.getStarFlag(this.proid)
      ;(this.$refs.content as HTMLDivElement).scrollTop = 0
    }
  }
})
</script>



<style lang="scss">
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition: all 0.5s;
}
.fade-leave-active {
  transition: all 0s;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.myHeader {
  user-select: none;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 999;
  .header1 {
    height: 0.44rem;
    padding: 6px 15px;
    box-sizing: border-box;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      li {
        &:nth-child(1),
        &:nth-child(3) {
          font-size: 32px;
          width: 44px;
        }
        &:nth-child(2) {
          flex: 1;
        }
      }
    }
  }
  .header2 {
    height: 0.44rem;
    padding: 6px 15px;
    box-sizing: border-box;
    background-color: #fff;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      li {
        &:nth-child(1),
        &:nth-child(3) {
          font-size: 32px;
          width: 44px;
        }
        &:nth-child(2) {
          flex: 1;
          display: flex;
          span {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>