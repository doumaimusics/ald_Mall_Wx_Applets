/**
* Created by xiejun on 2019/02/28.
* 还款记录详情
*/
<template>
  <div class="repay-record-detail">
    <div v-if="isLoading" class="loading"></div>
    <detail-refund v-else-if="isRefund"/>
    <detail-info v-else/>
  </div>
</template>

<script>
import detailRefund from './core/detailRefund'
import detailInfo from './core/detailInfo'

import { mapState, mapActions } from 'vuex'
import storage from 'utils/storage'
import basis from 'utils/basis'
import Tips from 'utils/tip'
import Monitor from 'utils/monitor'
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
    isRefund() {
      return false
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

    this.getRecordDetailData()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  watch: {},
  methods: {
    ...mapActions('repay', ['getRecordDetailData'])
  },
  components: { detailRefund, detailInfo }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.repay-record-detail {
  .fill-page();
}
</style>