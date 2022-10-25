<!-- src/views/user/FavoriteView.vue -->
<template>
  <header class="header">
    <van-nav-bar   
      left-arrow
      @click-left="$router.back()"
    >
      <template #title>
        <span class="title">我的收藏夹</span>
      </template>
      
    </van-nav-bar>
  </header>
  <div class="content">
    <div class="no" v-if="flag">
      <van-empty description="收藏夹空空如也">
        <van-button round type="danger" class="bottom-button" @click="$router.push('/kind')">立即浏览收藏</van-button>
      </van-empty>
    </div>
    <div class="has" v-else>
      <van-swipe-cell
        v-for="(item, index) of favoriteList"
        :key="item.proid"
      >
      <van-card
        :price="item.originprice"
        :title="item.proname"
        :thumb="item.img1"
      >
      </van-card>
        
        <template #right>
          <van-button square text="删除" type="danger" @click="deleteItem(index)" class="delete-button" />
        </template>
      </van-swipe-cell>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { getDetailData } from '@/api/detail'
  export default defineComponent({
    data (): any {
      return {
        arr: [],
        favoriteList: []
      }
    },
    computed: {
      flag () {
        return this.arr.length === 0
      }
    },
    mounted () {
      this.arr = JSON.parse(localStorage.getItem('stars')!)
      const newArr: any = []
      this.arr.forEach((item: string) => {
        newArr.push(getDetailData(item))
      })
      Promise.all(newArr).then(res => {
        console.log(res)
        res.forEach((item: any) => {
          this.favoriteList.push(item.data.data)
        })
        console.log(this.favoriteList)
      })
    },
    methods: {
      deleteItem (index: number) {
        this.favoriteList.splice(index, 1)
        this.arr.splice(index, 1)
        localStorage.setItem('stars', JSON.stringify(this.arr))
      }
    }
    
  })
</script>

<style lang="scss" scoped>
   .header {
    // box-sizing: border-box;
    border-bottom: 3px solid #666;
    .van-nav-bar{
      // background-color: #f66;
      .title {
        color: #333;
      }
    }
  }
  .delete-button {
    height: 100%;
  }
</style>