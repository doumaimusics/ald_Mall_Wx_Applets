/**
* Created by xiejun on 2018/11/27.
* 拼团商品规格选择
*/
<template>
  <div class="collage-buy-specs-choose" :class="{ 'show':visible, 'iphonex': isIphoneX }">
    <div class="btn-close" @tap="onCloseTap"></div>
    <div class="goods-info">
      <div class="icon">
        <img :src="goodsInfo.goodsIcon" mode="aspectFill">
      </div>
      <div v-if="priceInfo" class="content">
        <div class="price">￥{{priceInfo.actualAmount}}</div>
        <block v-if="allset">
          <div class="stock">库存{{priceInfo.stock}}件</div>
          <div class="specs">已选 {{priceInfo.propertyValueNames}}</div>
        </block>
        <div v-else class="tip">{{priceInfo.tip}}</div>
      </div>
      <div v-else class="content">
        <div class="empty-tip">{{emptyTip}}</div>
      </div>
    </div>
    <div class="specs-choose-list">
      <specs-choose-node 
      v-for="nodeData in propertyData"
      @tap="onNodeTap"
      :enableIds="enableIds"
      :chooseId="chooseIds[nodeData.propertyId]"
      :nodeData="nodeData"
      :key="nodeData.propertyId"/>
      
      <div class="amount">
        <span class="title">购买数量</span>
        <span class="limit"></span>
        <span class="btn-sub" @tap="onSubTap">-</span>
        <span class="num">{{goodsNum}}</span>
        <span class="btn-add" :class="{ 'disable':!btnAddEnable }" @tap="onAddTap">+</span>
      </div>
    </div>
    <!-- 埋 formId -->
    <form @submit="onFormSubmit" report-submit="true" >
      <button formType="submit" class="btn-ok" @tap="onOkTap">立即购买</button>
    </form>
  </div>
</template>

<script>
import specsChooseNode from './specsChooseNode'

