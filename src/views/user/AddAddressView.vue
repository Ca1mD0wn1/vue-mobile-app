<!-- src/views/user/AddAddressView.vue -->
<template>
  <header class="header"><van-nav-bar
      title="添加地址"
      left-arrow
      @click-left="$router.back()"
    /></header>
  <div class="content">
    <van-address-edit
      :area-list="areaList"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { areaList } from '@vant/area-data';
  import { addAddRessData } from '@/api/address';
  export default defineComponent({
    data () {
      return {
        areaList
      }
    },
    methods: {
      onSave (content: any) {
        console.log(content)
        content.userid = localStorage.getItem('userid')!
        addAddRessData(content).then(res => {
          console.log(res.data) // 添加地址成功
          this.$router.back()
        })
      }
    }
  })
</script>

<style lang="scss"></style>