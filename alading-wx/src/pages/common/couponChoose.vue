/**
* Created by xiejun on 2019/03/28
* 选择优惠券
*/
<template>
  <div class="coupon-choose">
    <div class="item-list" :class="{ 'iphonex': isIphoneX }">
      <div 
      class="choose-item" 
      v-for="(coupon, index) in chooseCouponList" 
      @tap="onItemTap(index)"
      :key="index">
        <coupon-item :coupon="coupon" />
        <div :class="['btn-choose', { 'choose':coupon.isGot }]"></div>
      </div>
    </div>
    <div @tap="onClearTap" :class="['btn-choose-none', { 'iphonex': isIphoneX }]">
      <span>不使用优惠券</span>
    </div>
  </div>
</template>

<script>
import couponItem from 'components/coupon/coupon-item'

import { mapGetters, mapActions } from 'vuex'
import navigate from 'utils/navigate'
import systemInfo from 'utils/systemInfo'

export default {
  name: '',
  components: { couponItem },
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapGetters('coupon', ['chooseCouponIndex', 'chooseCouponList']),
    isIphoneX() {
      return systemInfo.isIphoneX
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapActions('coupon', ['setChooseCouponIndex']),
    onItemTap(index) {
      if (this.chooseCouponList[index].isGot) {
        this.back()
      } else {
        this.chooseCouponChange(index)
      }
    },
    onClearTap() {
      if (this.chooseCouponIndex === -1) {
        this.back()
      } else {
        this.chooseCouponChange(-1)
      }
    },
    chooseCouponChange(index) {
      if (this._hasChoose) return
      this._hasChoose = true
      this.setChooseCouponIndex(index)
      setTimeout(() => {
        this._hasChoose = false
        this.back()
      }, 200)
    },
    back() {
      navigate.back({ delta: 1 })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@icon-size: 30px;
.coupon-choose {
  .fill-page(white);
  .item-list {
    .adapt-iphonex(64px);
    .choose-item {
      position: relative;
      .btn-choose {
        position: absolute;
        top: 50%;
        right: 44px;
        transform: translateY(-50%);

        width: @icon-size;
        height: @icon-size;

        border: 2px solid @color-border-1;
        border-radius: 50%;
        box-sizing: border-box;
        &.choose {
          border: none;
          .icon('icon_selected_y', @icon-size, @icon-size);
        }
      }
    }
  }
  .btn-choose-none {
    position: fixed;
    left: 0;
    bottom: 0;
    .border-1px-top();
    background: white;

    width: 100%;
    padding: 10px 15px;
    box-sizing: border-box;

    text-align: center;
    font-size: 16px;
    color: @color-txt-1;
    .adapt-iphonex(10px);

    span {
      width: 100%;
      height: 44px;
      line-height: 44px;

      border: 1px solid @color-txt-1;
      border-radius: 22px;
    }
  }
}
</style>