import { mapMutations, mapActions } from 'vuex'
import Tips from 'utils/tip'
import systemInfo from 'utils/systemInfo'
export default {
  name: '',
  data() {
    return {
      emptyTip: '对应规格的商品不存在',
      chooseIds: {},
      enableIds: {},
      goodsNum: 1,
      btnAddEnable: true
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    goodsInfo: {
      type: Object,
      default: function() {
        return {}
      }
    },
    priceData: {
      type: Array,
      default: function() {
        return []
      }
    },
    propertyData: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    propertyDataList() {
      return this.propertyData.concat(this.propertyData)
    },
    // 选择的规格对应的价格，若没有选择好，则显示所有规格中价格最低的值
    priceInfo() {
      let info = {}
      if (this.allset) {
        let keys = ',' + this.propertyDataKeys.map(value => this.chooseIds[value]).join(',') + ','
        info = this.priceData.find(value => value.propertyValueIds === keys)
      } else {
        info.actualAmount = this.goodsInfo.saleAmount

        let tip = '请选择'
        this.propertyDataKeys.forEach((value, index) => {
          if (this.chooseIds[value] < 0) {
            tip += ' ' + this.propertyData[index].propertyName
          }
        })
        info.tip = tip
      }
      return info
    },
    // 已下架
    isGoodsCancel() {
      if (!this.goodsInfo) return false
      return this.goodsInfo.goodsStatus === 'CANCEL'
    },
    // 已抢光
    allEmpty() {
      return Object.keys(this.enableIds).length === 0
    },
    // 是否已经选择好了规格
    allset() {
      return this.propertyDataKeys.every(value => this.chooseIds[value] >= 0)
    },
    propertyDataKeys() {
      let keys = []
      this.propertyData.forEach(value => keys.push(value.propertyId))
      return keys
    }
  },
  created() {},
  mounted() {
    this.initChooseIds()
  },
  onShow() {},
  watch: {
    propertyDataKeys() {
      this.initChooseIds()
    }
  },
  methods: {
    ...mapMutations(['formIdListPush']),
    ...mapActions(['formIdListSubmit']),
    onFormSubmit(event) {
      this.formIdListPush(event.target.formId)
      this.formIdListSubmit()
    },
    // 清空可用规格项对应的数据
    clearEnableIds() {
      this.emptySpecs = null
      this.enableSpecs = null
    },
    // 更新不可选择的规格项
    udpateEnableIds() {
      // 找出有效的规格项列表
      if (!this.enableSpecs) {
        let specsIds = {}
        this.priceData.forEach(value => {
          if (value.stock) {
            let ids = value.propertyValueIds.split(',')
            ids.forEach(id => {
              if (id) specsIds[id] = 1
            })
          }
        })
        this.enableSpecs = specsIds

        this.emptySpecs = this.priceData
          .filter(value => value.stock === 0)
          .map(value => value.propertyValueIds.split(','))
          .filter(value => value.every(value => this.enableSpecs[value]))
      }

      let ids = { ...this.enableSpecs }
      if (this.emptySpecs.length) {
        // 存在库存为0的规格组合
        this.propertyDataKeys.forEach(value => {
          let chooseId = this.chooseIds[value]
          if (chooseId >= 0) {
            this.emptySpecs.forEach(list => {
              if (list.indexOf(chooseId) >= 0) {
                list.forEach(value => {
                  if (value !== chooseId && ids[value]) delete ids[value]
                })
              }
            })
          }
        })
      }
      this.enableIds = ids

      if (this.allEmpty) this.$emit('empty')
    },
    // 更新商品数量
    updateGoodsNum() {
      this.btnAddEnable = true
      if (this.allset) {
        if (this.goodsNum > this.priceInfo.stock) {
          this.setGoodsNum(this.priceInfo.stock)
        }
      }
    },
    setGoodsNum(value) {
      this.goodsNum = value
      this.btnAddEnable = true
      if (this.allset) {
        if (this.goodsNum >= this.priceInfo.stock) {
          this.goodsNum = this.priceInfo.stock
          this.btnAddEnable = false
        }
      }
    },
    initChooseIds() {
      if (this.priceData.length === 1) {
        // 只有一种规格
        let ids = {}
        this.propertyDataKeys.forEach(
          (value, index) => (ids[value] = this.propertyData[index].propertyValues[0].propertyValueId)
        )
        this.chooseIds = ids
      } else {
        let ids = {}
        this.propertyDataKeys.forEach(value => (ids[value] = -1))
        this.chooseIds = ids
      }
      this.goodsNum = 1
      this.clearEnableIds()
      this.udpateEnableIds()
    },
    onCloseTap() {
      this.$emit('close')
    },
    onNodeTap(data) {
      this.chooseIds[data.id] = data.valueId
      this.udpateEnableIds()
      this.updateGoodsNum()
    },
    onSubTap() {
      if (this.goodsNum > 1) {
        this.setGoodsNum(this.goodsNum - 1)
      }
    },
    onAddTap() {
      if (this.allEmpty) return
      if (!this.btnAddEnable) return
      this.setGoodsNum(this.goodsNum + 1)
    },
    onOkTap() {
      if (this.isGoodsCancel) {
        Tips.toast('已下架')
        return
      }
      if (this.allEmpty) {
        Tips.toast('已抢光')
        return
      }
      if (this.allset) {
        if (this.priceInfo) {
          let goodsSpec = {
            goodsIcon: this.goodsInfo.goodsIcon,
            goodsName: this.goodsInfo.goodsName,
            goodsId: this.goodsInfo.goodsId,
            goodsNum: this.goodsNum,
            speDetail: this.priceInfo.propertyValueNames,
            goodsSpecId: this.priceInfo.priceId,
            goodsPrice: this.priceInfo.actualAmount
          }
          this.$emit('ok', goodsSpec)
        } else {
          Tips.toast(this.emptyTip)
        }
      } else {
        Tips.toast(this.priceInfo.tip)
      }
    }
  },
  components: { specsChooseNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@choose-height: 460px;
.collage-buy-specs-choose {
  width: 100%;
  height: @choose-height;
  background: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;

  position: fixed;
  z-index: 20;
  left: 0;
  bottom: -@choose-height;
  transition: all 0.2s linear;

  &.iphonex {
    padding-bottom: @padding-iphonex;
    bottom: -@choose-height - @padding-iphonex;
  }

  &.show {
    bottom: 0;
  }

  .btn-close {
    position: absolute;
    right: 10px;
    top: 10px;
    .icon('icon_close_black', 20px, 20px);
  }

  .goods-info {
    .flex-hor-center();
    padding-top: 10px;
    padding-left: @padding-h;
    margin-bottom: 20px;
    box-sizing: border-box;
    .icon {
      width: 95px;
      height: 95px;
      margin-right: 10px;
      border-radius: 4px;
      overflow: hidden;
    }
    .content {
      .flex-n();
      color: @color-txt-1;
      font-size: @font-size-tip;
      height: 90px;
      margin-right: 35px;
      .price {
        margin-top: 15px;
        margin-bottom: 15px;
        color: @color-price;
        font-size: @font-size-label;
      }
      .stock {
        margin-bottom: 3px;
      }
      .specs {
        .show-two-line();
      }
      .empty-tip {
        margin-top: 40px;
        color: @color-warn;
      }
    }
  }

  .specs-choose-list {
    margin-bottom: 10px;
    height: 274px;
    overflow-y: auto;
    .scroll();

    .amount {
      margin-top: 62px;
      margin-bottom: 26px;
      .flex-hor-center();
      .padding-h(@padding-h);
      color: @color-txt;
      .title {
        font-size: @font-size-txt;
      }
      .limit {
        .flex-n();
      }
      .btn() {
        font-size: @font-size-btn-1;
        width: 34px;
        height: 30px;
        line-height: 28px;
        text-align: center;
        border: 1px solid @color-border;
        box-sizing: border-box;
      }
      @btn-radius: 1px;
      .btn-sub {
        .btn();
        border-top-left-radius: @btn-radius;
        border-bottom-left-radius: @btn-radius;
      }
      .btn-add {
        .btn();
        margin-left: -1px;
        border-top-right-radius: @btn-radius;
        border-bottom-right-radius: @btn-radius;

        &.disable {
          color: @color-txt-2;
        }
      }
      .num {
        margin-left: -1px;
        width: 38px;
        height: 30px;
        line-height: 28px;
        border: 1px solid @color-border;
        box-sizing: border-box;

        text-align: center;
        font-size: @font-size-btn;
      }
    }
  }

  .btn-ok {
    margin: auto;
    margin-bottom: 9px;
    width: 345px;
    height: 42px;
    line-height: 42px;
    border-radius: 21px;
    background: @color-btn;

    text-align: center;
    font-size: @font-size-btn;
    color: @color-txt;
  }
}
</style>