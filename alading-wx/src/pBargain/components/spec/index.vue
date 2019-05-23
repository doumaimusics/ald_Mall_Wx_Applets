/**
* Created by huangyilu on 2018/11/23.
* 规格选择 弹窗
*/
<template>
  <div :class="[ 'choose-spec-view']">
    <!-- 选择规格 文字 -->
    <!-- <spec-item v-if="isShowItem"/> -->
    <!-- 选择规格 弹窗 -->
    <div class="cs-model" @click.stop="closeFn">
      <div :class="['choose-spec__content', { 'iphonex-bottom': isIphoneX }]" @click.stop>
        <!--关闭按钮-->
        <div class="csc__close-icon" @click="closeFn"></div>
        <!-- 商品 -->
        <div class="csc__goods-info">
          <div class="goods-info__left">
            <img :src="selectGoodsIcon">
          </div>
          <div class="goods-info__right">
            <div class="git-top">￥{{ selectGoodsPrice }}</div>
            <div class="git-bottom">
              <div class="gir__stock" v-if="specAllselect">库存: {{ selectGoodsStock }}</div>
              <div class="gir__tips show_one_line">{{ tips }}</div>
            </div>
          </div>
        </div>
        <!-- 颜色 规格 -->
        <div class="csc__goods-spec" v-for="(witem,windex) in propertyData" :key="windex">
          <div class="goods-spec__title">{{ witem.propertyName }}</div>
          <div class="goods-spec__tags">
            <div
              class="gst__tag show_one_line"
              v-for="(item,index) in witem.propertyValues"
              :class="{ 'select': item.isSelect, 'out-of-stock': !item.isSpecStock } "
              @click.stop="specTapFn(windex, index, item.isSpecStock)"
              :key="index"
            >{{ item.propertyValueName }}</div>
          </div>
        </div>
        <!-- 购买数量 -->
        <div class="csc__goods-num">
          <div class="goods-num__title">购买数量
            <!-- 限购标志 -->
            <!-- <span class="goods-num__limit" v-if="goodsData.activityId !== 0">(限购{{ goodsData.limitedPurchase }}件)</span> -->
          </div>
          <div class="goods-num__btn">
            <!-- :class="{ 'disabled' : witem.number === 1 }" -->
            <div @click.stop="subtractionFn">-</div>
            <div>{{ orderNum }}</div>
            <!-- :class="{ 'disabled' : witem.number === 10 }" -->
            <div @click.stop="additionFn">+</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 确认按钮 -->
    <div
      :class="[ 'choose-spec__comfire-btn', { 'disabled': outOfStock }, { 'iphonex-btn-bottom': isIphoneX }]"
      @click.stop="comfSpecBtnFn"
    >{{ outOfStock ? '暂无库存' : '免费拿' }}</div>
  </div>
</template>

<script>
import specUtil from './specFormatData'
import systemInfo from 'utils/systemInfo'
import _ from 'lodash'
import specItem from './specItem'
import { mapMutations } from 'vuex'
import Tips from 'utils/tip'

