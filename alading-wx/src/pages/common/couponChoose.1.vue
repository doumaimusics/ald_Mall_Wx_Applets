/**
* Created by huangyilu on 2018/10/17.
* 选择优惠券
*/
<template>
  <div class="choose-coupon-view">
    <div class="cp-item" v-for="coupon in newCouponList" :key="index">
      <ala-coupon-item :coupon="coupon" />
      <!-- 选择按钮 -->
      <div class="cp-info__btn" @click="chooseCouponFn(coupon, index)">
        <div class="choose-btn" v-if="coupon.isGot" ></div>
        <div :class="{'choose-btn-gray': !coupon.isGot }" v-if="!coupon.isGot" ></div>
      </div>
    </div>
    <div class="nocoupon-btn" @click="goBackFn">不使用优惠券</div>
  </div>
</template>

<script>
import alaCouponItem from 'components/coupon/coupon-item'
import navigate from 'utils/navigate'
import { mapActions, mapGetters } from 'vuex'
import util from 'utils/index'
import basis from 'utils/basis'
import Tips from 'utils/tip'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      newCouponList: []
    }
  },
  props: {},
  computed: {
    ...mapGetters(['availableCouponData', 'userId', 'availableCouponIndex'])
  },
  created() {},
  mounted() {
    console.log(' availableCouponData == ', this.availableCouponData)
    this.newCouponList = this.availableCouponData.map((a, i) => {
      let isGot = false
      if (i === this.availableCouponIndex) {
        isGot = true
      }
      return Object.assign(
        {},
        a,
        { collapse: false },
        basis.formatTimestampToDays(a.gmtEnd),
        { date: util.formatDate(a.gmtEnd) },
        { isGot: isGot },
        { expiryType: 'R' },
        { discount: (a.discount * 10).toFixed(1) },
        { isAmountSamall: a.amount > 99 || toString(a.amount).length >= 3 }
      )
    })
  },
  onShow() {
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
    ...mapActions(['setAvailableCouponIndex']),
    chooseCouponFn(item, index) {
      console.log('chooseCouponFn')
      Tips.loading()
      this.newCouponList.forEach(item => {
        item.isGot = false
      })
      this.newCouponList[index].isGot = true
      this.setAvailableCouponIndex(index)
      setTimeout(() => {
        Tips.loaded()
        navigate.back({ delta: 1 })
      }, 400)
    },
    goBackFn() {
      this.setAvailableCouponIndex(-1)
      navigate.back({ delta: 1 })
    }
  },
  components: { alaCouponItem }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.choose-coupon-view {
  background-color: #ffffff;
  .nocoupon-btn {
    color: #666666;
    font-size: 0.3rem;
    border: 1px solid #666666;
    border-radius: 100px;
    text-align: center;
    padding: 8px 0;
    margin: 30px;
  }
}
.cp-item {
  position: relative;
}
.cp-info__btn {
  font-size: 0.24rem;
  color: #2e2e2e;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 25%;
  padding-right: 10px;
  position: absolute;
  right: 0;
  top: 1rem;
  .get-btn {
    height: 27px;
    line-height: 27px;
    width: 64px;
    text-align: center;
    background: @color-btn;
    border-radius: 100px;
  }
  .btn-gray {
    color: #ffffff;
    background-color: #dddddd;
  }
  .choose-btn {
    .icon('icon_selected_y', 30px, 30px);
  }
  .choose-btn-gray {
    width: 28.5px;
    height: 28.5px;
    border: 2px solid #dddddd;
    border-radius: 50%;
  }
}
</style>
