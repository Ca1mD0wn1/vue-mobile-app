<!-- src/views/kind/ResultView.vue -->
<template>
  <header class="header">
    <ul>
      <li @click="$router.back()">
        <van-icon name="arrow-left" size="24"/>
      </li>
      <li>
        <van-field left-icon="search" @blur="flag=false" @focus="flag=true" v-model="keyword"  placeholder="清风抽纸" clearable/>
      </li>
      <li @click="submit" >
        <van-button type="danger" v-show="flag" size="mini" >搜索</van-button>
      </li>
    </ul>
  </header>
  <div class="content" >
    <van-sticky :offset-top="44">
      <van-dropdown-menu>
        <van-dropdown-item v-model="value" :options="options" @change="sort"/>
        <van-dropdown-item title="筛选" ref="item">
          <div class="priceField">
            <van-field v-model="min" placeholder="最低价格" />
            -
            <van-field v-model="max" placeholder="最高价格" />
          </div>
          <div style="padding: 5px 16px;">
            <van-button type="danger" block round @click="onConfirm">
              确认
            </van-button>
          </div>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    
    <van-card
      v-for="item of searchList"
      :key="item.proid"
      :price="item.originprice"
      :title="item.proname"
      :thumb="item.img1"
      @click="toDetail(item.proid)"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { getCategoryBrandProListData } from '@/api/kind'
  import type { IPro } from '../home/home';
  import type { DropdownItemInstance } from 'vant';

  interface IData {
    keyword: string
    searchList: IPro[]
    initList: IPro[]
    list: string[]
    options: Array<{text: string, value: number}>
    value: number
    min: string
    max: string,
    flag: boolean
  }
  export default defineComponent({
    data (): IData {
      return {
        keyword: '',
        searchList: [],
        initList: [],
        list: [],
        options: [
          { text: '全部商品', value: 0 },
          { text: '价格升序', value: 1 },
          { text: '价格降序', value: -1 },
        ],
        value: 0,
        min: "",
        max: "",
        flag: false
      }
    },
    mounted () {
      this.keyword = (this.$route.query.brand as string)
      getCategoryBrandProListData({ brand: this.keyword, category: (this.$route.query.category as string) }).then(res => {
        this.searchList = res.data.data
        this.initList = JSON.parse(JSON.stringify(res.data.data))
      })
    },
    methods: {
      submit () {
        if (localStorage.getItem('searchList')) {
          this.list = JSON.parse(localStorage.getItem('searchList')!)
          const index = this.list.findIndex(item => item === this.keyword)
          if (index !== -1) {
            this.list.splice(index, 1)
          }
          this.list.unshift(this.keyword)
        } else {
          console.log(1)
          const arr: string[] = []
          arr.unshift(this.keyword)
          this.list = arr
        }
        localStorage.setItem('searchList', JSON.stringify(this.list))
        getCategoryBrandProListData({ brand: this.keyword, category: (this.$route.query.category as string) }).then(res => {
          this.searchList = res.data.data
          this.initList = JSON.parse(JSON.stringify(res.data.data))
        })
      },
      sort () {
        console.log(this.value)
        switch (this.value) {
          case 0:
            this.searchList = this.initList
            break;
          case 1:
            this.searchList.sort((a, b) => a.originprice - b.originprice)
            break;
          case -1:
            this.searchList.sort((a, b) => b.originprice - a.originprice)
            break;
          default:
            this.searchList = this.initList
            break;
        }
      },
      onConfirm () {
        if (this.min === '') {
          this.min = '0'
        }
        if (this.max === '') {
          this.max = '9999999'
        }
        const arr = this.searchList.filter(item => {
          return item.originprice >= Number(this.min) && item.originprice <= Number(this.max)
        })
        console.log(arr)
        this.searchList = arr;
        // this.min = '';
        // this.max = '';
        (this.$refs.item as DropdownItemInstance ).toggle()
      },
      toDetail (proid: string) {
        this.$router.push('/detail/' + proid)
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
  .priceField {
    display: flex;
  }
</style>