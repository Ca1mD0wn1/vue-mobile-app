<!-- src/views/vuex/IndexView.vue -->
<template>
  <div>
    <img v-for="item of bannerList" :key="item.bannerid" :src="item.img" alt="" style="width: 80px" />

    <p v-for="item of proList" :key="item.proid">{{ item.proname }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { getProListData } from '@/api/home'
export default defineComponent({
  mounted() {
    // this.$store.dispatch('pro/getBannerListAction')
    this.getBannerListAction()

    getProListData().then(res => {
      // this.$store.commit('pro/changeProList', res.data.data)
      this.changeProList(res.data.data)
    })
  },
  computed: {
    // mapState mapGetters 和计算属性一起使用
    ...mapState({
      bannerList: (state: any) => state.pro.bannerList,
      proList: (state: any) => state.pro.proList
    })
  },
  methods: {
    // mapMutations 和  mapActions 与 自定义函数一起使用
    ...mapActions({
      getBannerListAction: 'pro/getBannerListAction' // this.$store.dispatch('pro/getBannerListAction')
    }),
    ...mapMutations({
      changeProList: 'pro/changeProList' // this.$store.commit('pro/changeProList')
    })
  }
})
</script>