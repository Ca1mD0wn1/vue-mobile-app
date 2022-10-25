<!-- src/views/user/AddressView.vue -->
<template>
  <header class="header"><van-nav-bar
      title="地址列表"
      left-arrow
      @click-left="$router.back()"
    /></header>
  <div class="content">
    <van-address-list
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
    />
  </div>
</template>

<script lang="ts">
import { getAddressList } from '@/api/address';
import { defineComponent } from 'vue';

  export default defineComponent({
    data () {
      return {
        list: [],
      }
    },
    mounted () {
      getAddressList({ userid: localStorage.getItem('userid')! }).then(res => {
        res.data.data.forEach((item: any) => {
          item.id = item.addressid
          item.address = this.getAddress(item)
        })
        console.log(res.data.data)
        this.list = res.data.data
      })
    },
    methods: {
      getAddress (item: any) {
        const province = item.province
        const city  = item.city
        const county = item.county
        const addressDetail = item.addressDetail

        let str = ''
        if (province === city) {
          str += province + county + addressDetail
        } else {
          str += province +  city + county + addressDetail
        }
        return str
      },
      onAdd () {
        this.$router.push('/userAddAddress')
      }
    }
  })
</script>

<style lang="scss"></style>