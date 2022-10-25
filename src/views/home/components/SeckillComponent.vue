<template>
  <div class="seckillBox">
    <div class="title_wrap">
      <ul>
        <li>
          <span>嗨购秒杀</span>
          <span>{{ hours }}点场</span>
          <van-count-down :time="time" class="myTimer">
            <template #default="timeData">
              <span class="block">{{ timeData.hours < 10 ? '0' + timeData.hours : timeData.hours }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.minutes < 10 ? '0' + timeData.minutes : timeData.minutes }}</span>
              <span class="colon">:</span>
              <span class="block">{{ timeData.seconds < 10 ? '0' + timeData.seconds : timeData.seconds }}</span>
            </template>
          </van-count-down>
        </li>
        <li>
          爆款轮番秒
          <van-icon name="clock" />
        </li>
      </ul>
    </div>

    <ul class="seckillList">
      <router-link v-for="item of list" :key="item.proid" :to="`/detail/${item.proid}`" custom v-slot="{ navigate }">
        <li @click="navigate">
          <van-image :src="item.img1"></van-image>
          <p>￥{{ item.originprice }}</p>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import type { IPro } from '../home'

export default defineComponent({
  props: {
    list: Array as PropType<IPro[]>
  },
  data() {
    const date = new Date()
    let hours = date.getHours()
    if (hours % 2 == 0) {
      hours += 2
    } else {
      hours += 1
    }
    let time = date.getTime()
    let nowHours = date.getHours()
    let nowMinutes = date.getMinutes()
    let nowSeconds = date.getSeconds()
    time = hours * 60 * 60 - ((nowHours * 60 + nowMinutes) * 60 + nowSeconds)
    return {
      // time: 2 * 60 * 60 * 1000
      time: time * 1000,
      hours
    }
  },
  mounted() {}
})
</script>
<style lang='scss' scoped>
.seckillBox {
  width: 96%;
  height: 1.3rem;
  background-color: #fff;
  border-radius: 15px;
  margin: 10px 2%;
  .title_wrap {
    width: 100%;
    height: 0.36rem;
    background: url('../../../assets/title_wrap.png') no-repeat center center;
    background-size: cover;
    overflow: hidden;
    ul {
      display: flex;
      padding: 0 10px;
      box-sizing: border-box;
      li {
        &:nth-child(1) {
          flex: 3;
          display: flex;
          & > span {
            line-height: 0.36rem;
            &:nth-child(2) {
              color: #f66;
            }
            margin-right: 10px;
          }
          .myTimer {
            padding-top: 0.08rem;
            span {
              line-height: 0.2rem;
            }
          }
        }
        &:nth-child(2) {
          flex: 2;
          display: flex;
          justify-content: flex-end;
          font-size: 0.12rem;
          color: #f66;
          line-height: 0.36rem;

          .van-icon {
            font-size: 0.12rem;
            transform-origin: left top;
            transform: rotate(225deg);
            line-height: 0.36rem;
            margin-top: 0.34rem;
            box-sizing: border-box;
          }
        }
      }
    }
  }
  .seckillList {
    padding: 0 10px;
    box-sizing: border-box;
    margin-top: 0.1rem;
    li {
      float: left;
      width: calc(100% / 6);
      height: 0.94rem;
      // background-color: #f66;
      .van-image {
        width: 96%;
        margin: 0 2%;
        height: 0.54rem;
        overflow: hidden;
      }
      p {
        text-align: center;
        color: #f66;
        line-height: 0.3rem;
        font-weight: bold;
      }
    }
  }
}

.colon {
  display: inline-block;
  margin: 0 2px;
  font-weight: bold;
  font-size: 0.16rem;
  color: #ee0a24;
}
.block {
  display: inline-block;
  color: #fff;
  width: 16px;
  font-size: 12px;
  font-weight: bold;
  text-align: center;
  background-color: #ee0a24;
  border-radius: 4px;
}
</style>
