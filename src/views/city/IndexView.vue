<!-- src/views/city/IndexView.vue -->
<template>
  <header class="header">
    <van-nav-bar   
      title="城市选择"
      left-arrow
      @click-left="$router.back()"
      >
    </van-nav-bar>
  </header>
  <div class="content">
    <!-- {{ $route.meta.a }} -->
    <van-index-bar>
      <template v-for="item of cityList" :key="item.letter">
        <van-index-anchor :index="item.letter.toUpperCase()" />
        <template v-for="itm of item.data" :key="itm.cityId">
          <van-cell :title="itm.name" @click="changeCity(itm.name)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { getCityListData } from '@/api/city'
  export default defineComponent({
    computed: {
      cityList () {
        return this.$store.state.city.cityList
      }
    },
    mounted () {
      getCityListData().then(res => {
        const result = JSON.parse(res.data.data)
        console.log(result)
        this.$store.commit('city/changeCityList', result)
      })
    },
    methods: {
      changeCity (name: string) {
        this.$store.commit('city/changeCity', name)
        localStorage.setItem('city', name)
        this.$router.back()
      }
    }
  })
</script>