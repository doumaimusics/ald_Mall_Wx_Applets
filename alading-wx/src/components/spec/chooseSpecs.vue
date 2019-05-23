/**
* Created by xiejun on 2019/03/19.
* 规格选择
*/
<template>
  <div class="choose-specs" :class="[{ 'iphonex': isIphoneX }, { 'show':isShow }]">
    <div class="btn-close" @tap="onCloseTap"></div>
    <div v-if="hasSpecsData" class="content">
      <choose-specs-goods :goodsData="goodsData"/>
      <div class="choose-content">
        <choose-specs-node-list @tap="onNodeTap" :enableIds="enableIds" :chooseIds="chooseIds" :propertyData="propertyData"/>
        <choose-specs-count @change="onCountChange" :disable="menuDisable" :isAddEnable="isAddEnable" :count="count"/>
      </div>
      <div v-if="isTypeChoose" class="menu-list">
        <choose-specs-menu-node :type="colorAddType" title="加入购物车" @tap="onAdd" radiusType="left"/>
        <choose-specs-menu-node :type="colorBuyType" :title="btnBuyTxt" @tap="onBuy" radiusType="right"/>
      </div>
      <div v-else class="menu-list">
        <choose-specs-menu-node :type="colorBuyType" title="确定" @tap="onOk" />
      </div>
    </div>
  </div>
</template>

<script>
import chooseSpecsGoods from './chooseSpecsGoods'
import chooseSpecsNodeList from './chooseSpecsNodeList'
import chooseSpecsCount from './chooseSpecsCount'
import chooseSpecsMenuNode from './chooseSpecsMenuNode'

import Tips from 'utils/tip'
import systemInfo from 'utils/systemInfo'
import basis from 'utils/basis'
import Specs from './Specs'
export default {
  name: '',
  components: { chooseSpecsGoods, chooseSpecsNodeList, chooseSpecsCount, chooseSpecsMenuNode },
  data() {
    return {
      // 用户选择的id
      chooseIds: {},
      enableIds: {},
      specsInfo: {},
      count: 1,
      isGoodsEmpty: false
    }
  },
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    // 类型，用于区别底部按钮，规格选择(choose)，立即购买(buy)，加入购物车(addCart)
    type: {
      type: String,
      default: 'choose'
    },
    isGoodsCancel: {
      type: Boolean,
      default: false
    },
    btnBuyTxt: {
      type: String,
      default: '立即购买'
    },
    chooseSpecsData: {
      type: Object,
      default: function() {
        return null
      }
    }
  },
  computed: {
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    menuDisable() {
      return this.isGoodsCancel || this.isGoodsEmpty
    },
    isAddEnable() {
      if (this.chooseSpecsData && this.specsInfo) {
        let stock = this.specsInfo.stock
        let isEnable = stock && stock > this.count
        let goodsLimitNum = this.chooseSpecsData.goodsLimitNum
        if (isEnable) {
          if (goodsLimitNum < 0) return true
          return goodsLimitNum > this.count
        }
        return false
      }
      return false
    },
    colorAddType() {
      let type = '1'
      if (this.menuDisable) {
        type = '4'
      }
      return type
    },
    colorBuyType() {
      let type = '2'
      if (this.menuDisable) {
        type = '3'
      }
      return type
    },
    specsClsObj() {
      return {
        show: this.isShow
      }
    },
    hasSpecsData() {
      return this.chooseSpecsData
    },
    // 商品数据
    goodsData() {
      if (!this.hasSpecsData) return null
      let { price, icon } = this.chooseSpecsData
      if (this.specsInfo && this.specsInfo.goodsPriceMainUrl) icon = this.specsInfo.goodsPriceMainUrl
      return { price, icon, ...this.specsInfo }
    },
    propertyData() {
      if (!this.hasSpecsData) return null
      return this.chooseSpecsData.propertyData
    },
    isTypeChoose() {
      return this.type === 'choose'
    }
  },
  created() {
    this.initSpecs()
  },
  mounted() {},
  watch: {
    chooseSpecsData() {
      this.initSpecs()
    }
  },
  methods: {
    onCloseTap() {
      this.$emit('close')
    },
    onNodeTap(data) {
      this.enableIds = this.specs.select(data)
      this.chooseIds = this.specs.choose
      this.specsInfo = this.specs.specsInfo
      this.count = 1
      this.sendChange()
    },
    onCountChange(count) {
      if (this.specs.isAllset) {
        if (count > this.count) {
          if (this.isAddEnable) {
            this.count = count
          } else {
            Tips.toast('已到达限制数量/库存限制')
          }
        } else {
          if (count > 0) {
            this.count = count
          }
        }
      } else {
        Tips.toast(this.specsInfo.tip)
      }
    },
    sendChange() {
      let selectSpecsInfo = this.specs.selectSpecsInfo
      this.$emit('change', selectSpecsInfo)
    },
    onAdd() {
      this.sendConfirm('addCart')
    },
    onBuy() {
      this.sendConfirm('buy')
    },
    onOk() {
      this.sendConfirm(this.type)
    },
    sendConfirm(type) {
      if (this.menuDisable) return
      if (this.specs.isAllset) {
        this._type = type
        basis.clickThrottle(this.toSendConfirm)
      } else {
        Tips.toast(this.specsInfo.tip)
      }
    },
    toSendConfirm() {
      let goodsSpec = {
        goodsIcon: this.goodsData.icon,
        goodsName: this.chooseSpecsData.goodsName,
        goodsId: this.chooseSpecsData.goodsId,
        goodsNum: this.count,
        speDetail: this.specsInfo.propertyValueNames,
        goodsSpecId: this.specsInfo.priceId,
        goodsPrice: this.specsInfo.actualAmount
      }
      let type = this._type
      let data = { type, goodsSpec }
      this.$emit('confirm', data)
    },
    initSpecs() {
      if (this.hasSpecsData) {
        this.specs = new Specs(this.chooseSpecsData)
        this.specs.init()
        this.chooseIds = this.specs.choose
        this.enableIds = this.specs.nodes
        this.specsInfo = this.specs.specsInfo

        this.count = 1
        this.isGoodsEmpty = false
        this.sendChange()
        if (this.specs.hasChange) {
          this.isGoodsEmpty = this.specs.isEmpty
          this.$emit(this.specs.changeInfo)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
@choose-height: 460px;
@goods-height: 115px;
@menu-height: 65px;
.choose-specs {
  width: 100%;
  height: @choose-height;
  background: #fff;
  .radius-top(10px);

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

  .choose-content {
    padding-top: 10px;
    box-sizing: border-box;
    height: @choose-height - @goods-height - @menu-height;
    overflow-y: auto;
    .scroll();
  }

  .menu-list {
    margin-top: 10px;
    .flex-hor-center();
    .padding-h(@padding-h);
    box-sizing: border-box;
  }
}
</style>