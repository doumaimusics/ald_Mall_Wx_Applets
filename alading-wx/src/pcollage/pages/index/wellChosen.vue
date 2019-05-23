/**
* Created by xiejun on 2018/11/22.
* 拼团主页——精选
*/
<template>
  <swiper
  v-if="goodsList.length"
  class="index-well-chosen"
  @change="onChange"
  :current="current"
  :previous-margin="swiperMargin.previous"
  :next-margin="swiperMargin.next"
  duration="400">
    <swiper-item v-for="(item, index) in goodsList" :key="index">
      <well-chosen-node @tap="onTap" :onlyOne="onlyOne" :goodsData="item"/>
    </swiper-item>
  </swiper>
</template>

<script>
import wellChosenNode from './wellChosenNode'
import Monitor from 'utils/monitor'
export default {
  name: '',
  data() {
    return {
      current: 0
    }
  },
  props: {
    goodsList: {
      type: Array,
      default: null
    }
  },
  computed: {
    onlyOne() {
      if (this.goodsList && this.goodsList.length === 1) return true
      return false
    },
    swiperMargin() {
      let previous = '5px'
      let next = '30px'
      if (this.onlyOne) {
        // 长度为1的情况
        previous = 0
        next = 0
      }
      return { previous, next }
    }
  },
  created() {},
  mounted() {},
  onShow() {
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  watch: {
    goodsList() {
      setTimeout(() => {
        this.current = 0
      }, 50)
    }
  },
  methods: {
    onChange(data) {
      this.current = data.target.current
    },
    onTap(data) {
      this.$emit('tap', data)
    }
  },
  components: { wellChosenNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.index-well-chosen {
  height: 180px;
}
</style>
