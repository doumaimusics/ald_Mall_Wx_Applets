/**
* Created by xiejun on 2019/02/28.
* 还款 详情
*/
<template>
  <div v-if="recordDetailData" class="detail-info">
    <detail-cell type="1" :info0="t8.title" :info1="t8.amount"></detail-cell>
    <div class="block gray">
      <block v-for="(data, index) in parseData.list" :key="index">
        <detail-cell
        :info0="data.title"
        :info1="data.amount"/>
        <div v-if="index === 2" class="sep-line"></div>
      </block>
    </div>
    <detail-progress :logList="parseData.logList"/>
    <div class="block">
      <detail-cell type="2" info0="还款时间" :info1="recordDetailData.date"></detail-cell>
      <detail-cell type="2" info0="还款编号" :info1="recordDetailData.number"></detail-cell>
    </div>
  </div>
</template>

<script>
import detailCell from './detailCell'
import detailProgress from './detailProgress'

import { mapState } from 'vuex'
import detailInfoUtil from './detailInfoUtil'
export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapState('repay', ['recordDetailData']),
    parseData() {
      if (!this.recordDetailData) return {}
      let data = this.recordDetailData
      let pd = {}
      let detailList = []
      data.detailList.forEach(item => {
        item = detailInfoUtil.parse(item)
        if (item.type === 8) {
          pd.t8 = item
        } else {
          detailList[item.type] = item
        }
      })

      pd.list = detailList.filter(value => value)
      pd.logList = this.recordDetailData.logList
      return pd
    },
    t8() {
      let pd = this.parseData
      if (pd.t8) return pd.t8
      return {}
    }
  },
  created() {},
  mounted() {},
  onLoad() {},
  onShow() {},
  watch: {},
  methods: {},
  components: { detailCell, detailProgress }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.detail-info {
  .block {
    padding-bottom: 20px;
    &.gray {
      background: @color-bg;
    }
    .sep-line {
      margin: 14px 0 4px;

      position: relative;
      .border-1px-top();

      &::before {
        margin: 0 16px;
      }
    }
  }
}
</style>