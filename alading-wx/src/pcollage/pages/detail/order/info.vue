/**
* Created by xiejun on 2018/12/03.
* 详情-订单-其它信息
*/
<template>
  <div :class="['detail-order-info', {'has-menu':hasMenu}]">
    <div class="info-line">订单编号：{{infoData.orderNo}}</div>
    <ala-detail-info-node title="创建时间：" :time="infoData.gmtCreate"/>
    <div v-if="hasPayType" class="info-line">支付方式：{{payType}}</div>
    <ala-detail-info-node title="支付时间：" :time="infoData.gmtPay"/>
  </div>
</template>

<script>
import alaDetailInfoNode from 'components/order/detail/detailInfoNode'

const payTypeObj = {
  CREDIT: '支付宝',
  ALI: '支付宝',
  WX: '微信',
  AP: '代付',
  BANK: '银行卡',
  CP: '组合支付',
  OTHER: '其他支付',
  wechat_app: '微信小程序支付',
  wechat_public: '微信公众号支付',
  ZERO_PURCHASE: '0元购',
  ALIPAY_H5: '支付宝H5支付'
}

export default {
  name: '',
  data() {
    return {}
  },
  props: {
    hasMenu: {
      type: Boolean,
      default: false
    },
    infoData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    hasPayType() {
      return this.infoData.payType
    },
    payType() {
      return payTypeObj[this.infoData.payType]
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { alaDetailInfoNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.detail-order-info {
  width: 100%;
  margin-top: 10px;
  background: white;
  .padding-v(16px);
  .info-line {
    margin-bottom: 5px;
    padding-left: @padding-h;
    font-size: @font-size-tip;
    color: #bebebe;
  }
}
</style>