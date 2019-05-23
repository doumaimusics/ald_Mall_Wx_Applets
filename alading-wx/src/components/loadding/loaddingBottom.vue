/**
* Created by xiejun on 2018/10/23.
* 底部加载
*/
<template>
  <div class="ala-loadding-bottom" :class="{'ala-loadding-bottom-hasHeight':hasHeight}">
    <div v-if="hasIcon" class="ala-loadding-bottom__gif-icon"></div>
    <span class="ala-loading-bottom__title">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    data: {
      type: Object,
      default: function() {
        return {
          title0: '全力加载中',
          title1: '没有更多',
          title2: '数据加载失败'
        }
      }
    },
    // 状态，0加载中，1到底了，2数据加载失败
    status: {
      type: Number,
      default: 0
    }
  },
  computed: {
    hasHeight() {
      return this.status === 1
    },
    hasIcon() {
      return this.status === 0
    },
    title() {
      let result = this.data.title0
      if (!this.hasIcon) {
        let keys = 'title' + this.status
        result = this.data[keys]
      }
      return result
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-loadding-bottom {
  height: 0;
  text-align: center;

  .ala-loadding-bottom__gif-icon {
    display: inline-block;
    .gif-icon('loadding', 16px, 16px);
    margin-right: 5px;
    margin-top: 2px;
    vertical-align: top;
  }
  .ala-loading-bottom__title {
    display: inline-block;
    font-size: @font-size-list;
    color: @color-txt-2;
    vertical-align: top;
  }
}
.ala-loadding-bottom-hasHeight {
  height: auto;
  .flex-hor-center();
  justify-content: center;
}
</style>