export default {
  data () {
    return {
      winWidth: 0,
      goodsId: 0,
      userName: '',
      // 商品信息
      goodsData: null,
      // 全部规格
      priceData: null,
      // 可选规格
      propertyData: [],
      good_bigimg: [],
      // allselect: false,
      orderNum: 1,
      // 动画效果
      animationData: '',
      // 购买方式: 1-加购物车, 2-立即购买
      purchaseText: '立即购买'
    }
  },
  props: {
    isShowItem: {
      type: Boolean,
      default: true
    },
    specGoodsData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    specPriceData: {
      type: Array,
      default: () => {
        return []
      }
    },
    specPropertyData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    isIphoneX () {
      return systemInfo.isIphoneX
    },
    // 未选择规格时，显示 默认价钱
    prePrice () {
      return this.goodsData ? this.goodsData.saleAmount : ''
    },
    // 未选择规格时，显示 最大库存 （目前版本：未选择规格时，不显示库存）
    preStock () {
      let data = this.priceData ? _.maxBy(this.priceData, 'stock') : null
      return data ? data.stock : ''
    },
    // 已选规格 商品 价钱
    selectGoodsPrice () {
      return this.selectGoods && this.selectGoods.actualAmount
        ? this.selectGoods.actualAmount
        : this.prePrice
    },
    // 已选规格 商品 库存
    selectGoodsStock () {
      //   console.log(' selectGoodsStock == ', this.selectGoods)
      return this.selectGoods && this.selectGoods.stock
        ? this.selectGoods.stock
        : 0
    },
    // 切换规格图片
    selectGoodsIcon () {
      let icon = this.goodsData ? this.goodsData.goodsIcon : ''
      if (!this.selectGoods) return icon
      if (
        !_.isNull(this.selectGoods.goodsPriceMainUrl) &&
        this.selectGoods.goodsPriceMainUrl
      ) {
        icon = this.selectGoods.goodsPriceMainUrl
      }
      return icon
    },
    selectGoods () {
      if (this.specAllselect) {
        // console.log(' skuObj == ', this.skuObj)
        // console.log(' formatSelectGoodsInfo == ', specUtil.formatSelectGoodsInfo(this.skuObj, this.priceData))
        // 在 全部规格 里查询 已选规格 的价钱库存信息
        return specUtil.formatSelectGoodsInfo(this.skuObj, this.priceData)
      } else {
        return null
      }
    },
    // 筛选 已选择 的规格
    skuObj () {
      return this.propertyData
        ? this.propertyData.map(item => specUtil.formatStock(item))
        : ''
    },
    specAllselect () {
      return _.filter(this.skuObj, { hasselect: false }).length <= 0
    },
    // 筛选 某个属性 无库存
    noSkuId () {
      //   console.log(' noskuid == ', this.selectId)
      if (!this.selectId) {
        return
      }
      let allCombination = specUtil.formatAllSelectedCombIds(this.selectId)
      //   console.log('allCombination ==  ', allCombination)
      // 已选的属性 在 所有可能的组合中匹配 是否有 此属性值
      let after = allCombination.map(item =>
        specUtil.formatNoSkuIds(item, this.skuObj, this.allSkuArr)
      )
      return _.flattenDeep(after)
    },
    allIdObj () {
      if (!this.propertyData) {
        return
      }
      let arr = []
      this.propertyData.forEach(a => {
        a.propertyValues.forEach(b => {
          arr.push(b)
        })
      })
      return arr
    },
    // 所有选择的规格的ID
    selectId () {
      if (!this.propertyData) {
        return
      }
      let allArr = this.propertyData.slice(0)
      allArr.map(a => {
        return _.map()
      })
      let isSelectObj = _.filter(this.allIdObj, { isSelect: true })
      return _.map(isSelectObj, 'propertyValueId')
    },
    // 所有可能的 属性组合
    allSkuArr () {
      if (!this.priceData) {
        return
      }
      return this.priceData.map(a => {
        return _.compact(a.propertyValueIds.split(',')).join(',')
      })
    },
    // 无库存 false 是有库存 true 无库存 isSale 是否上架
    outOfStock () {
      //   console.log(' outOfStock ===== ', this.selectGoods)
      if (this.selectGoods && this.selectGoods.stock !== undefined) {
        if (this.selectGoods.isSale === 'Y' && this.selectGoods.stock !== 0) {
          return false
        } else if (
          this.selectGoods.isSale !== 'Y' &&
          this.selectGoods.stock !== 0
        ) {
          return true
        } else {
          return true
        }
      } else if (this.specAllselect && this.selectGoods === undefined) {
        return true
      } else {
        return false
      }
    },
    tips () {
      if (!this.specAllselect) {
        let unSelected = _.filter(this.skuObj, { hasselect: false })
        return '请选择 ' + _.map(unSelected, 'name').join(' ')
      } else {
        return '已选 ' + _.map(this.skuObj, 'selectname').join(' ')
      }
    }
  },
  created () {
    console.log(' spec goodsData == ', this.specGoodsData)
    this.goodsData = this.formatGoodsInfo(this.specGoodsData)
    this.priceData = this.specPriceData
    this.getPropertyData(this.specPropertyData)
    // console.log(' get goodsData ', this.goodsData)
    // console.log(' get priceData ', this.priceData)
  },
  mounted () {
    console.log(' mounted spec ')
  },
  watch: {
    selectId () {
      setTimeout(() => {
        let noSkuId = this.noSkuId.slice(0)
        // console.log(' ==== noSkuId == ', this.noSkuId)
        this.propertyData.forEach(witem => {
          //   console.log(' propertyData == ', witem)
          witem.propertyValues.forEach(item => {
            // console.log(' propertyValues == ', item)
            // console.log(' noSkuId.indexOf(item.propertyValueId) == ', noSkuId.indexOf(item.propertyValueId))
            if (noSkuId.indexOf(item.rid) === -1) {
              item.isSpecStock = true
            } else {
              item.isSpecStock = false
            }
          })
        })
      }, 0)
    }
  },
  methods: {
    ...mapMutations('bargain', ['setIsSpecShow', 'setSelectGoodsSpec']),
    formatGoodsInfo (item) {
      return {
        goodsId: item.goodsId,
        goodsIcon: item.goodsIcon,
        goodsPics: item.goodsPics,
        saleAmount: 0,
        realAmount: item.priceAmount,
        goodsName: item.goodsName,
        saleCount: item.saleCount,
        goodsDetail: item.goodsDetail
      }
    },
    getPropertyData (data) {
      data.forEach(witem => {
        // 添加控制新字段 isSelect -- 是否选择 isSpecStock -- true该规格属性存在 有库存
        this.propertyData.push({
          propertyId: witem.propertyId,
          propertyName: witem.propertyName,
          propertyValues: witem.propertyValues.map(item =>
            specUtil.formatSpecPropertyValues(item)
          )
        })
      })
    },
    // 规格属性 点击事件
    specTapFn (windex, index, isSpecStock) {
      if (isSpecStock) {
        let proValue = this.propertyData[windex].propertyValues
        if (proValue[index].isSpecStock) {
          if (proValue[index].isSelect) {
            proValue[index].isSelect = false
          } else {
            proValue.forEach(item => {
              item.isSelect = false
            })
            proValue[index].isSelect = true
          }
        }
      }
    },
    closeFn () {
      this.setIsSpecShow(false)
    },
    comfSpecBtnFn () {
      if (!this.goodsData || this.outOfStock) {
        return
      }
      if (!this.specAllselect) {
        Tips.toast('请选择规格')
        return
      }
      console.log(' this.selectGoods === ', this.selectGoods)
      let selectData = {
        goodsIcon: this.goodsData.goodsIcon,
        goodsName: this.goodsData.goodsName,
        goodsId: this.goodsData.goodsId,
        goodsNum: this.orderNum,
        speDetail: _.map(this.skuObj, 'selectname').join(' '),
        goodsSpecId: this.selectGoods.rid,
        goodsPrice: this.selectGoodsPrice
      }
      this.$emit('sendSelectGoodsInfo', {
        specChooseInfo: selectData,
        goodsInfo: this.goodsData
      })
      this.setSelectGoodsSpec(selectData)
      // this.
    },
    // 减 数量
    subtractionFn () {
      if (!this.specAllselect) {
        Tips.toast('请选择规格')
        return
      }
      if (this.orderNum > 1) {
        this.orderNum--
      }
    },
    // 加 数量
    additionFn () {
      if (!this.specAllselect) {
        Tips.toast('请选择规格')
        return
      }
      let limit = 99
      let selectGoodsStock = this.selectGoods.stock
      // 如果规格的库存<99 limit = 库存
      if (selectGoodsStock < 99) {
        limit = selectGoodsStock
      }
      if (this.goodsData.activityId !== 0) {
        // 如果规格的库存<限购数 limit = 库存
        if (selectGoodsStock < this.goodsData.limitedPurchase) {
          limit = +selectGoodsStock
        } else {
          limit = +this.goodsData.limitedPurchase
        }
      }
      if (this.orderNum < limit) {
        this.orderNum++
      }
    }
  },
  components: { specItem }
}
</script>

