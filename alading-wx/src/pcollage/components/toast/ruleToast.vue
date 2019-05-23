/**
* Created by xiejun on 2018/11/27.
* 拼团规则弹窗
*/
<template>
  <div class="collage-rule-toast">
    <p class="title">拼团规则</p>
    <p class="content">
      1、拼团成功：开团24小时内达到规定的成团人数，即可拼团成功，系统将在48小时内安排发货。其中新人团除团长外，参团成员必须为新人。新人指的是从未在爱上街成功支付过订单的用户，如支付成功后退款，则不为新人。<br/>
      2、拼团失败：如下两种情况拼团失败，系统将在3个工作日内原路退款至付款账户。<br/>
      A.用户在开团后规定时间内未找到对应开团数的好友参团。<br/>
      B.在参团有效期内，商品已提前售罄，则不管团人数是否达到相应要求，此次团购失败。<br/>
      3、取消订单：拼团订单尚未支付时，若参与的团已拼团成功或失败，则该拼团订单将自动取消；拼团成功的订单不支持取消订单。<br/>
      4、拼团限购：部分拼团商品对同一用户有限购要求。同一用户是指根据用户登陆或使用的爱上街账号，爱上街根据其关联信息判断实际为同一用户，关联信息包括但不仅限于：同一手机号、同一支付账号、同一身份证号或同一设备号等。通过不正当手段多次购买此类商品的，爱上街有权撤销相关交易订单。<br/>
      5、包邮政策遵循平台邮费规则，部分商品针对如新疆西藏青海甘肃等偏远地区需用户自行补贴运费。<br/>
      6、爱上街可以根据本活动的实际举办情况对活动规则进行变动或调整，相关变动或调整将公布在活动页面上，公布后依法生效。
    </p>   
    <p class="close" @tap="onCloseTap"></p>   
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onCloseTap() {
      this.$emit('tap')
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-rule-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;
  .icon('image_toast_rule', 300px, 365px);
  overflow: hidden;
  .title {
    font-family: PingFangSC-Medium;
    font-size: 17px;
    color: #333333;
    height: 24px;
    line-height: 24px;
    padding: 18px 0 9px;
    text-align: center;
  }
  .content {
    width: 82%;
    height: 270px;
    overflow-y: auto;
    .scroll();
    padding: 0 9%;
    text-align: justify;
    line-height: 20px;
    font-size: @font-size-txt;
    color: @color-txt-1;
    letter-spacing: 1px;
  }
  .close {
    width: 32px;
    height: 32px;
    position: absolute;
    right: 0;
    top: 0;
  }
}
</style>