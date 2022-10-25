<!-- src/views/home/components/HeaderComponent.vue -->
<template>
  <header class="header">
    <ul>
      <li>西安</li>
      <li>
        <div class="searchBox">
          <van-image :src="logo" height="24"></van-image>
          <span class="divider">|</span>
          <van-icon name="search" size="24" />
          <span class="searchText">立柜式空调</span>
        </div>
      </li>
      <li>登录</li>
    </ul>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import logo from '@/assets/logo.png'
export default defineComponent({
  data() {
    return {
      logo
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  ul {
    width: 100%;
    height: 100%;
    display: flex;
    li {
      height: 100%;

      display: flex;
      justify-content: center;
      align-items: center;

      color: #fff;

      &:nth-child(1),
      &:nth-child(3) {
        width: 50px;
      }
      &:nth-child(2) {
        flex: 1;
        .searchBox {
          width: 100%;
          height: 70%;
          background-color: #fff;
          border-radius: 16px;
          color: #666;
          display: flex;
          .van-image {
            width: 40px;
            margin-top: 4px;
            margin-left: 10px;
          }
          .divider {
            width: 12px;
            font-size: 24px;
            margin-left: 10px;
            color: #999;
          }
          .van-icon {
            width: 30px;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .searchText {
            flex: 1;
            line-height: 0.31rem;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
}
</style>