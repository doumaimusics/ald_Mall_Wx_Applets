/**
* Created by huangyilu on 2018/10/15.
* 单张优惠券
*/
<template>
  <div class="coupon-item-view">

    <div :class="['cp-info__item ', { 'notnouse': coupon.status !== 'NOUSE' && coupon.status !== null && coupon.isExclude , 'expired': coupon.status === 'EXPIRE' && coupon.isExclude, 'used': coupon.status === 'USED' && coupon.isExclude }]">
      <div class="cp-info__price flex-1 flex">
        <div class="shop-title">
          <span class="icon"></span>
          <span class="shop-name">{{ coupon.shopName }}</span>
        </div>
        <div class="price__left">
          <div class="info">
            <span class="prefix">{{ couponInfo.prefix }}</span>
            <span :class="[ 'title', { 'small' : couponInfo.isSmall }, { 'smaller' : couponInfo.isSmaller } ]">{{ couponInfo.title }}</span>
            <span class="postfix">{{ couponInfo.postfix }}</span>
          </div>
          <div>{{ couponDesc }}</div>
        </div>
        <div class="price__txt">
          <div class="price__condition">{{ coupon.limitAmount ? '满' + coupon.limitAmount + '元可用' : '无门槛使用' }}</div>
          <div class="price__detail show_one_line">{{ coupon.name }}</div>
          <!-- 固定天数 -->
          <div v-if="coupon.expiryType == 'D'" class="price__deadline" >
            领取后{{ coupon.validDays }}天到期
          </div>
          <div v-if="coupon.expiryType == 'R'">
            <div v-if="coupon.status === 'NOUSE'"  :class="['price__deadline ', { 'red': coupon.will }]">
              {{ coupon.day }}到期
            </div>
            <div v-if="coupon.status !== 'NOUSE'" class="price__deadline">
              {{ coupon.date }}到期
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  props: {
    coupon: {
      type: Array,
      default: []
    }
  },
  computed: {
    // 是否为满减券
    isDiscount() {
      let type = this.coupon.type
      return type === 'DISCOUNT' || type === 'MALLDISCOUNT'
    },
    couponInfo() {
      let prefix = ''
      let postfix = ''
      let title = ''
      let isSmall = false
      let isSmaller = false
      if (this.isDiscount) {
        isSmall = true
        postfix = '折'
        title = this.coupon.discount
      } else {
        prefix = '¥'
        title = this.coupon.amount
        if (title > 999 || (title + '').length >= 4) {
          isSmaller = true
        } else if (title > 99 || (title + '').length >= 3) {
          isSmall = true
        }
      }
      return { prefix, postfix, title, isSmall, isSmaller }
    },
    couponDesc() {
      let desc = '满减券'
      if (this.isDiscount) {
        desc = '折扣券'
      } else {
        let type = this.coupon.type
        if (type === 'REPAYMENT') {
          desc = '还款券'
        }
      }
      return desc
    }
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.cp-info__item {
  margin: 5px 3%;
  display: flex;
  position: relative;
  .icon('icon_coupon_bg', 94%, 2.6rem);
  &.notnouse {
    .shop-title {
      color: #bababa !important;
      .icon {
        opacity: 0.4;
      }
    }
    .price__left {
      color: #bababa !important;
    }
    .price__txt {
      color: #bababa !important;
    }
  }
  &.expired {
    .icon('icon_coupon_expired', 94%, 2.6rem);
  }
  &.used {
    .icon('icon_coupon_used', 94%, 2.6rem);
  }
  .cp-info__price {
    position: relative;
    padding: 40px 0 15px 20px;
    width: 75%;
    display: flex;
    align-items: center;
    .shop-title {
      position: absolute;
      top: 15px;
      left: 20px;
      width: 85%;
      color: @color-txt;
      .flex-hor-center();
      .icon {
        flex-shrink: 0;
        .icon('icon_shop', 20px, 20px);
      }
      .shop-name {
        margin-left: 10px;
        .show-line();
        font-size: 14px;
        font-family: PingFangSC-Medium;
      }
    }
    .price__left {
      font-size: 0.28rem;
      color: @color-price;
      width: 1.2rem;
      .info {
        font-size: 0;
        .prefix {
          font-size: 0.28rem;
        }
        .postfix {
          font-size: 0.22rem;
        }
        .title {
          font-size: 0.6rem;
          &.small {
            font-size: 0.48rem;
          }
          &.smaller {
            font-size: 0.4rem;
          }
        }
      }
      &:last-child {
        font-family: PingFangSC-Medium;
      }
    }
    .price__txt {
      font-family: PingFangSC-Regular;
      color: #393939;
      width: 3.5rem;
      div {
        padding: 5px 0;
      }
      .price__condition {
        font-family: PingFangSC-Medium;
        font-size: 0.28rem;
      }
      .price__detail {
        width: 3.5rem;
        height: 0.26rem;
        font-size: 0.26rem;
      }
      .price__deadline {
        font-size: 0.24rem;
        &.red {
          color: @color-price;
        }
      }
    }
  }
}
</style>
