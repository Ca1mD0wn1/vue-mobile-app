<template>
  <div class="container">
    <router-view name="default" />
    <router-view name="footer" class="footer"></router-view>
  </div>
  <div class="landscape-tip">给我竖着拿手机啊混蛋！</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({})
</script>

<style lang="scss" >
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    height: 0.44rem;
    background-color: #f66;
  }
  .content {
    flex: 1;
    overflow: auto;
  }
  .footer {
    height: 0.5rem;
    background-color: #efefef;
    user-select: none;
    ul {
      width: 100%;
      height: 100%;
      display: flex;
      li {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        &.active {
          color: red;
        }
        span {
          font-size: 0.2rem;
        }

        p {
          font-size: 0.12rem;
        }
      }
    }
  }
}
.landscape-tip {
  //遮罩层提示
  font-size: 50px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0);
  color: #fff;
  display: none;
  justify-content: center;
  align-items: center;
}

@media only screen and (orientation: landscape) {
  .landscape-tip {
    display: flex;
  }
}
</style>
