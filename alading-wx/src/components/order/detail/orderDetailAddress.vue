/**
* Created by xiejun on 2018/11/4.
* 订单详情——收货地址
*/
<template>
  <div v-if="addressData" class="ala-order-detail-address">
    <div class="ala-order-detail-address__icon"></div>
    <div class="ala-order-detail-address__info">
      <div class="info-name">
        <span class="info-name__consignee">{{addressData.consignee}}</span>
        <span class="info-name__consignee-mobile">{{addressData.consigneeMobile}}</span>
      </div>
      <div class="info-address">{{addressData.address}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    addressData: {
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
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@address-height: 85px;
.ala-order-detail-address {
  width: 100%;
  color: @color-txt;
  background: white;
  height: @address-height;
  padding-left: @padding-h;
  box-sizing: border-box;
  .flex-hor-center();

  .ala-order-detail-address__icon {
    .icon('icon_adress_black', 20px, 20px);
  }

  .ala-order-detail-address__info {
    .flex-n();
    height: @address-height;
    margin-left: 13px;
    color: @color-txt;
    .info-name {
      font-family: PingFangSC-Medium;
      font-size: @font-size-list;
      margin-top: 10px;
      .info-name__consignee {
        margin-left: 0;
      }
      .info-name__consignee-mobile {
        margin-left: 25px;
      }
    }
    .info-address {
      margin-top: 9.5px;
      padding-right: 40px;
      font-size: @font-size-txt;
      line-height: 18px;
      .show-two-line();
    }
  }
}
</style>