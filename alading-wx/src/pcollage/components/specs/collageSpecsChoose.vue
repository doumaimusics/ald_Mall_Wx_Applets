/**
* Created by xiejun on 2018/11/27.
* 拼团商品规格选择
*/
<template>
  <div class="collage-specs-choose" :class="{  'iphonex': isIphoneX, 'show':visible }">
    <div class="btn-close" @tap="onCloseTap"></div>
    <div class="goods-info">
      <div class="icon">
        <img :src="goodsInfo.goodsIcon" mode="aspectFill">
      </div>
      <div v-if="priceInfo" class="content">
        <div class="price">￥{{priceInfo.marketingPrice}}</div>
        <div v-if="allset" class="spec-info">
          <span class="stock">库存{{priceInfo.stock}}件</span>
          <span class="choose">已选 {{priceInfo.propertyValueNames}}</span>
        </div>
        <div v-else class="spec-info">{{priceInfo.tip}}</div>
        <div class="limit">{{limitInfo}}</div>
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
    </div>

    <!-- 埋 formId -->
    <form @submit="onFormSubmit" report-submit="true" >
      <button formType="submit" class="btn-ok" :class="{ 'empty': isGoodsCancel || allEmpty}">{{ btnSubmitName }}</button>
    </form>
  </div>
</template>

<script>
import specsChooseNode from './specsChooseNode'

import { mapMutations } from 'vuex'
import Tips from 'utils/tip'
import systemInfo from 'utils/systemInfo'

import Specs from './Specs'

export default {
  name: '',
  data() {
    return {
      emptyTip: '对应规格的商品不存在',
      chooseIds: {},
      enableIds: {}
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: true
    },
    submitName: {
      type: String,
      default: '发起拼团'
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
        let keys = this.propertyDataKeys.map(value => this.chooseIds[value]).join(',')
        info = this.priceData.find(value => value.propertyValueIds === keys)
      } else {
        info.marketingPrice = this.goodsInfo.marketingPrice

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
    // 已抢光
    allEmpty() {
      return Object.keys(this.enableIds).every(key => this.enableIds[key] === 0)
    },
    // 已下架
    isGoodsCancel() {
      if (!this.goodsInfo) return false
      return this.goodsInfo.goodsStatus === 'CANCEL'
    },
    // 按钮 submit名称
    btnSubmitName() {
      let name = this.submitName
      if (this.isGoodsCancel) {
        name = '已下架'
      } else if (this.allEmpty) {
        name = '已抢光'
      }
      return name
    },
    // 是否已经选择好了规格
    allset() {
      return this.propertyDataKeys.every(value => this.chooseIds[value] >= 0)
    },
    propertyDataKeys() {
      let keys = []
      this.propertyData.forEach(value => keys.push(value.propertyId))
      return keys
    },
    // 限拼次数
    limitInfo() {
      let info = '限拼' + this.goodsInfo.limitCount + '次'
      return info
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
    onFormSubmit(event) {
      this.formIdListPush(event.target.formId)
      this.onOkTap()
    },
    // 更新不可选择的规格项
    updateEnableIds(data = null) {
      this.enableIds = this.specs.update(data)
      if (this.allEmpty) this.$emit('empty')
    },
    initChooseIds() {
      if (!this.priceData.length) return
      this.specs = new Specs(this.priceData, this.propertyData)
      this.specs.init()
      this.chooseIds = this.specs.choose
      this.updateEnableIds()
      if (this.specs.isOnlyOne) this.sendChange()
    },
    sendChange() {
      let data = { allset: this.allset }
      let chooseSpecs = '请选择 规格'
      if (this.allset) {
        chooseSpecs = '已选：'
        if (this.priceInfo) {
          chooseSpecs += this.priceInfo.propertyValueNames
          data.saleAmount = this.priceInfo.marketingPrice
          data.goodsPriceName = this.priceInfo.propertyValueNames
          data.goodsSpecId = this.priceInfo.priceId
        }
      }
      data.chooseSpecs = chooseSpecs
      this.$emit('change', data)
    },
    onCloseTap() {
      this.$emit('close')
    },

    onNodeTap(data) {
      this.updateEnableIds(data)
      this.sendChange()
    },

    onOkTap() {
      if (this.isGoodsCancel || this.allEmpty) return
      if (this.allset) {
        if (this.priceInfo) {
          this.$emit('ok')
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

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@choose-height: 460px;
.collage-specs-choose {
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
    padding-right: @padding-h;
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
      // margin-right: 35px;
      width: 240px;
      height: 90px;

      color: @color-txt-1;
      font-size: @font-size-tip;
      .price {
        margin-top: 15px;
        margin-bottom: 15px;
        color: @color-price;
        font-size: @font-size-label;
      }
      .spec-info {
        margin-bottom: 9px;
        .flex-hor-center();
        .stock {
          margin-right: 11px;
        }
        .choose {
          color: #404040;
          .flex-n();
          .show-one-line();
        }
      }
    }
  }

  .specs-choose-list {
    margin-bottom: 10px;
    height: 274px;
    overflow-y: auto;
    .scroll();
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

    &.empty {
      background: #cccccc;
    }
  }
}
</style>