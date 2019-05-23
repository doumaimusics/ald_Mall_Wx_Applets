/**
* Created by huangyilu on 2018/10/18.
* 我的优惠券
*/
<template>
  <div class="">
    <!-- tab -->
    <ala-tabs :tabTitles='tabTitles' :tabIndex="tabIndex" @sendTabIndex="getTabIndex" />
    <!-- 优惠券列表 -->
    <div class="coupon-view">
      <block v-for="item in renderData" :key="index">
        <ala-coupon-item :coupon="item" />
      </block>
    </div>

    <div class="no-coupon" v-if="renderData.length <= 0" ></div>

  </div>
</template>

<script>
import alaTabs from 'components/tabs/tabs'
import alaCouponItem from 'components/coupon/coupon-item'
import basis from 'utils/basis'
import util from 'utils/index'

import { mapActions, mapGetters } from 'vuex'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      tabIndex: 1,
      tabs: ['未使用', '已使用', '已过期'],
      couponList: []
    }
  },
  props: {},
  computed: {
    ...mapGetters(['userId']),
    tabTitles() {
      return this.tabs.map((item, i) => {
        let length = 0
        switch (i + 1) {
          case 1:
            length = this.NOUSEDATA.length
            break
          case 2:
            length = this.USEDDATA.length
            break
          case 3:
            length = this.EXPIREDATA.length
            break
          default:
            return 0
        }
        return item + '(' + length + ')'
      })
    },
    NOUSEDATA() {
      return this.couponList.filter(a => {
        return a.status === 'NOUSE'
      })
    },
    USEDDATA() {
      return this.couponList.filter(a => {
        return a.status === 'USED'
      })
    },
    EXPIREDATA() {
      return this.couponList.filter(a => {
        return a.status === 'EXPIRE'
      })
    },
    renderData() {
      switch (this.tabIndex) {
        case 1:
          return this.NOUSEDATA
        case 2:
          return this.USEDDATA
        case 3:
          return this.EXPIREDATA
        default:
          return []
      }
    }
  },
  created() {},
  mounted() {
    this.getMyCouponList({
      pageNo: 1,
      userId: this.userId
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
    ...mapActions(['getMyCouponListData']),
    async getMyCouponList(params) {
      let data = await this.getMyCouponListData(params)
      this.couponList = data.couponList.map(a => {
        return Object.assign(
          {},
          a,
          { collapse: false },
          basis.formatTimestampToDays(a.gmtEnd),
          { date: util.formatDate(a.gmtEnd) },
          { isGot: a.userAlready >= a.limitCount },
          { expiryType: 'R' },
          { discount: (a.discount * 10).toFixed(1) },
          { isAmountSamall: a.amount > 99 || toString(a.amount).length >= 3 },
          { isExclude: true }
        )
      })
      console.log('getMyCouponList ', data)
    },
    getTabIndex(data) {
      this.tabIndex = data.tabIndex
    }
  },
  components: { alaTabs, alaCouponItem }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.coupon-view {
  margin-top: 1rem;
}
.no-coupon {
  margin: 40% auto;
  .icon('icon_coupon_empty', 135px, 100px);
}
</style>
