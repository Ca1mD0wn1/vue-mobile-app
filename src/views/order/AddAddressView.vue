<template>
  <header class="header"><van-nav-bar title="添加地址" left-arrow @click-left="$router.back()" /></header>
  <div class="content">
    <van-address-edit :area-list="areaList" show-set-default :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onSave" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { areaList } from '@vant/area-data'
import { addAddRessData } from '@/api/address'
import { updateOrderAddressData } from '@/api/order'
export default defineComponent({
  data() {
    return {
      areaList,
      time: ''
    }
  },
  mounted() {
    this.time = this.$route.query.time as string
  },
  methods: {
    onSave(content: any) {
      console.log(content)
      content.userid = localStorage.getItem('userid')!
      addAddRessData(content).then(res => {
        console.log(res.data) // 添加地址成功
        // 修改订单地址
        content.time = this.time
        updateOrderAddressData(content).then(res => {
          // 返回前两页  确认订单- 地址列表 - 新增地址
          this.$router.go(-2)
        })
      })
    }
  }
})
</script>

<style lang="scss"></style>