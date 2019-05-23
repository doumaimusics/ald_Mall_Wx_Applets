/**
* Created by huangyilu on 2018/12/16.
* 我的 砍价详情 按钮
*/
<template>
  <div class="hbdv-statue">
    <!-- 砍价中 -->
    <!-- <button class="share-icon" open-type="share">
      <div class="icon"></div>
      <div>微信朋友</div>
    </button>
    @click="bingShareFn"-->
    <button class="hbdv-help-btn" v-if="helpStatus === 0" open-type="share">邀请好友一起砍价</button>
    <!-- 砍价成功 -->
    <div class="hbdv-help-btn" v-if="helpStatus === 1" @click="bindReCreateBargainFn">重新发起0元砍价</div>
    <div
      v-if="helpStatus === 1"
      class="hbdv-help-btn secondary-btn"
      @click="bindGoOrderListFn"
    >查看物流订单</div>
    <!-- 砍价失败 -->
    <div class="hbdv-help-btn" v-if="helpStatus === 2" @click="bindReCreateBargainFn">重新发起0元砍价</div>
  </div>
</template>

<script>
import navigate from 'utils/navigate'
import { mapActions } from 'vuex'
import Tips from 'utils/tip'
import conf from '../../util/conf'

export default {
  name: '',
  data () {
    return {}
  },
  props: {
    orderInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 0:助力中 1:助力完成 2:超时失败
    helpStatus: {
      type: Number,
      default: -1
    },
    // 1:未助力(立即帮砍)  2:助力成功(已帮砍)  3:助力未完成(立即登录app)  4:老用户(仅限新用户)  5:超时未帮砍（砍价已超时）
    goodsStatus: {
      type: Number,
      default: -1
    }
  },
  computed: {},
  created () { },
  mounted () {
    console.log('mounted orderInfo =', this.orderInfo)
  },
  watch: {},
  methods: {
    ...mapActions('bargain', ['createBargain', 'getBargainGoodsLimitInfo']),
    // 前往我的订单列表
    bindGoOrderListFn () {
      navigate.push({ url: '/pages/common/order' })
    },
    // 重新发起
    async bindReCreateBargainFn () {
      // 是否还能发起砍价
      Tips.loading()
      this.getBargainGoodsLimitInfo({
        freeOrderGoodsId: this.orderInfo.freeOrderGoodsId
      }).then(res => {
        let msgcode = conf.GOODSLIMITINFO[res.userGoodsStatus]
        switch (msgcode) {
          case 1:
            // 最终 可以发起砍价
            this.createBargain({
              freeOrderGoodsId: this.orderInfo.freeOrderGoodsId,
              addressId: this.orderInfo.addressId,
              goodsPriceId: this.orderInfo.goodsPriceId
            }).then(res => {
              navigate.replace({ url: '/pBargain/pages/bargainDetail?freeOrderId=' + res.freeOrderId + '&recommendId=' + res.userId })
            })
            Tips.loaded()
            break
          case 2:
            Tips.loaded()
            Tips.confirm(res.msg).then(() => {
              // 前往我的砍价
              navigate.back({ delta: 1 })
            })
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
    },
    // 分享事件
    bingShareFn () {
      this.$emit('bingShareFn')
    }
  },
  components: {}
}
</script>

<style lang="less">
</style>
