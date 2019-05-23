<template>
  <div :class="[chooseRepayTypeShow?'chooseRepayType chooseRepayTypeActive':'chooseRepayType',isIphoneX?'iphoneX':'']">
    <p class="title">
      <span class="backIcon" @click="backIconClick"></span>
      <span class="titleWord">选择还款方式</span>
      <span></span>
    </p>
    <ul>
      <li v-for="(item,index) in bankCardList.bankCardList" :key="index" @click="toKeyBoard(item)">
        <div class="left">
          <img class="bankIcon" :src="item.bankIcon?item.bankIcon:''">
          <p class="bankName">
            <span class="name">{{item.bankName}}({{item.cardNumberFix}})</span><br/>
            <span class="des">单笔限额:{{item.bankStatus.limitUp}} 单日限额:{{item.bankStatus.dailyLimit}}</span>
          </p>
        </div>
        <div class="right"></div>
      </li>
      <li class="addCard" @click="addCardClick"><span></span><span>添加银行卡付款</span></li>
    </ul>
  </div>
</template>

<script>
import webview from 'utils/webview'
import systemInfo from 'utils/systemInfo'
export default {
  props: ['chooseRepayTypeShow', 'bankCardList'],
  data() {
    return {
      isIphoneX: systemInfo.isIphoneX
    }
  },
  computed: {},
  created() {},
  methods: {
    backIconClick() {
      this.$emit('backIconClick', false)
    },
    toKeyBoard(item) {
      let data = {
        bankChannel: item.bankChannel,
        cardId: item.rid
      }
      this.$emit('toKeyBoard', data)
    },
    addCardClick() {
      webview.openAddBankCard()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';

.chooseRepayType {
  width: 100%;
  background: #fff;
  position: fixed;
  left: 0;
  bottom: -100%;
  z-index: 20;
  transition: all 0.3s;
  .title {
    width: 96%;
    padding: 0 4% 0 2%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid @color-border;
    .backIcon {
      transform: rotateY(-180deg);
      margin-top: 2px;
      .icon('icon_arrow',23px,23px);
    }
    .titleWord {
      font-size: @font-size-btn-1;
      color: @color-txt;
    }
  }
  ul {
    height: 410px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    li {
      padding: 0 13px 0 14px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid @color-border;
      .left {
        display: flex;
        align-items: center;
        .bankIcon {
          width: 23px;
          height: 23px;
        }
        .bankName {
          margin-left: 13px;
          .name {
            font-size: @font-size-list;
            color: @color-txt;
          }
          .des {
            font-size: @font-size-tip;
            color: @color-txt-1;
            margin-top: 4px;
          }
        }
      }
      .right {
        .icon('icon_arrow',23px,23px);
      }
    }
    .addCard {
      justify-content: flex-start;
      span:nth-child(1) {
        .icon('icon_repayProcess07',23px,23px);
      }
      span:nth-child(2) {
        font-size: @font-size-list;
        color: @color-txt;
        margin-left: 13px;
      }
    }
  }
}
.chooseRepayTypeActive {
  bottom: 0;
}
.iphoneX {
  padding-bottom: @padding-iphonex;
}
</style>
