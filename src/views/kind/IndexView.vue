<!-- src/views/kind/IndexView.vue -->
<template>
  <header class="header">
    <van-nav-bar left-arrow @click-left="$router.back()">
      <template #title>
        <span class="title">商品分类</span>
      </template>
    </van-nav-bar>
  </header>
  <div class="content">
    <div class="box">
      <van-sidebar v-model="active">
        <van-sidebar-item v-for="(item, index) of categoryList" :key="index" :title="item" @click="getCategoryBrandList(item)" />
      </van-sidebar>
      <div class="brandList">
        <van-grid :square="true">
          <van-grid-item v-for="(item, index) of brandList" :key="index" icon="photo-o" @click="toSearchList(item.brand)">
            <template #text>
              <div class="brandname van-ellipsis">{{ item.brand }}</div>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getCategoryListData, getCategoryBrandListData } from '@/api/kind'
interface IBrand {
  brand: string
}
interface IData {
  active: number
  categoryList: string[]
  brandList: IBrand[]
}
export default defineComponent({
  data(): IData {
    return {
      active: 0,
      categoryList: [],
      brandList: []
    }
  },
  mounted() {
    getCategoryListData().then(res => {
      this.categoryList = res.data.data
      this.getCategoryBrandList(res.data.data[0])
    })
  },
  methods: {
    getCategoryBrandList(category: string) {
      getCategoryBrandListData({ category }).then(res => {
        console.log(res.data)
        this.brandList = res.data.data
      })
    },
    toSearchList(brand: string) {
      this.$router.push('/result?category=' + this.categoryList[this.active] + '&brand=' + brand)
    }
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

.box {
  display: flex;
  height: 100%;
  .brandList {
    flex: 1;
    height: 100%;
    overflow: auto;
    background-color: #fff;
  }
}
.brandname {
  width: 60px;
  overflow: hidden;
  text-align: center;
}
</style>