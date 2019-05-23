/**
* Created by xiejun on 2019/02/28.
* 退款成功 详情
*/
<template>  
  <div class="detail-refund">
    <div class="refund-info">
      <div class="title">
        <span class="icon"></span>
        <span>退款成功</span>
      </div>
      <div class="tip">已成功退款至51返呗账户余额</div>
    </div>
    <detail-cell type="1" info0="实际还款金额" info1="150.56元"></detail-cell>
    <div class="block gray">
      <detail-cell info0="支付金额" info1="150.56元"></detail-cell>
      <detail-cell info0="本金" info1="150.56元"></detail-cell>
      <detail-cell info0="手续费" info1="150.56元"></detail-cell>
      <detail-cell info0="逾期费" info1="150.56元"></detail-cell>
    </div>
    <div class="block-title">退款详情</div>
    <div class="block">
      <detail-cell type="3"  info0="商品名称" info1="儿童双色双肩包小宝宝最可儿童双色双肩包小宝宝最可"></detail-cell>
      <detail-cell info0="商品总价" info1="800.00元"></detail-cell>
      <detail-cell info0="直接支付" info1="300.00元"></detail-cell>
      <detail-cell info0="分期详情" info1="180.56X3期（已支付2期）"></detail-cell>
      <detail-cell info0="退款时间" info1="2017/7/4 16:09:09"></detail-cell>
      <detail-cell info0="退款编号" info1="20170708162900987687"></detail-cell>
    </div>
  </div>
</template>

<script>
import detailCell from './detailCell'
import detailProgress from './detailProgress'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    detailData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {},
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
.detail-refund {
  // padding-bottom: 20px;
  .refund-info {
    padding-top: 29px;
    padding-bottom: 2px;
    text-align: center;
    .title {
      margin-bottom: 15px;
      .flex-hor-center();
      justify-content: center;
      font-size: 22px;
      color: @color-status;
      .icon {
        margin-right: 6px;
        .icon('icon_refund', 24px, 27px);
      }
    }
    .tip {
      font-size: 14px;
      color: @color-txt-1;
    }
  }
  .block {
    padding-bottom: 20px;
    background: @color-bg;
  }
  .block-title {
    height: 46px;
    line-height: 46px;

    padding-left: 16px;

    font-size: 15px;
    color: @color-txt;
  }
}
</style>