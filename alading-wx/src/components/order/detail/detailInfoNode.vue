/**
* Created by xiejun on 2018/11/7.
* 主要显示订单详情时间相关数据
*/
<template>
  <div v-if="isVisible" class="ala-detail-info-node">{{info}}</div>
</template>

<script>
import util from 'utils/index'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    time: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    // 是否显示
    isVisible() {
      return this.time
    },
    info() {
      if (!this.isVisible) return ''
      let t = this.time
      if (typeof this.time === 'number') {
        t = util.formatDate2(this.time)
      }
      let result = this.title + t
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
.ala-detail-info-node {
  margin-bottom: 5px;
  padding-left: @padding-h;
  font-size: @font-size-tip;
  color: #bebebe;
}
</style>