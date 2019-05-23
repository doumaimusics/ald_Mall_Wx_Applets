/**
* Created by huangyilu on 2018/11/22.
* 助力砍价 商品详情
*/
<template>
  <div class="help-bargain-goods-detail" :class="{ 'set-fixed' : ruleShow || specShow || addressTCControl != -1 }" v-if="goodsData">
    <!-- 头部商品图轮播 -->
    <bargain-goods-swiper :goodsImgs="goodsData.goodsPics"/>

    <!-- 砍价商品信息 -->
    <div class="hbgd-info">
      <div class="hbgd-info__price">
        <span class="price-sale">
          <span>￥</span>0
        </span>
        <span class="price-real">￥{{ goodsData.saleAmount }}</span>
      </div>
      <div class="hbgd-info__title">
        <span class="title-tag">助力砍价</span>
        {{ goodsData.goodsName }}
      </div>
      <div class="hbgd-info__remarks">仅需{{ goodsData.targetNum }}人助力</div>
    </div>

    <!-- 用户砍价信息 轮播 -->
    <bargain-user-swiper :saleCount="goodsData.saleCount"/>

    <!-- 砍价规则 -->
    <bar-rule-item @sendRuleShowFn="getRuleShowFn"/>

    <!-- 商品规格 -->
    <div class="hbgd-spec">
      <spec-item />
      <div class="hbgd-spec__item">
        <div class="item-left">服务</div>
        <div class="item-center">正品保证 · 极速物流 · 售后无忧</div>
      </div>
    </div>

    <!-- 商品详情 -->
    <div class="hbgd-detail">
      <div class="hbgd-detail__title">
        <div class="title left">
          <span></span>
        </div>
        <div>商品详情</div>
        <div class="title right">
          <span></span>
        </div>
      </div>
      <div class="hbgd-detail__img">
        <div class="img-item" v-for="(item, i) in goodsData.goodsDetailList" :key="i">
          <image :src="item.picUrl" mode="widthFix"> </image>
        </div>
      </div>
    </div>

    <!-- footer -->
    <div class="hbgd-footer">
      <div class="hbgd-footer__left" @click="bindGoBackFn">更多免费商品</div>
      <div class="hbgd-footer__btn" v-if="goodsData.stockLessNum !== 0" @click="bindGetGoodsFn">免费领取</div>
      <div :class="[ 'hbgd-footer__btn', { 'stock-empty' : goodsData.stockLessNum === 0 }]"
            v-if="goodsData.stockLessNum === 0"
          >已抢光</div>
    </div>

    <!-- 选择收货地址 弹窗 -->
    <address-model v-if="addressTCControl!=-1  && goodsData "/>

    <!-- 商品规格 弹窗 -->
    <div v-if="specShow">
      <spec-model
        :specGoodsData="goodsData"
        :specPriceData="priceData"
        :specPropertyData="propertyData"
        @sendSelectGoodsInfo="getSelectGoodsInfo" />
    </div>

  </div>
</template>

