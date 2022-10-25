<!-- src/views/search/IndexView.vue -->
<template>
  <header class="header">
    <ul>
      <li @click="$router.back()">
        <van-icon name="arrow-left" size="24" />
      </li>
      <li>
        <van-field left-icon="search" v-model="keyword" placeholder="清风抽纸" clearable />
      </li>
      <li @click="submit">
        <van-button type="danger" size="mini">搜索</van-button>
      </li>
    </ul>
  </header>
  <div class="content">
    <div class="list">
      <h3>
        最近搜索
        <span @click="deleteList">
          <van-icon name="delete-o" />
        </span>
      </h3>
      <van-tag v-for="(item, index) of searchList" :key="index" plain @click="search(item)">{{ item }}</van-tag>
    </div>
    <div class="list">
      <h3>热门搜索</h3>
      <van-tag v-for="item of hotList" :key="item.wordid" plain @click="search(item.keyword)">{{ item.keyword }}</van-tag>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getHotSearchListData } from '@/api/search'
interface IWord {
  keyword: string
  num: number
  wordid: string
}
interface IData {
  keyword: string
  hotList: IWord[]
  searchList: string[]
}
export default defineComponent({
  data(): IData {
    return {
      keyword: '',
      hotList: [],
      searchList: []
    }
  },
  mounted() {
    this.searchList = JSON.parse(localStorage.getItem('searchList')!)
    getHotSearchListData().then(res => {
      console.log(res.data)
      this.hotList = res.data.data
    })
  },
  methods: {
    deleteList() {
      localStorage.removeItem('searchList')
      this.searchList = []
    },
    search(keyword: string) {
      this.keyword = keyword

      this.submit()
    },
    submit() {
      if (localStorage.getItem('searchList')) {
        this.searchList = JSON.parse(localStorage.getItem('searchList')!)
        const index = this.searchList.findIndex(item => item === this.keyword)
        if (index !== -1) {
          this.searchList.splice(index, 1)
        }
        this.searchList.unshift(this.keyword)
      } else {
        console.log(1)
        const arr: string[] = []
        arr.unshift(this.keyword)
        this.searchList = arr
      }
      localStorage.setItem('searchList', JSON.stringify(this.searchList))

      this.$router.push('/searchResult?keyword=' + this.keyword)
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  background-color: #fff;
  ul {
    height: 100%;
    display: flex;
    li {
      display: flex;
      justify-content: center;
      align-items: center;
      &:nth-child(1) {
        width: 40px;
      }
      &:nth-child(2) {
        flex: 1;
        .van-field {
          background-color: #efefef;
          border-radius: 16px;
          height: 32px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      &:nth-child(3) {
        width: 60px;
      }
    }
  }
}
.list {
  background-color: #fff;
  padding: 15px;
  .van-tag {
    padding: 5px 10px;
    margin: 3px;
  }
}
</style>