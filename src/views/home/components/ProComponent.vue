<!-- src/views/home/components/ProComponent.vue -->
<template>
  <div class="proList">
    <ul class="left">
      <li v-for="(item, index) of list" :key="item.proid" @click="toDetail(item.proid)">
        <template v-if="index % 2 === 0">
          <div class="itemImage">
            <van-image :src="item.img1"></van-image>
          </div>
          <div class="itemInfo">
            <div class="itemTitle van-multi-ellipsis--l2">{{ item.proname }}</div>
            <div class="itemPrice">
              ￥{{ (item.originprice.toFixed(2) + '').split('.')[0] }}.<span>{{ (item.originprice.toFixed(2) + '').split('.')[1] }}</span>
            </div>
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
            <div class="itemPrice">
              ￥ {{ (item.originprice.toFixed(2) + '').split('.')[0] }}.<span>{{ (item.originprice.toFixed(2) + '').split('.')[1] }}</span>
            </div>
          </div>
        </template>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" scoped>
import { defineComponent } from 'vue'
import type { PropType } from 'vue'

import type { IPro } from '../home'

export default defineComponent({
  props: {
    list: Array as PropType<IPro[]>
  },
  data() {
    return {
      containerId: null
    }
  },
  methods: {
    toDetail(proid: string) {
      this.$router.push('/detail/' + proid)
    }
  }
})
</script>

<style lang="scss">
.proList {
  display: flex;
  width: 96%;
  margin: 15px 2%;
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
      margin-top: 10px;
      background-color: #fff;
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