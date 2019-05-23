/**
* Created by xiejun on 2019/02/28.
* 还款记录列表
*/
<template>
  <div class="repay-record-list">
    <div v-if="isLoading" class="loading"></div>
    <list-empty v-else-if="isEmpty"></list-empty>
    <list-page v-else :listMonthData="recordListData"></list-page>
  </div>
</template>

<script>
import listEmpty from './core/listEmpty'
import listPage from './core/listPage'

import { mapState, mapActions } from 'vuex'
import storage from 'utils/storage'
import basis from 'utils/basis'
import Tips from 'utils/tip'
import Monitor from 'utils/monitor'
import maidian from 'utils/maidian'
import wx from 'wx'
export default {
  name: '',
  data() {
    return {
      // 是否处于加载中
      isLoading: true
    }
  },
  props: {},
  computed: {
    ...mapState(['isLogin']),
    ...mapState('repay', ['recordListData']),
    isEmpty() {
      return !this.isLoading && !this.recordListData.length
    }
  },
  created() {},
  mounted() {},
  onLoad() {
    Tips.loadDelay(() => (this.isLoading = false))
  },
  onShow() {
    if (storage.props.launchStatus === 1) return
    if (!this.isLogin) {
      basis.toLogin()
      return
    }
    Monitor.pageShow()

    maidian.view('miniprogram_bill_history')
    this.toGetRecordListData()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onPullDownRefresh() {
    this.toPullDown()
  },
  onReachBottom() {
    this.toReachBottom()
  },
  watch: {},
  methods: {
    ...mapActions('repay', ['getRecordListData']),
    toPullDown() {
      this.toGetRecordListData('top')
    },
    toReachBottom() {
      this.toGetRecordListData('bottom')
    },
    async toGetRecordListData(operation = '') {
      let year = ''
      let month = ''
      if (this.recordListData.length) {
        let record = this.recordListData[0]
        year = record.year
        month = record.month
      }
      let params = { month, year, status: 'repayment', operation }
      await this.getRecordListData(params)
      wx.stopPullDownRefresh()
      wx.pageScrollTo({ scrollTop: 0, duration: 0 })
    }
  },
  components: { listEmpty, listPage }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.repay-record-list {
  .fill-page(@color-bg);
  padding-top: 10px;
}
</style>