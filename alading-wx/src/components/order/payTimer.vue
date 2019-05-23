/**
* Created by huangyilu on 2018/10/22.
* 支付倒计时
*/
<template>
  <div class="pay-timer-view">
    <div v-if=" type == 1 " class="pay_timer_wrap">待支付 {{ countH }}:{{ countM }}:{{ countS }}</div>
    <div v-if=" type == 2 " class="pay_timer_wrap2">支付倒计时 {{ countH }}:{{ countM }}:{{ countS }}</div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
      countTimer: null,
      countH: '00',
      countM: '00',
      countS: '00',
    }
  },
  props: {
    interval:{
      default: 1800
    },
    type:{
      default: 1
    }
  },
  computed: {
    // 售价
    saleAmount() {
      return basis.moneyPrefix(this.goodsInfoData.saleAmount)
    }
  },
  created() {
    clearInterval(this.countTimer);
    if(this.interval > 0){
        this.count();
    }
  },
  mounted() {},
  watch: {
    interval:function(val) {
      if(val > 0){
        clearInterval(this.countTimer);
        this.count();
      }
    }
  },
  methods: {
    goodsDelFn() {
      navigate.push({ url: '/pages/common/goodsDetail' })
    },
    // 加零函数
    addZero(n) {
      n = n * 1 < 10 ? '0' + n : n;
      return n + '';
    },
    // 计时转换函数
    countTime(count) {
      let h = Math.floor(count / 3600);
      let m = Math.floor((count % 3600) / 60);
      let s = count % 60;
      this.countH = this.addZero(h),
      this.countM = this.addZero(m),
      this.countS = this.addZero(s)
      this.$apply();
    },
    // 计时函数
    count() {
      let interval = Math.floor(this.interval / 1000);
      this.countTimer = setInterval(() => {
        interval--;
        if (interval == -1) {
          clearInterval(this.countTimer);
          this.$emit('countEnd');
        } else {
          this.countTime(interval);
        }
      }, 1000);
    },
    // 清除计时器 父组件来invoke触发
    clearCount(){
       clearInterval(this.countTimer);
    }
  },
  components: {}
}
</script>

<style lang="less">
.pay_timer_wrap{
    font-size: .26rem;
    color: #FEAE25;
}
.pay_timer_wrap2{
  font-size: .30rem;
  color: #FFF;
}
</style>
