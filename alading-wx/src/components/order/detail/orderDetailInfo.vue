/**
* Created by xiejun on 2018/11/4.
* 订单详情——信息
*/
<template>
  <div :class="['ala-order-detail-info', {'has-menu':hasMenu}]">
    <div class="info-line">订单编号：{{infoData.orderNo}}</div>
    <ala-detail-info-node title="创建时间：" :time="infoData.gmtCreate"/>
    <ala-detail-info-node title="支付时间：" :time="infoData.gmtPay"/>
    <ala-detail-info-node title="发货时间：" :time="infoData.gmtDeliver"/>
    <ala-detail-info-node title="完成时间：" :time="infoData.gmtFinished"/>
    <ala-detail-info-node title="关闭时间：" :time="infoData.gmtClosed"/>
  </div>
</template>

<script>
import alaDetailInfoNode from './detailInfoNode'
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
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { alaDetailInfoNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-order-detail-info {
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