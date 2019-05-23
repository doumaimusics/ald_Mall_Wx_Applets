/**
* Created by xiejun on 2019/01/25.
* banner
*/
<template>
  <swiper
    v-if="visible"
    @tap="onTap"
    @change="onChange"
    :indicator-dots="indicatorDts"
    class="banner-head"
    autoplay="true"
    circular="true"
    interval="5000"
    duration="400"
  >
    <block v-for="(item, index) in bannerList" :key="index">
      <swiper-item>
        <img :src="item.imageUrl" mode="aspectFill">
      </swiper-item>
    </block>
  </swiper>
</template>

<script>
import wxBasis from 'utils/wxBasis'
import visibleStyleUtil from 'utils/visibleStyleUtil'
export default {
  name: '',
  data() {
    return {
      current: 0,
      bannerHeights: []
    }
  },
  props: {
    bannerList: {
      type: Array,
      default: function() {
        return []
      }
    },
    // 显示样式
    visibleStyle: {
      type: String,
      default: visibleStyleUtil.style.auto
    },
    // 显示点
    showDots: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    visible() {
      return visibleStyleUtil.visible(this.visibleStyle, () => this.bannerList.length)
    },
    // 是否显示点
    indicatorDts() {
      if (this.showDots) {
        return this.bannerList.length > 1
      }
      return false
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      this.$emit('tap', this.current)
    },
    onChange(event) {
      let detail = wxBasis.getDetail(event)
      this.current = detail.current
      this.$emit('change', detail)
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.banner-head {
  height: 120px;
}
</style>