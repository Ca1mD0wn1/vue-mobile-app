<template>
  <div class="recommendBox">
    <h3>猜你喜欢</h3>
    <div class="proList">
      <ul class="left">
        <li v-for="(item, index) of list" :key="item.proid" @click="toDetail(item.proid)">
          <template v-if="index % 2 === 0">
            <div class="itemImage">
              <van-image :src="item.img1"></van-image>
            </div>
            <div class="itemInfo">
              <div class="itemTitle van-multi-ellipsis--l2">{{ item.proname }}</div>
              <div class="itemPrice">￥{{ item.originprice / 1 }}</div>
            </div>
          </template>
        </li>
      </ul>
      <ul class="right">
        <li v-for="(item, index) of list" :key="item.proid" @click="toDetail(item.proid)">
          <template v-if="index % 2 === 1">
            <div class="itemImage">
              <van-image :src="item.img1"></van-image>
            </div>
            <div class="itemInfo">
              <div class="itemTitle van-multi-ellipsis--l2">{{ item.proname }}</div>
              <div class="itemPrice">￥{{ item.originprice }}</div>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { IPro } from '@/views/home/home'
export default defineComponent({
  emits: {},
  props: {
    list: Array as PropType<IPro[]>
  },
  methods: {
    toDetail(proid: String) {
      this.$router.push('/detail/' + proid)
    }
  }
})
</script>

<style lang="scss" scoped>
.recommendBox {
  background-color: #fff;
  margin-top: 10px;
  h3 {
    padding: 10px 15px;
  }
}
.proList {
  display: flex;
  width: 96%;
  margin: 10px 2% 15px;
  .left {
    width: 49%;
    min-height: 300px;
    margin-right: 1%;
    // background-color: #f66;
  }
  .right {
    width: 49%;
    min-height: 300px;
    margin-left: 1%;
    // background-color: #f66;
  }

  ul {
    li {
      margin-top: 5px;
      background-color: #fff;
      border-radius: 10px;
      overflow: hidden;
      .itemImage {
        width: 100%;
        .van-image {
          min-height: 1.3rem;
        }
      }
      .itemInfo {
        padding: 10px;
        .itemTitle {
          font-size: 0.14rem;
        }
        .itemPrice {
          color: #f66;
          font-size: 0.2rem;
          span {
            font-size: 0.14rem;
          }
        }
      }
    }
  }
}
</style>