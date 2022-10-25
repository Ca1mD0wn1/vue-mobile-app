<!-- src/views/register/IndexView.vue -->
<template>
  <header class="header">
    <van-nav-bar title="注册" left-arrow @click-left="$router.back()" />
  </header>
  <div class="content">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({})
</script>

<style lang="scss" scoped>
.content {
  background-color: #fff;
}
</style>