/**
* Created by huangyilu on 2018/10/25.
* swiper
*/
<template>
  <div class="ala-swiper-view">
    <swiper class="swiper" :style="{ width: windowWidth, height: windowWidth }" :indicator-dots="picImgs.length > 1 ? true : false" autoplay="true" circular="true" interval="5000" duration="400">
      <block v-for="(item, index) in picImgs" :index="index" :key="key">
          <swiper-item>
              <img :src="item" class="slide-image" mode="aspectFill"/>
          </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
import systemInfo from 'utils/systemInfo'
export default {
  name: 'ala-switch',
  data() {
    return {}
  },
  props: {
    picImgs: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    windowWidth() {
      return systemInfo.windowWidth + 'px'
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style leng="less">
</style>
