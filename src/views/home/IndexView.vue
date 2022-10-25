<template>
  <header class="header"><HeaderComponent></HeaderComponent></header>
  <div class="content" @scroll="scroll" ref="content">
    <NoticeComponent></NoticeComponent>
    <van-pull-refresh v-model="loading" @refresh="onRefresh">
      <BannerComponent :list="bannerList"></BannerComponent>
      <NavComponent :list="navList"></NavComponent>
      <SeckillComponent :list="seckillList"></SeckillComponent>
      <van-list v-model:loading="loading" :finished="finished" finished-text="我也是有底线的" @load="onLoad">
        <ProComponent :list="proList" @click="setscrollTop"></ProComponent>
      </van-list>
    </van-pull-refresh>
    <div class="backTop" @click="backTop" v-if="scrollTop > 300">
      <van-icon name="back-top" size="28" />
    </div>
  </div>
</template>

<script lang="ts">
import { getBannerListData, getSeckillListData, getProListData } from '@/api/home'
import { defineComponent } from 'vue'
import BannerComponent from './components/BannerComponent.vue'
import NavComponent from './components/NavComponent.vue'
import SeckillComponent from './components/SeckillComponent.vue'
import ProComponent from './components/ProComponent.vue'
import type { IBannerItem, INavItem, IPro } from './home'
import HeaderComponent from './components/HeaderComponent.vue'
import NoticeComponent from './components/NoticeComponent.vue'
interface IData {
  proList: IPro[]
  seckillList: IPro[]
  navList: INavItem[]
  bannerList: IBannerItem[]
  count: number
  loading: boolean
  finished: boolean
  scrollTop: number
  lookScrollTop: number
  myTimer: any
}
export default defineComponent({
  components: {
    BannerComponent,
    NavComponent,
    SeckillComponent,
    ProComponent,
    HeaderComponent,
    NoticeComponent
  },
  data(): IData {
    return {
      bannerList: [],
      navList: [
        { navid: 1, title: '嗨购超市', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/125678/35/5947/4868/5efbf28cEbf04a25a/e2bcc411170524f0.png' },
        { navid: 2, title: '数码电器', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/178015/31/13828/6862/60ec0c04Ee2fd63ac/ccf74d805a059a44.png' },
        { navid: 3, title: '嗨购服饰', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/41867/2/15966/7116/60ec0e0dE9f50d596/758babcb4f911bf4.png' },
        { navid: 4, title: '嗨购生鲜', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/177902/16/13776/5658/60ec0e71E801087f2/a0d5a68bf1461e6d.png' },
        { navid: 5, title: '嗨购到家', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/196472/7/12807/7127/60ec0ea3Efe11835b/37c65625d94cae75.png' },
        { navid: 6, title: '充值缴费', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/185733/21/13527/6648/60ec0f31E0fea3e0a/d86d463521140bb6.png' },
        { navid: 7, title: '9.9元拼', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/36069/14/16068/6465/60ec0f67E155f9488/595ff3e606a53f02.png' },
        { navid: 8, title: '领券', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/186080/16/13681/8175/60ec0fcdE032af6cf/c5acd2f8454c40e1.png' },
        { navid: 9, title: '领金贴', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/196711/35/12751/6996/60ec1000E21b5bab4/38077313cb9eac4b.png' },
        { navid: 10, title: 'plus会员', imgurl: 'https://m.360buyimg.com/mobilecms/s120x120_jfs/t1/37709/6/15279/6118/60ec1046E4b5592c6/a7d6b66354efb141.png' }
      ],
      seckillList: [],
      proList: [],
      loading: false,
      finished: false,
      count: 2,
      scrollTop: 0,
      lookScrollTop: 0,
      myTimer: null
    }
  },
  mounted() {
    getBannerListData().then(res => {
      this.bannerList = res.data.data
    }),
      getSeckillListData().then(res => {
        this.seckillList = res.data.data
      }),
      getProListData().then(res => {
        this.proList = res.data.data
      })
  },
  methods: {
    onLoad() {
      this.loading = true
      getProListData({ count: this.count }).then(res => {
        this.loading = false
        if (res.data.data.length === 0) {
          this.finished = true
        } else {
          this.count++
          this.proList = [...this.proList, ...res.data.data]
        }
      })
    },
    onRefresh() {
      this.loading = true
      getProListData().then(res => {
        this.proList = res.data.data
        this.count = 2
        this.finished = false
        this.loading = false
      })
    },
    backTop() {
      let myTimer = setInterval(() => {
        ;(this.$refs.content as HTMLDivElement).scrollTop -= 200
        if ((this.$refs.content as HTMLDivElement).scrollTop <= 0) {
          clearTimeout(myTimer)
        }
      }, 1)
    },
    scroll(event: Event) {
      if (this.myTimer) clearTimeout(this.myTimer)
      this.myTimer = setTimeout(() => {
        this.lookScrollTop = (this.$refs.content as HTMLDivElement).scrollTop
      }, 500)
      this.scrollTop = (event.target as HTMLDivElement).scrollTop
    },
    setscrollTop() {
      sessionStorage.setItem('scrollTop', this.lookScrollTop + '')
    }
  }
})
</script>
<style lang="scss" scoped>
// ++++++++
.backTop {
  position: fixed;
  bottom: 0.6rem;
  right: 10px;
  width: 36px;
  height: 36px;
  background-color: #fff;
  border: 1px solid #efefef;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
}
</style>