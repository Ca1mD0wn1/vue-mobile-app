<template>
  <div class="banner">
    <van-swipe class="my-swipe" :show-indicators="false" :loop="false" :initial-swipe="current" @change="changeSwipe">
      <van-swipe-item v-for="item of list" :key="item" @click="previewImage">
        <van-image fit="fill" :src="item" />
      </van-swipe-item>
    </van-swipe>
    <div class="tip">
      <span>{{ current + 1 }}</span> / <span>{{ total }}</span>
    </div>

    <div class="video" @click="play"><van-icon name="play-circle-o" size="24" />播放视频</div>
  </div>
  <van-overlay :show="show" @click="show = false">
    <video class="vdo" :src="video" ref="vdo" controls></video>
  </van-overlay>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import { ImagePreview } from 'vant'
interface IData {
  current: number
  show: boolean
}
export default defineComponent({
  props: {
    list: Array as PropType<string[]>,
    video: String
  },
  data(): IData {
    return {
      current: 0,
      show: false
    }
  },
  computed: {
    total() {
      return this.list!.length
    }
  },
  methods: {
    changeSwipe(index: number) {
      this.current = index
    },
    play() {
      this.show = true
      setTimeout(() => {
        ;(this.$refs.vdo as HTMLVideoElement).play()
      }, 0)
    },
    previewImage() {
      ImagePreview({
        images: this.list!,
        startPosition: this.current
      })
    }
  },
  watch: {
    show(val) {
      if (!val) {
        ;(this.$refs.vdo as HTMLVideoElement).pause() // 暂停
        ;(this.$refs.vdo as HTMLVideoElement).currentTime = 0 // 设置播放进度
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100%VW;
  background-color: #ccc;
  height: 3.5rem;
  overflow: hidden;
  .van-image {
    width: 100%;
  }
  .tip {
    position: absolute;
    bottom: 0.3rem;
    right: 0;
    z-index: 1;
    width: 60px;
    height: 24px;
    background-color: rgba(0, 0, 0, 0.2);
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 12px;
    border-top-left-radius: 12px;

    span {
      &:nth-child(1) {
        font-size: 0.16rem;
      }
    }
  }
}
.video {
  position: absolute;
  bottom: 0.3rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
  width: 80px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.7);
  color: #333;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f66;
  border-radius: 15px;
}
.vdo {
  width: 100%;
}
</style>