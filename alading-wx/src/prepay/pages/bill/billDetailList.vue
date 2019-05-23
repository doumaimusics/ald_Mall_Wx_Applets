<template>
  <div class="list-li">
    <div class="left">
      <div class="top-line">
        <div class="title">{{listData.name}}</div>
        <div class="money">{{listData.billAmount}}元</div>
      </div>
      <div class="btm-line">
        <div class="date">{{gmtPayTime}}</div>
        <div class="times">{{listData.billNper}}/{{listData.nper}}期</div>
      </div>
    </div>
    <!-- <div class="icon-arrow"></div> -->
  </div>
</template>

<script>
import util from 'utils/index'
export default {
  props: ['listData'],
  name: '',
  computed: {
    gmtPayTime() {
      return util.formatDate2(this.listData.payDate)
    }
  }
}
</script>

<style lang="less" scoped>
.list-li {
  display: flex;
  box-sizing: border-box;
  padding: 12px 0 0 17px;
  width: 100%;
  height: 68px;
  border-bottom: solid 1px rgba(228, 228, 228, 0.7);
  &:nth-last-child(1) {
    border-bottom: none;
  }
  .left {
    width: 317px;
  }
  .top-line,
  .btm-line {
    display: flex;
    justify-content: space-between;
  }
  .btm-line {
    margin-top: 7px;
  }
  .title {
    width: 222px;
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(0, 0, 0, 1);
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .money {
    height: 20px;
    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255, 85, 70, 1);
    line-height: 20px;
  }
  .times {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(100, 100, 100, 1);
    line-height: 17px;
  }
  .date {
    height: 17px;
    font-size: 12px;
    font-family: PingFangSC-Light;
    font-weight: 300;
    color: rgba(150, 150, 150, 1);
    line-height: 17px;
  }
}
</style>