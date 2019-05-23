/**
* Created by xiejun on 2019/02/28.
* 列表月份子节点
*/
<template>
  <div class="list-month-node" @tap="onTap">
    <div class="cell">
      <span class="title">{{ title }}</span>
      <span class="cash">{{ cash }}</span>
      <span class="arrow"></span>
    </div>
    <div class="cell">
      <span class="date">{{ date }}</span>
      <span class="status" :class="statusClsName">{{ status }}</span>
    </div>
  </div>
</template>

<script>
import navigate from 'utils/navigate'
import util from 'utils/index'
// import webview from 'utils/webview'

import { mapMutations } from 'vuex'

export default {
  name: '',
  data() {
    return {}
  },
  props: {
    monthNodeData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    statusClsName() {
      return 's' + this.monthNodeData.status
    },
    title() {
      return this.monthNodeData.remark
    },
    cash() {
      return this.monthNodeData.amount + '元'
    },
    date() {
      return '还款日期 ' + util.formatDate2(this.monthNodeData.gmtModified, '/')
    },
    status() {
      // 0 新建 ，1处理中，2成功。3失败
      let list = ['新建', '处理中', '成功', '失败']
      let s = list[this.monthNodeData.status]
      if (!s) s = list[1]
      return s
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations('repay', ['setRecordAmountId']),
    onTap() {
      this.$emit('tap')

      this.setRecordAmountId(this.monthNodeData.id)
      navigate.push({ url: '/prepay/pages/record/detail' })

      // webview.openAddBankCard()
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.list-month-node {
  position: relative;
  .border-1px-bottom();
  background: white;

  padding-top: 12px;
  padding-bottom: 9px;

  color: @color-txt;
  .cell {
    margin-bottom: 6px;
    .padding-h(17px);
    .flex-hor-center();
    .title {
      width: 200px;
      .show-one-line();
      font-size: 15px;
    }
    .cash {
      .flex-n();
      margin-right: 3px;
      text-align: right;
      font-size: 16px;
    }
    .arrow {
      .icon-arrow();
    }
    .date {
      .flex-n();
      font-size: 12px;
      color: @color-txt-2;
    }
    .status {
      padding-right: 23px;
      font-size: 14px;
      &.s3 {
        color: @color-warn;
      }
      &.s2 {
        color: @color-txt-1;
      }
    }
  }
}
</style>