<script>
import bargainGoodsSwiper from '../components/bargainGoodsDetail/barGoodsSwiper'
import bargainUserSwiper from '../components/bargainGoodsDetail/barUserSwiper'
import barRuleItem from '../components/bargainGoodsDetail/barRule'
import specModel from '../components/spec/index'
import specItem from '../components/spec/specItem'
import addressModel from '../components/address/address'
import { mapMutations, mapState, mapActions } from 'vuex'
import navigate from 'utils/navigate'
import Tips from 'utils/tip'
import conf from '../util/conf'
import maidian from 'utils/maidian'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      freeOrderGoodsId: 0,
      goodsData: null,
      priceData: null,
      propertyData: null,
      ruleShow: false
    }
  },
  props: {},
  computed: {
    ...mapState(['isLogin']),
    ...mapState('bargain', ['addressTCControl', 'bargainGoodsDetail', 'isSpecShow', 'addressList']),
    specShow() {
      return this.isSpecShow
    }
  },
  created() {},
  mounted() {},
  onLoad(options) {
    console.log(' onLoad freeOrderGoodsId = ', options.freeOrderGoodsId)
    if (options.freeOrderGoodsId) {
      this.freeOrderGoodsId = options.freeOrderGoodsId
      this.setBargainGoodsIdsData(options.freeOrderGoodsId)
    }
  },
  onUnload() {
    // 移除当前goodsId
    this.deleteBargainGoodsIdInIds()
    this.setAddressTCControl(-1)
    this.setIsSpecShow(false)
  },
  onShow() {
    this.getBargainIndexGoodsDetailData()
    // this.setUserAddressList(this.addressList)
    Monitor.pageShow()
  },
  onHide() {
    this.setAddressTCControl(-1)
    this.setIsSpecShow(false)
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onShareAppMessage(res) {
    maidian.click('kanjia_productdetail_share', this.goodsData.goodsName, this.goodsData.freeOrderGoodsId)
    return {
      path: '/pBargain/pages/bargainGoodsDetail?freeOrderGoodsId=' + this.freeOrderGoodsId
    }
  },
  watch: {},
  methods: {
    ...mapMutations('bargain', [
      'setBargainTabIndex',
      'setUserAddressList',
      'setAddressTCControl',
      'setIsSpecShow',
      'setBargainGoodsIdsData',
      'deleteBargainGoodsIdInIds',
      'setIsBargainHomeSped'
    ]),
    ...mapActions('bargain', ['getUserAddressList', 'getBargainIndexGoodsDetail', 'getBargainGoodsLimitInfo']),
    async getBargainIndexGoodsDetailData() {
      let data = await this.getBargainIndexGoodsDetail()
      this.goodsData = {
        freeOrderGoodsId: data.freeOrderGoodsId,
        goodsDetailList: data.goodsDetailList,
        goodsId: data.goodsId,
        goodsIcon: data.goodsIcon,
        goodsPics: data.goodsPics,
        goodsName: data.goodsName,
        targetNum: data.targetNum,
        saleAmount: data.saleAmount,
        saleCount: data.saleCount,
        // 剩余库存
        stockLessNum: data.stockLessNum
      }
      this.priceData = data.priceData
      this.propertyData = data.propertyData
      maidian.view('kanjia_productdetail', this.goodsData.goodsName, this.goodsData.freeOrderGoodsId)
      console.log(' bargainGoodsDetail == ', data)
    },
    // 接收 选择规格组件值 / 确认按钮
    getSelectGoodsInfo(data) {
      if (data) {
        let goodsData = {
          goodsSpec: data.goodsSpec,
          goodsInfo: data.goodsInfo
        }
        console.log(' getSelectGoodsInfo ', goodsData)
        this.setIsSpecShow(false)
        this.getUserAddressList()
      }
    },
    bindGetGoodsFn() {
      maidian.click('kanjia_productdetail_take', this.goodsData.goodsName, this.goodsData.freeOrderGoodsId)
      // 是否登录
      if (!this.isLogin) {
        navigate.push({ url: '/pages/common/login' })
        return
      }
      // 是否还能发起砍价
      this.getBargainGoodsLimitInfoData()
    },
    // 获取 商品限购信息
    getBargainGoodsLimitInfoData() {
      Tips.loading()
      this.getBargainGoodsLimitInfo({
        freeOrderGoodsId: this.goodsData.freeOrderGoodsId
      }).then(res => {
        let msgcode = conf.GOODSLIMITINFO[res.userGoodsStatus]
        switch (msgcode) {
          case 1:
            // 最终 可以发起砍价
            this.setIsBargainHomeSped(false)
            this.setIsSpecShow(true)
            Tips.loaded()
            break
          case 2:
            Tips.loaded()
            Tips.confirm(res.msg).then(() => {
              // 前往我的砍价
              navigate.reLaunch({ url: '/pBargain/pages/index' })
              this.setBargainTabIndex(3)
            })
            break
          case 3:
            Tips.loaded()
            Tips.toast(res.msg)
            break
          default:
            Tips.loaded()
        }
        return msgcode
      })
    },
    bindGoBackFn() {
      maidian.click('kanjia_productdetail_more', this.goodsData.goodsName, this.goodsData.freeOrderGoodsId)
      navigate.reLaunch({ url: '/pBargain/pages/index' })
      this.setBargainTabIndex(1)
    },
    getRuleShowFn(data) {
      this.ruleShow = data
    }
  },
  components: {
    bargainGoodsSwiper,
    bargainUserSwiper,
    barRuleItem,
    specItem,
    addressModel,
    specModel
  }
}
</script>

