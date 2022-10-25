
<template>
  <div class="nav">
    <van-grid :border="false" column-num="5" icon-size="40" :square="true">
      <van-grid-item v-for="item of list" :key="item.navid" :icon="item.imgurl" :text="item.title" />
    </van-grid>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import type { INavItem } from '../home'

export default defineComponent({
  props: {
    list: Array as PropType<INavItem[]>
  }
})
</script>
<style lang="scss" scoped>
</style>