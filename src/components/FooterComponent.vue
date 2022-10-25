<template>
  <footer>
    <ul>
      <router-link to="/home" custom v-slot="{ isActive, href, navigate }">
        <li :active="isActive" :class="isActive ? 'active' : ''" :href="href" @click="navigate">
          <span class="iconfont icon-shouye"></span>
          <p>首页</p>
        </li>
      </router-link>
      <router-link to="/kind" custom v-slot="{ isActive, href, navigate }">
        <li :active="isActive" :class="isActive ? 'active' : ''" :href="href" @click="navigate">
          <span class="iconfont icon-fenlei"></span>
          <p>分类</p>
        </li>
      </router-link>
      <router-link to="/car" custom v-slot="{ isActive, href, navigate }">
        <li :active="isActive" :class="isActive ? 'active' : ''" :href="href" @click="navigate">
          <span class="iconfont icon-gouwuchekong"></span>
          <p>购物车</p>
        </li>
      </router-link>

      <router-link to="/user" custom v-slot="{ isActive, href, navigate }">
        <li :active="isActive" :class="isActive ? 'active' : ''" :href="href" @click="navigate">
          <span class="iconfont icon-wode"></span>
          <p>我的</p>
        </li>
      </router-link>
    </ul>
  </footer>
</template>

<style lang=scss scoped>
li.active {
  color: #f66;
}
</style>