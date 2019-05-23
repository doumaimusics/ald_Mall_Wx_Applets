/**
* Created by xiejun on 2019/01/06.
* 适配微信支付时，拼团及普通订单详情
*/
<template>
  <div></div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import storage from 'utils/storage'
import basis from 'utils/basis'
import navigate from 'utils/navigate'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapState(['orderDetailData', 'isLogin', 'currentOrderId', 'userInfo'])
  },
  created() {},
  mounted() {},
  onShow() {
    if (storage.props.launchStatus === 1) return
    if (!this.isLogin) {
      basis.toLogin()
      return
    }

    let options = storage.props.launchOptions
    if (options && options.query.orderId) {
      this.setCurrentOrderId(options.query.orderId)

      // 判断是否有mobile参数，若有说明是从App微信支付直接跳转到小程序的
      if (options.query.mobile) {
        let mobile = options.query.mobile
        if (mobile !== this.userInfo.mobile) {
          storage.props.loginMobile = mobile
          basis.toLogin()
          return
        }
      }

      // 清空一下
      options.query = {}
      storage.props.launchOptions = options
    }
    // 判断是否为拼团订单
    this.checkIsCollageOrder()
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  watch: {},
  methods: {
    ...mapMutations(['setCurrentOrderId', 'setGoodsIdsData']),
    ...mapActions(['judgeCollageOrder']),
    async checkIsCollageOrder() {
      let res = await this.judgeCollageOrder()
      if (res) {
        if (res.isPintuanGoods) {
          // 拼团订单
          let options = storage.props.launchOptions
          let pinOrderNo = res.pinOrderNo
          let orderId = this.currentOrderId
          options.query = { orderId, pinOrderNo }
          storage.props.launchOptions = options
          navigate.reLaunch({ url: '/pcollage/pages/detail/order/detailOrder' })
        } else {
          navigate.reLaunch({ url: '/pages/common/orderDetailMine' })
        }
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
</style>
