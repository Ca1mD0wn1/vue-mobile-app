
<template>
  <van-notice-bar left-icon="volume-o" :scrollable="false">
    <van-swipe vertical class="notice-swipe" :autoplay="3000" :touchable="false" :show-indicators="false">
      <van-swipe-item>双十一程序员大甩卖!挣得多,花的少,走的还早!</van-swipe-item>
      <van-swipe-item>i9-1200k + 3090Ti猛禽整机只需要10999!</van-swipe-item>
      <van-swipe-item>关爱程序员,从头发做起!</van-swipe-item>
      <van-swipe-item>你愿意做一辈子的小丑,还是一分钟的男人</van-swipe-item>
    </van-swipe>
  </van-notice-bar>
</template>


<style lang="scss" scoped>
.notice-swipe {
  height: 40px;
  line-height: 40px;
}
</style>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>
