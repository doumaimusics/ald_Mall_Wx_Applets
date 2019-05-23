<template>
  <div class="bill-line" @click="toBillDetail(bills.billYear, bills.billMonth)">
    <div class="left">
      <div class="circle"><div class="circle-mid"></div></div>
      <div class="month">{{bills.billMonth}}月</div>
    </div>
    <div class="bill-li">
      <div class="money-box" :class="{'notout-bill':bills.isOut===0}">
        <div class="money">{{billAmount}}</div>
        <div class="icon-overdue" v-if="bills.isOut===1 && bills.overdueStatus==='Y'">已逾期</div>
        <div class="icon-overdue isout" v-if="bills.isOut===1 && bills.overdueStatus==='N'">已出账</div>
        <div class="icon-overdue notout" v-if="bills.isOut===0">未出账</div>
      </div>
      <div class="intro" v-if="bills.isOut===1 && bills.overdueStatus==='Y'">包含逾期利息{{bills.overdueInterestAmount}}元</div>
      <div class="intro" v-if="bills.isOut===1 && bills.overdueStatus==='N'">最后还款日{{billDate}}</div>
    </div>
  </div>
</template>

<script>
import navigate from 'utils/navigate'
export default {
  props: ['bills'],
  computed: {
    billAmount() {
      return this.formatMoney(this.bills.billAmount)
    },
    billDate() {
      return this.formatDate(this.bills.gmtPayTime)
    }
  },
  methods: {
    formatMoney(money) {
      const str = String(money)
      return str.includes('.') ? str : str + '.00'
    },
    formatDate(date) {
      date = new Date(date)
      const month = date.getMonth() + 1
      const day = date.getDate()

      const hour = date.getHours()
      const minute = date.getMinutes()
      return `${month}月${day}日 ${hour}:${minute}`
    },
    toBillDetail(year, month) {
      navigate.push({ url: './billDetail?year=' + year + '&month=' + month, isNeedLogin: true })
    }
  }
}
</script>

<style lang="less" scoped>
.bill-line {
  position: relative;
  z-index: 2;
  display: flex;
  margin-bottom: 20px;
  box-sizing: border-box;
  .left {
    margin-left: 4px;
  }
  .money {
    margin-left: 17px;
    margin-top: 10px;
    font-size: 20px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(100, 100, 100, 1);
    line-height: 28px;
  }
}
.circle {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 12px 2px 0;
  width: 14px;
  height: 14px;
  background: linear-gradient(162deg, rgba(255, 119, 71, 1) 0%, rgba(254, 170, 97, 1) 100%);
  box-shadow: 0px 2px 4px 0px rgba(255, 193, 160, 1);
  border-radius: 100% 100%;
  border: 6px;
}
.circle-mid {
  width: 6px;
  height: 6px;
  background: rgba(255, 255, 255, 1);
  border-radius: 100% 100%;
}
.month {
  font-size: 11px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(150, 150, 150, 1);
  line-height: 15px;
}
.bill-li {
  width: 318px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 1px 8px 0px rgba(195, 195, 195, 0.39);
  border-radius: 4px;
  overflow: hidden;
}
.money-box {
  display: flex;
  justify-content: space-between;
  height: 45px;
}
.icon-overdue {
  width: 80px;
  height: 20px;
  background: linear-gradient(162deg, rgba(255, 119, 71, 1) 0%, rgba(254, 170, 97, 1) 100%);
  font-size: 10px;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 20px;
  text-align: center;
  transform: rotate(45deg);
  margin-top: 5px;
  margin-right: -25px;
}
.intro {
  width: 100%;
  height: 35px;
  padding-left: 17px;
  padding-top: 6px;
  background: #f9f9f9;
  font-size: 14px;
  font-family: PingFangSC-Light;
  font-weight: 300;
  color: rgba(100, 100, 100, 1);
  line-height: 20px;
}
.notout {
  background: linear-gradient(
    136deg,
    rgba(100, 232, 222, 1) 0%,
    rgba(100, 181, 232, 1) 20%,
    rgba(100, 187, 232, 1) 20%,
    rgba(100, 177, 232, 1) 21%,
    rgba(100, 177, 232, 1) 25%,
    rgba(100, 163, 231, 1) 40%,
    rgba(100, 163, 231, 1) 40%,
    rgba(100, 163, 231, 1) 40%,
    rgba(100, 115, 229, 1) 91%,
    rgba(138, 100, 232, 1) 100%
  ) !important;
}
.isout {
  background: linear-gradient(220deg, rgba(230, 185, 128, 1) 0%, rgba(231, 186, 130, 1) 100%) !important;
}
.notout-bill {
  height: 60px;
  line-height: 60px;
  .money {
    margin-top: 16px;
  }
}
</style>