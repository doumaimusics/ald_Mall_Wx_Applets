/**
* Created by xiejun on 2019/03/25.
* 商城节点
*/
<template>
  <div class="shop-node">
    <div class="title">
      <span class="icon"></span>
      <span class="shop-name">{{ shopName }}</span>
    </div>
    <shop-goods-list :goodsList="goodsList"/>
    <div class="info">
      <list-cell v-if="couponVisible" @tap="onChooseCouponTap" :title1="couponDesc" :title2="couponInfo"/>
      <list-cell v-if="fullSub" title1="活动优惠" :title2="fullSubInfo" :iconVisible="false"/>
      <list-cell title1="运费" :title2="expressInfo" :iconVisible="false"/>
      <div class="info-total">
        <span class="detail">共{{ goodsSize }}件商品 小计：</span>
        <span class="amount">￥{{ total }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import listCell from 'components/common/listCell'
import shopGoodsList from './shopGoodsList'

import couponUtil from 'utils/couponUtil'
import goodsTool from 'utils/goodsTool'
import basis from 'utils/basis'

export default {
  name: '',
  components: { listCell, shopGoodsList },
  data() {
    return {}
  },
  props: {
    shopData: {
      type: Object,
      default: function() {
        return null
      }
    }
  },
  computed: {
    hasShopData() {
      return this.shopData
    },
    shopName() {
      if (this.hasShopData) return this.shopData.shopName
      return '爱上街商城'
    },
    couponDesc() {
      let info = '商城优惠'
      if (this.hasShopData) {
        if (this.shopData.rid !== -1) {
          info = '店铺优惠'
        }
      }
      return info
    },
    couponList() {
      if (this.hasShopData) {
        let list = this.shopData.couponList
        if (!list) list = []
        return list
      }
      return []
    },
    couponVisible() {
      return this.couponList.length
    },
    // 最大可用优惠券抵扣金额
    maxCouponAmount() {
      if (this.hasShopData) {
        let { totalPrice, totalFullSub, totalNum } = this.shopData
        let minNeedPay = totalNum * 0.01
        let result = totalPrice - totalFullSub - minNeedPay
        return result
      }
      return 0
    },
    useCouponAmount() {
      if (this.hasShopData) return this.shopData.useCouponAmount
      return 0
    },
    couponInfo() {
      if (this.hasShopData) {
        this.shopData.maxCouponAmount = this.maxCouponAmount
        return couponUtil.getCouponInfo(this.shopData)
      }
      return ''
    },
    expressInfo() {
      let express = 0
      if (this.hasShopData) {
        express = this.shopData.express
      }
      let info = `快递￥${express.toFixed(2)}`
      return info
    },
    fullSub() {
      if (this.hasShopData) {
        return this.shopData.totalFullSub
      }
      return 0
    },
    fullSubInfo() {
      return `已省￥${basis.toFix(this.fullSub)}元`
    },
    total() {
      let t = goodsTool.calcTotal(this.shopData)
      t = basis.toFix(t)
      return t
    },
    goodsList() {
      if (this.hasShopData) {
        let list = this.shopData.goodsList
        return list
      }
      return []
    },
    goodsSize() {
      if (this.hasShopData) {
        return this.shopData.totalNum
      }
      return 0
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onChooseCouponTap() {
      this.$emit('chooseCouponTap', this.shopData)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.shop-node {
  margin-bottom: 10px;
  background: white;
  &:last-child {
    margin-bottom: 0;
  }
  .title {
    height: 40px;
    .padding-h(@padding-h);
    .flex-hor-center();
    .icon {
      flex-shrink: 0;
      .icon('icon_shop', 20px, 20px);
    }
    .shop-name {
      margin-left: 10px;
      .show-line();
      color: @color-txt;
      font-size: 14px;
      font-family: PingFangSC-Medium;
    }
  }
  .info {
    padding-bottom: 10px;
    /deep/.list-cell {
      .border-1px-bottom();
      .title1 {
        font-size: 14px;
      }
      .title2 {
        margin-right: 5px;
        color: @color-txt;
      }
    }
    .info-total {
      margin-top: 10px;
      color: @color-txt;
      font-size: 13px;
      .flex-hor-center();
      .padding-h(@padding-h);
      .detail {
        .flex-n();
        text-align: right;
      }
      .amount {
        color: @color-price;
        font-size: 14px;
      }
    }
  }
}
</style>