/**
* Created by xiejun on 2019/01/25.
* banner
*/
<template>
  <div v-if="visible" class="banner-goods">
    <swiper
      @tap="onTap"
      @change="onChange"
      :indicator-dots="indicatorDts"
      class="banner"
      autoplay="true"
      circular="true"
      interval="5000"
      duration="400"
    >
      <block v-for="(picUrl, index) in picUrlList" :key="index">
        <swiper-item>
          <img :src="picUrl" mode="aspectFill">
        </swiper-item>
      </block>
    </swiper>
  </div>
</template>

<script>
import wxBasis from 'utils/wxBasis'
import visibleStyleUtil from 'utils/visibleStyleUtil'
export default {
  name: '',
  data() {
    return {
      current: 0
    }
  },
  props: {
    picUrlList: {
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
      return visibleStyleUtil.visible(this.visibleStyle, () => this.picUrlList.length)
    },
    // 是否显示点
    indicatorDts() {
      if (this.showDots) {
        return this.picUrlList.length > 1
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
.banner-goods {
  position: relative;
  width: 100%;
  padding-top: 100%;
  background: white;
  .banner {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>