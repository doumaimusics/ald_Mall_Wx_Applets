/**
* Created by huangyilu on 2018/11/21.
* 我的砍价 商品 状态
*/
<template>
  <div class="mbgl-goods-status__item">
    <!-- 砍价中 -->
    <div class="mgs__view" v-if="status === 0">
      <div class="miv__time">
        剩余
        <span>{{ timer.d ? timer.d : '' }} {{ timer.h }}:{{ timer.m }}:{{ timer.s }}</span>
      </div>
      <div class="miv-right btn" @click="bindShareFn">继续分享</div>
    </div>
    <!-- 砍价成功 -->
    <div class="mgs__view" v-if="status === 1">
      <div class="miv__time">砍价成功</div>
      <div class="miv-left btn" @click="bindDelectFn">删除订单</div>
      <div class="miv-right btn" @click="bindOrderListFn">查看订单</div>
    </div>
    <!-- 砍价失败 -->
    <div class="mgs__view" v-if="status === 2">
      <div class="miv__time">砍价失败</div>
      <div class="miv-left btn" @click="bindDelectFn">删除订单</div>
      <div class="miv-right btn" @click="bindReCreateBargainFn">重新发起</div>
    </div>
  </div>
</template>

<script>
import basis from 'utils/basis'
import { mapActions, mapMutations, mapState } from 'vuex'
import navigate from 'utils/navigate'
import Tips from 'utils/tip'
import conf from '../../util/conf'
import maidian from 'utils/maidian'

export default {
  name: '',
  data () {
    return {
      timer: '',
      countTimeKey: ''
    }
  },
  props: {
    goodsInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    status: {
      type: Number,
      default: -1
    },
    index: {
      type: Number,
      default: -1
    },
    endTime: {
      type: Number,
      default: 0
    }
  },
  computed: {
    ...mapState('bargain', ['nowTime'])
  },
  created () { },
  mounted () {
    if (this.status === 0) {
      this.formatTimer()
    }
  },
  watch: {
    endTime: function (val, oldVal) {
      // 清除 计时器
      basis.clearCountdown(this.countTimeKey)
      this.formatTimer()
    }
  },
  destroyed () {
    // 清除 计时器
    basis.clearCountdown(this.countTimeKey)
  },
  methods: {
    ...mapActions('bargain', ['delectUserBargainOrder', 'createBargain', 'getUserBargainOrderList', 'getBargainGoodsLimitInfo']),
    ...mapMutations('bargain', ['setSelectBargainOrderIndex']),
    formatTimer () {
      let duration = parseInt((this.endTime - this.nowTime) / 1000)
      let key = basis.countdown(duration, {
        timer: data => {
          this.timer = basis.formatCountTime(data.last)
          // console.log('formatTimer == ', this.timer)
        },
        complete: () => {
          // 倒计时结束 更新手机
          this.getUserBargainOrderList()
        }
      })
      this.countTimeKey = key
      console.log('countTimeKey == ', this.countTimeKey)
    },
    // 删除订单
    async bindDelectFn () {
      Tips.confirm('确定要删除该订单？').then(() => {
        this.setSelectBargainOrderIndex(this.index)
        this.delectUserBargainOrder()
      })
    },
    bindOrderListFn () {
      navigate.push({ url: '/pages/common/order' })
      maidian.click('kanjia_detail_vieworder', this.goodsInfo.goodsName, this.goodsInfo.freeOrderGoodsId)
    },
    // 继续分享
    bindShareFn () {
      maidian.click('kanjia_my_share', this.goodsInfo.goodsName, this.goodsInfo.freeOrderId)
      maidian.view('kanjia_my_sharepop', this.goodsInfo.goodsName, this.goodsInfo.freeOrderId)
      maidian.view('kanjia_my_shareup', this.goodsInfo.goodsName, this.goodsInfo.freeOrderId)
      navigate.push({ url: '/pBargain/pages/bargainDetail?freeOrderId=' + this.goodsInfo.freeOrderId + '&recommendId=' + this.goodsInfo.userId })
    },
    // 重新发起
    async bindReCreateBargainFn () {
      maidian.click('kanjia_my_relaunch', this.goodsInfo.goodsName, this.goodsInfo.freeOrderId)
      // 是否还能发起砍价
      Tips.loading()
      this.getBargainGoodsLimitInfo({
        freeOrderGoodsId: this.goodsInfo.freeOrderGoodsId
      }).then(res => {
        let msgcode = conf.GOODSLIMITINFO[res.userGoodsStatus]
        switch (msgcode) {
          case 1:
            // 最终 可以发起砍价
            this.createBargain({
              freeOrderGoodsId: this.goodsInfo.freeOrderGoodsId,
              addressId: this.goodsInfo.addressId,
              goodsPriceId: this.goodsInfo.goodsPriceId
            }).then(res => {
              navigate.push({ url: '/pBargain/pages/bargainDetail?freeOrderId=' + res.freeOrderId + '&recommendId=' + res.userId })
            })
            Tips.loaded()
            break
          case 2:
            Tips.toast(res.msg)
            Tips.loaded()
            break
          case 3:
            Tips.loaded()
            Tips.toast(res.msg)
            break
          default:
            Tips.loaded()
        }
        return msgcode
      })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '../../style/index.less';
.mbgl-goods-status__item {
  height: 100 / @px;
  line-height: 100 / @px;
  background-color: #ffffff;
  padding: 0 30 / @px;
  .mgs__view {
    .flex-hor-center();
    font-size: 26 / @px;
    .miv__time {
      .flex-n();
      span {
        color: @color-txt-price-2;
      }
    }
    .btn {
      text-align: center;
      width: 200 / @px;
      height: 60 / @px;
      line-height: 60 / @px;
      border-radius: 6 / @px;
    }
    .miv-left {
      .border(#404040);
      color: @color-txt-666;
    }
    .miv-right {
      background: @color-btn-bg;
      border-radius: 6 / @px;
      margin-left: 20 / @px;
    }
  }
}
</style>
