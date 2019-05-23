<template>
  <div class="repaySuccess">
    <div v-if="isLoading" class="loading"></div>
    <div v-else>
      <div class="progress">
        <div class="leftImg">
          <img v-if="limitDetailInfo.status==='N' || limitDetailInfo.status==='P'" :src="commonImgUrl+'icon_repayProcess08@2x.png'">
          <img v-if="limitDetailInfo.status==='Y'" :src="commonImgUrl+'icon_repayProcess09@2x.png'">
          <img v-if="limitDetailInfo.status==='F' || limitDetailInfo.status==='S'" :src="commonImgUrl+'icon_repayProcess10@2x.png'">
        </div>
        <div class="top">
          <p class="blueWord">提交成功，等待处理中</p>
          <p class="grayWord grayWord01">{{limitDetailInfo.gmtCreateNoYear}}</p>
          <p class="grayWord">大约需要2分钟</p>
        </div>
        <div class="bot">
          <p class="blueWord">
            <span class="pay_fail" v-if="limitDetailInfo.status==='F' || limitDetailInfo.status==='S'">还款失败</span>
            <span v-else>还款成功</span>
          </p>
          <p class="grayWord grayWord01">
            <span v-if="limitDetailInfo.status==='F' || limitDetailInfo.status==='S'">{{limitDetailInfo.gmtCreateNoYear}}</span>
            <span v-else>今天到账（最晚24:00）</span>
          </p>
          <p class="grayWord">
            <span v-if="limitDetailInfo.status==='F' || limitDetailInfo.status==='S'">系统故障，钱已按原路返回扣款账户</span>
            <span v-else>如遇系统延迟1-2日更新还款结果</span>
          </p>
        </div>
      </div>
      <div class="info">
        <p><span>还款金额</span><span>{{limitDetailInfo.amount}}元</span></p>
        <p><span>还款账户</span><span>{{limitDetailInfo.cardName}}({{limitDetailInfo.cardNo}})</span></p>
        <p><span>还款时间</span><span>{{limitDetailInfo.gmtCreateYear}}</span></p>
        <p><span>还款编号</span><span>{{limitDetailInfo.number}}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import storage from 'utils/storage'
import basis from 'utils/basis'
import Tips from 'utils/tip'
import Monitor from 'utils/monitor'
import maidian from 'utils/maidian'
import { mapState, mapActions } from 'vuex'
let commonImgUrl = 'https://img.51fanbei.com/h5/vdian/'

export default {
  components: {},
  data() {
    return {
      commonImgUrl: commonImgUrl
    }
  },
  computed: {
    ...mapState(['isLogin']),
    ...mapState('repay', ['limitDetailInfo'])
  },
  created() {},
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
    maidian.view('miniprogram_bill_payment')
    this.getLimitDetailInfo()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  methods: {
    ...mapActions('repay', ['getLimitDetailInfo'])
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';

.repaySuccess {
  .progress {
    height: 197px;
    padding: 28px 0 0 27.73%;
    position: relative;
    .blueWord {
      font-size: 15px;
      color: @color-status;
      .pay_fail {
        color: @color-price;
      }
    }
    .grayWord {
      font-size: @font-size-tip;
      color: @color-txt-1;
    }
    .grayWord01 {
      padding: 1px 0 3px;
    }
    .bot {
      padding-top: 54px;
    }
    .leftImg {
      width: 22px;
      height: 132px;
      position: absolute;
      left: 17%;
      top: 28px;
    }
  }
  .info {
    width: 96%;
    padding-left: 4%;
    height: 226px;
    background: #fff;
    p {
      width: 95.6%;
      padding-right: 4.4%;
      height: 44px;
      border-bottom: 1px solid @color-border;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: @font-size-list;
      span:nth-child(1) {
        color: @color-txt-1;
      }
      span:nth-child(2) {
        color: @color-txt;
      }
    }
  }
}
</style>
