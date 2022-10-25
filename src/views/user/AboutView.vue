<!-- src/views/user/AboutView.vue -->
<template>
  <header class="header">
    <van-nav-bar   
      left-arrow
      @click-left="$router.back()"
    >
      <template #title>
        <span class="title">关于我们</span>
      </template>
      
    </van-nav-bar>
  </header>
  <div class="content">
    
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    data () {
      return {
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
</style>