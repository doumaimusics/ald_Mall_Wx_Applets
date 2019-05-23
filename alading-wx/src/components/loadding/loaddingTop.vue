/**
* Created by xiejun on 2018/10/23.
* 头部加载刷新
*/
<template>
  <div class="ala-loadding-top">
    <div v-if="hasIcon" class="ala-loadding-top__gif-icon"></div>
    <span class="ala-loading-top__title">{{ title }}</span>
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
          title0: '下拉刷新',
          title1: '松开刷新'
        }
      }
    },
    // 状态，0下拉，1松开
    status: {
      type: Number,
      default: 0
    }
  },
  computed: {
    hasHeight() {
      return this.status === 1
    },
    title() {
      return this.data['title' + this.status]
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
.ala-loadding-top {
  text-align: center;

  .ala-loadding-top__gif-icon {
    .gif-icon('loadding', 16px, 16px);
  }
  .ala-loading-top__title {
    display: inline-block;
    font-size: @font-size-list;
    color: @color-txt-2;
    vertical-align: top;
  }
}
</style>