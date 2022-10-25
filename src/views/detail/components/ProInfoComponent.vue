<template>
  <div class="proInfo">
    <div class="priceBox">
      <span>￥{{ originprice }}</span>
      <span>销量{{ sales }}</span>
    </div>

    <div class="proName">
      <van-tag type="danger">{{ brand }}</van-tag>
      <van-tag type="primary">{{ category }}</van-tag>
      <span>{{ proname }}</span>
    </div>
  </div>

  <div class="address">
    <van-field v-model="fieldValue" is-link readonly label="送至" placeholder="请选择所在地区" @click="show = true" />
    <van-popup v-model:show="show" round position="bottom">
      <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="show = false" @finish="onFinish" />
    </van-popup>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    proname: String,
    originprice: Number,
    discount: Number,
    sales: Number,
    brand: String,
    category: String
  },
  data() {
    return {
      fieldValue: '',
      show: false,
      cascaderValue: '',
      options: [
        {
          text: '浙江省',
          value: '330000',
          children: [{ text: '杭州市', value: '330100' }]
        },
        {
          text: '江苏省',
          value: '320000',
          children: [{ text: '南京市', value: '320100' }]
        }
      ]
    }
  },
  methods: {
    onFinish({ selectedOptions }: any) {
      this.show = false
      this.fieldValue = selectedOptions.map((option: any) => option.text).join('/')
    }
  }
})
</script>
<style lang="scss" scoped>
.proInfo {
  background-color: #fff;
  padding: 15px;
  border-bottom-right-radius: 16px;
  border-bottom-left-radius: 16px;
  .priceBox {
    span {
      line-height: 32px;
      &:nth-child(1) {
        font-size: 24px;
        color: #f66;
      }
      &:nth-child(2) {
        float: right;
      }
    }
  }
  .proName {
    font-weight: bold;
    font-size: 0.14rem;
    .van-tag {
      margin-right: 5px;
    }
  }
  .address {
    margin-top: 10px;
  }
}
</style>