<style lang="less" scoped>
@import "./spec.less";
// 选择产品规格
.choose-spec-view {
  .cs-model {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    z-index: 1000;
  }
  .choose-spec__content {
    padding: 30 / @px 4%;
    padding-bottom: 150 / @px;
    overflow: scroll;
    width: 92%;
    background: #fff;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1002;
    transition: all 0.2s linear;
    border-top-left-radius: 20 / @px;
    border-top-right-radius: 20 / @px;
    &.iphonex-bottom {
      padding-bottom: 119px !important;
    }
    .csc__close-icon {
      position: absolute;
      right: 2.5%;
      top: 2.5%;
      .icon("icon_close_black@2x", 40 / @px, 40 / @px);
    }
    .csc__goods-info {
      display: flex;
      margin-bottom: 15 / @px;
      .goods-info__left {
        width: 190 / @px;
        height: 190 / @px;
      }
      .goods-info__right {
        font-family: PingFangSC-Light;
        margin-left: 25 / @px;
        font-size: 24 / @px;
        .git-top {
          font-size: 34 / @px;
          color: @color-txt-price;
          padding-top: 35 / @px;
        }
        .git-bottom {
          margin-top: 30 / @px;
          font-size: 24 / @px;
          .gir__stock {
            color: @color-txt-666;
            max-width: 500 / @px;
          }
          .gir__tips {
            color: @color-txt-40;
            max-width: 500 / @px;
            margin-top: 5 / @px;
          }
        }
      }
    }
    // 规格
    .csc__goods-spec {
      padding-bottom: 26 / @px;
      font-family: PingFangSC-Light;
      color: @color-txt;
      .goods-spec__title {
        font-size: 28 / @px;
        margin-top: 10 / @px;
      }
      .goods-spec__tags {
        display: flex;
        flex-wrap: wrap;
        margin-top: 7.5 / @px;
        margin-left: -18 / @px;
        .gst__tag {
          max-width: 500 / @px;
          height: 56 / @px;
          padding: 0 28 / @px;
          line-height: 56 / @px;
          margin-left: 20 / @px;
          background-color: @color-bg;
          box-sizing: border-box;
          border-radius: 4 / @px;
          margin-top: 10 / @px;
          color: @color-txt;
          font-size: 26 / @px;
          &.select {
            background: @color-btn;
            border-color: @color-btn;
          }
          &.out-of-stock {
            background: @color-bg;
            color: @color-txt-B0;
          }
        }
      }
    }
    .csc__goods-num {
      display: flex;
      margin-top: 10 / @px;
      align-items: center;
      color: @color-txt;
      .goods-num__title {
        flex: 1;
        font-size: 26 / @px;
      }
      .goods-num__limit {
        color: @color-txt-price;
      }
      .goods-num__btn {
        text-align: center;
        display: flex;
        border: 1 / @px solid #e4e4e4;
        border-radius: 2 / @px;
        font-family: PingFangSC-Light;
        div {
          min-width: 60 / @px;
          height: 60 / @px;
          line-height: 60 / @px;
        }
        div:nth-child(1) {
          font-size: 32 / @px;
          border-right: 1 / @px solid #e4e4e4;
        }
        div:nth-child(1).disabled,
        div:nth-child(3).disabled {
          opacity: 0.5;
        }
        div:nth-child(2) {
          font-size: 34 / @px;
          min-width: 45 / @px;
          padding: 0 20 / @px;
        }
        div:nth-child(3) {
          border-left: 1 / @px solid #e4e4e4;
        }
      }
    }
  }
  .choose-spec__comfire-btn {
    height: 84 / @px;
    line-height: 84 / @px;
    width: 92%;
    left: 4%;
    text-align: center;
    color: #000000;
    font-size: 34 / @px;
    position: fixed;
    bottom: 20 / @px;
    z-index: 10003;
    border-radius: 43 / @px;
    background: linear-gradient(
      136deg,
      rgba(255, 236, 0, 1) 0%,
      rgba(255, 213, 0, 1) 100%
    );
    &.disabled {
      background: #dfdfdf;
      color: #fff;
    }
    &.iphonex-btn-bottom {
      bottom: 44px;
    }
  }
}
</style>


