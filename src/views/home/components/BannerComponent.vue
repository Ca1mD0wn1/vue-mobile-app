<template>
  <div class="banner">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item of list" :key="item.bannerid">
        <van-image fit="fill" :src="item.img" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>


<script lang="ts" >
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { IBannerItem } from '../home'

export default defineComponent({
  props: {
    list: Array as PropType<IBannerItem[]>
  },
  update() {
    console.log(this.list)
  }
})
</script>

<style lang="scss" >
.banner {
  width: 96%;
  margin: 10px 2%;
  background-color: #ccc;
  height: 1.5rem;
  border-radius: 15px;
  overflow: hidden;
}
</style>