<style lang="less">
@import '../style/index.less';
.help-bargain-goods-detail {
  background-color: @color-bg;
  width: 100%;
  .hbgd-info {
    background-color: #ffffff;
    padding: 30 / @px;
    margin-bottom: 20 / @px;
    .hbgd-info__price {
      .price-sale {
        :first-child {
          font-size: 34 / @px;
          font-weight: 500;
        }
        color: @color-txt-price-3;
        font-size: 48 / @px;
        font-weight: 600;
        font-family: @font-family-price;
      }
      .price-real {
        color: @color-txt-666;
        font-size: 26 / @px;
        .line-through();
        margin-left: 10 / @px;
      }
    }
    .hbgd-info__title {
      height: 44 / @px;
      line-height: 44 / @px;
      font-size: 30 / @px;
      color: @color-txt;
      font-weight: 500;
      margin: 10 / @px 0;
      font-family: PingFangSC-Medium;
      .show-line(2);
      .title-tag {
        font-size: 22 / @px;
        text-align: center;
        padding: 4 / @px 12 / @px;
        line-height: 34 / @px;
        font-weight: 400;
        background: rgba(255, 213, 0, 1);
        border-radius: 10 / @px 0 / @px 10 / @px 0 / @px;
      }
    }
    .hbgd-info__remarks {
      font-size: 24 / @px;
      color: @color-txt-price-3;
    }
  }
  .hbgd-spec {
    margin: 20 / @px 0;
    .hbgd-spec__item {
      font-size: 26 / @px;
      display: flex;
      align-items: center;
      padding: 22 / @px 28 / @px;
      background-color: #ffffff;
      .item-left {
        color: @color-txt-999;
        margin-right: 30 / @px;
      }
      .item-center {
        .flex-n();
      }
      .item-right {
        .icon-arrow();
      }
    }
  }
  .hbgd-detail {
    margin-bottom: 100 / @px;
    .hbgd-detail__title {
      padding: 22 / @px 0;
      width: 100%;
      background-color: #ffffff;
      .flex-hor-center();
      .title {
        width: 75 / @px;
        height: 2 / @px;
        background-color: #dddddd;
        position: relative;
        &.left {
          margin-right: 20 / @px;
          span {
            right: 0;
          }
        }
        &.right {
          margin-left: 20 / @px;
          span {
            left: 0;
          }
        }
        span {
          position: absolute;
          width: 10 / @px;
          height: 10 / @px;
          border-radius: 50%;
          background-color: #d7d7d7;
          top: -3.5 / @px;
        }
      }
    }
    .hbgd-detail__img {
      .img-item {
        width: 100%;
        image {
          width: 100%;
        }
      }
    }
  }
  .hbgd-footer {
    position: fixed;
    height: 100 / @px;
    bottom: 0;
    width: 100%;
    z-index: 999;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    .hbgd-footer__left {
      .flex-hor-center();
      .flex-n();
    }
    .hbgd-footer__btn {
      .flex-n();
      height: 100 / @px;
      line-height: 100 / @px;
      text-align: center;
      font-size: 34 / @px;
      color: #000000;
      background: linear-gradient(137deg, rgba(255, 236, 0, 1) 0%, rgba(255, 213, 0, 1) 100%);
      &.stock-empty {
        background: #cccccc;
        color: #999999;
      }
    }
  }
}
</style>
