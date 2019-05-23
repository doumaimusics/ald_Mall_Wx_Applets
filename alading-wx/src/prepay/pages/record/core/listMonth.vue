/**
* Created by xiejun on 2019/02/28.
* 列表月份节点
*/
<template>
  <div class="list-month">
    <div class="title">{{ title }}</div>
    <list-month-node 
    v-for="(monthNodeData, index) in listMonthNodeData" 
    :monthNodeData="monthNodeData"
    :key="index"/>
  </div>
</template>

<script>
import listMonthNode from './listMonthNode'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    monthData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    title() {
      let info = `${this.monthData.year}年${this.monthData.month}月份还款记录（共${this.listMonthNodeData.length}条）`
      return info
    },
    listMonthNodeData() {
      let list = this.monthData.amountList
      return list
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { listMonthNode }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.list-month {
  .title {
    padding-left: 16px;

    height: 38px;
    line-height: 38px;

    font-size: 14px;
    color: @color-txt-1;
  }
}
</style>