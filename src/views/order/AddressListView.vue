<template>
  <header class="header"><van-nav-bar title="地址列表" left-arrow @click-left="$router.back()" /></header>
  <div class="content">
    <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认" @add="onAdd" @click-item="changeAddress" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { updateOrderAddressData } from '@/api/order'
import { getAddressList } from '@/api/address'
export default defineComponent({
  data() {
    return {
      chosenAddressId: '',
      list: [],
      time: ''
    }
  },
  mounted() {
    this.time = this.$route.query.time as string
    getAddressList({ userid: localStorage.getItem('userid')! }).then(res => {
      res.data.data.forEach((item: any) => {
        item.id = item.addressid
        item.address = this.getAddress(item)
        item.isDefault ? (this.chosenAddressId = item.addressid) : (this.chosenAddressId = '')
      })
      console.log(res.data.data)
      this.list = res.data.data
    })
  },
  methods: {
    getAddress(item: any) {
      const province = item.province
      const city = item.city
      const county = item.county
      const addressDetail = item.addressDetail

      let str = ''
      if (province === city) {
        str += province + county + addressDetail
      } else {
        str += province + city + county + addressDetail
      }
      return str
    },
    onAdd() {
      this.$router.push('/orderAddAddress?time=' + this.time)
    },
    changeAddress(item: any) {
      console.log(item)
      item.time = this.time
      updateOrderAddressData(item).then(() => {
        this.$router.back()
      })
    }
  }
})
</script>

<style lang="scss"></style>