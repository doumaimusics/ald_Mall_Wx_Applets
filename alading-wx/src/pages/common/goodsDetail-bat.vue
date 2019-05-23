/**
* Created by huangyilu on 2018-10-11.
* 商品详情
*/
<template>
  <div :class="['goods-details-view ', {'set-fixed': couponShow }]" v-if="goodsDetailData">
    <!-- swiper -->
    <ala-swiper :picImgs="goodsInfo.goodsPics" />

    <!-- activityType: 1促销商品 2秒杀商品 3折扣商品 -->
    <!-- 秒杀活动商品倒计时 -->
    <div class="goods-details__pinfo" v-if=" goodsInfo.activityId !== 0 && goodsInfo.activityType === 2 && activityPStart" >
      <div :class="['gdp__price']" >
        <span>￥</span>
        <span>{{ goodsInfo.specialPrice }}</span>
        <span>￥{{ goodsInfo.saleAmount }}</span>
      </div>
      <div :class="['gdp__offer-price']" >
        <div class="gdp__op-text">
          <div> {{ activityTimer.txt }} </div>
          <div> {{ activityTimer.d ? activityTimer.d : '' }} <span>{{ activityTimer.h }}</span> : <span>{{ activityTimer.m }}</span> : <span>{{ activityTimer.s }}</span></div>
        </div>
      </div>
    </div>
    <!-- 普通商品价钱 -->
    <div class="goods-details__msg">
      <div class="gdm__price" v-if="goodsInfo.activityType !== 2 && !activityPStart" >
        ￥{{ goodsInfo.activityId === 0 ? goodsInfo.saleAmount : goodsInfo.specialPrice }}
        <span class="txt-decoration-line-through" >￥{{ goodsInfo.activityId === 0 ? goodsInfo.priceAmount : goodsInfo.saleAmount  }}</span>
      </div>
      <!-- 商品标题 -->
      <div class="gdm__title">{{ goodsInfo.goodsName }}</div>
      <!-- 商品副标题 -->
      <div class="gdm__remark-title" v-if="goodsInfo.remark" >{{ goodsInfo.remark }}</div>
      <!-- 快递 销量-->
      <div class="gdm__fitem flex" >
        <div class="gdm__fitem-cell">快递：{{ freight }}</div>
        <div class="gdm__fitem-right">销量：{{ goodsInfo.saleCount }}件</div>
      </div>
      <!-- 领券 -->
      <div class="gdm__fitem flex" v-if="couponList.length > 0 && goodsInfo.activityType !== 2" @click="couponFn">
        <div class="gdm__fitem-tit">领券</div>
        <div class="gdm__fitem-m flex-1">
          <span v-for="(cptit, cpi) in couponTitle" :key="cpi" v-if="cpi <= 2" > {{ cptit }} </span>
        </div>
        <div class="arrow"></div>
      </div>
      <!-- 秒杀商品 领券模块 此价格不与优惠券同享 -->
      <div class="gdm__fitem flex" v-if=" goodsInfo.activityId !== 0 && goodsInfo.activityType === 2 && activityPStart ">
        <div class="gdm__fitem-tit">领券</div>
        <div class="gdm__fitem-right flex-1">
          <div class="gdm__ac-item" >
            <span>限制</span>此价格不与优惠券同享
          </div>
        </div>
      </div>
      <!-- 其他活动文案 -->
      <div class="gdm__fitem flex" v-if="activityMsgList.length > 0 || goodsInfo.activityType === 3">
        <div class="gdm__fitem-tit">活动</div>
        <div class="gdm__fitem-right flex-1">
          <!-- 折扣商品 文案 -->
          <div :class="['gdm__ac-item', { 'top': activityMsgList.length >= 1 }]" v-if="goodsInfo.activityType === 3" >
            <span>折扣</span>
            {{ goodsInfo.discount }}折可与满减活动同时享用
          </div>
          <div v-for="(acitem, aci) in activityMsgList"
          :key="index"
          :class="['gdm__ac-item', { 'top': aci === 0 && activityMsgList.length > 1 }]">
            <!-- <span>{{ acitem.activityType }}</span>  -->
            <img :src=" acitem.icon " alt="">
            <div class="show_one_line">{{ acitem.describe }}</div>
          </div>
        </div>
      </div>
      <div class="gdm__ad flex">
        <div class="gdm__ad-item flex-1 flex"> <div class="icon"></div> <div>官方直采</div> </div>
        <div class="gdm__ad-item flex-1 flex"> <div class="icon"></div> <div>极速购物</div> </div>
        <div class="gdm__ad-item flex-1 flex"> <div class="icon"></div> <div>售后无忧</div> </div>
      </div>
    </div>
    <!-- 规格选择 -->
    <div class="goods-details__choose-spe" @click="specShowFn">
      <div class="gdcs__left" v-if="">已选</div>
      <div class="gdcs__right" >
        <!-- {{ specTitle }} -->
          <div >请选择规格</div>
          <div class="arrow"></div>
      </div>
    </div>
    <!-- 推荐商品 -->
    <div class="goods-details__recommend" v-if="recommonList.length > 0 && similarList.length > 0" >
      <ala-tabs :tabIndex="tabIndex" :tabTitles="tabTitles" @sendTabIndex="getTabIndex" />
      <!-- 为你推荐 -->
      <div class="gdr__content" v-show="tabIndex === 1">
        <ala-goods-list :list="recommonList" ></ala-goods-list>
      </div>
      <!-- 同类排行 -->
      <div class="gdr__content" v-show="tabIndex === 2">
        <ala-goods-list :list="similarList" ></ala-goods-list>
      </div>
    </div>
    <!-- 商品详情图 -->
    <div class="goods-details__goods-img"><img v-for="(item, index) in goodsInfo.goodsDetail " :key="index" :src="item.picUrl" mode="widthFix" /> </div>

    <!-- 商品已售完提示/商品下架提示 -->
    <div class="goods-none__tip" v-if="goodsInfo.stockCount === null">当前库存已售完。正在补货中，先去看看别的吧</div>
    <div class="goods-none__tip" v-if="goodsInfo.status === 'CANCEL'">商品已下架，看看别的吧~</div>

    <!-- 立即购买 -->
    <!-- <div :class="['goods-details__foot flex ', {'iphonex-bottom': isIphoneX }]" >
      <div class="gdf__left" @click="goHomeFn">
        <div class="gdf__home-icon"></div>返回首页
      </div>
      <div class="gdf__right flex-1" @click="buyBtnFn">
        <div :class="{ 'out-of-stock': goodsInfo.stockCount === null || goodsInfo.status === 'CANCEL' }"> {{ buyBtnTxt }}</div>
      </div>
    </div> -->

    <!-- menu -->
    <menu-goods @add="onMenuAdd" @buy="onMenuBuy"/>

    <!-- 领券 弹窗 -->
    <div class="over-model" v-if="couponShow && couponList.length > 0" @click.stop="couponShow=false">
      <div :class="['goods-details__coupon', { 'ihponex': isIphoneX }]" @click.stop="">
        <div class="gdc__title">领取优惠</div>
        <div :class="['gdc-cooupon-view', { 'iphonex': isIphoneX }]" >
          <div class="gdc-cooupon__item" v-for="(item, index) in couponList" :key="index">
            <ala-coupon-item :coupon="item" />
            <!-- 获取优惠券 按钮 -->
            <div class="gdc-info__btn" @click="getCouponFn(item.couponId, item.isGot, item.isAllGot, index)">
              <div :class="['get-btn ', {'btn-gray': item.isGot }]" v-if="!item.isAllGot">{{ item.isGot ? '已领取' : '立即领取' }}</div>
              <div :class="['get-btn ', 'btn-gray']" v-else >已领完</div>
            </div>
          </div>
        </div>
        <div :class="['gdc__com-btn', {'gdc__iphonex-bottom': isIphoneX}]" @click="couponShow=false">完成</div>
      </div>
    </div>

    <!-- 规格选择 弹窗 -->
    <div class="over-model" v-if="specShow">
      <ala-choose-specs
      ref="specs"
      @sendCloseSpecs="closeSpecsFn"
      @sendSelectGoodsInfo="getSelectGoodsInfo"
      @sendFormidFn="getFormIdFn"
      :Base64GoodsInfo="goodsInfo"
      :Base64PriceData="priceData"
      :Base64PropertyData="propertyData" />
    </div>

  </div>
</template>

<script>
// import wx from 'wx'
import alaSwiper from 'components/alaUI/ala-swiper'
import alaGoodsList from 'components/goodsList/goods-simple-list'
import alaCouponItem from 'components/coupon/coupon-item'
import alaChooseSpecs from 'components/spec/choose-spec'
import alaTabs from 'components/tabs/tabs'

import menuGoods from 'components/menu/menuGoods'

import systemInfo from 'utils/systemInfo'
import basis from 'utils/basis'
import util from 'utils/index'
import goodsTool from 'utils/goodsTool'
import Tips from 'utils/tip'
import navigate from 'utils/navigate'
import storage from 'utils/storage'
import maidian from 'utils/maidian'

import _ from 'lodash'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      tabIndex: 1,
      tabTitles: ['为你推荐', '同类排行'],

      buyBtnTxt: '立即购买',

      // 存放 formid
      formids: [],
      // 规格信息
      specShow: false,
      // 所选规格
      specChooseInfo: null,
      specsDataParent: null,
      couponTitle: '',
      // 商品信息
      goodsInfo: {},
      // 可选规格
      priceData: [],
      // 全部规格
      propertyData: [],
      // 活动文案列表
      activityMsgList: [],

      goodsList: [],
      couponShow: false,
      couponList: [],

      // 秒杀活动倒计时
      activityTimer: {},
      // 秒杀是否开始
      activityStart: false,
      // 秒杀预告是否开始
      activityPStart: false,
      // 倒计时 key
      countTimeKey: '',
      // 分享信息
      shareConfig: {},

      // 商品详细数据
      goodsDetailData: null
    }
  },
  props: {},
  computed: {
    ...mapState([]),
    ...mapGetters(['userId', 'userName', 'isLogin', 'goodsId']),
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    // 运费
    freight() {
      return this.goodsInfo.freightExplanation ? this.goodsInfo.freightExplanation : '包邮'
    },
    // 规格title
    specTitle() {
      if (!this.specChooseInfo) {
        return '请选择规格'
      } else {
        return '已选 ' + this.specChooseInfo.speDetail
      }
    },
    // 为你推荐
    recommonList() {
      if (!this.goodsDetailData) return []
      // console.log(' recommonList == ', this.goodsDetailData.recommonList)
      return this.goodsDetailData.recommonList ? this.goodsDetailData.recommonList : []
    },
    // 同类排行
    similarList() {
      if (!this.goodsDetailData) return []
      // console.log(' similarList == ', this.goodsDetailData.similarList)
      return this.goodsDetailData.similarList ? this.goodsDetailData.similarList : []
    }
  },
  created() {},
  mounted() {},
  onLoad(options) {
    console.log(' -- goodsdetail onload -- ', options)
    if (options.goodsId) {
      this.goodsId = options.goodsId
      this.setGoodsIdsData(options.goodsId)

      // 更新源
      if (options.lc) {
        this.setLocationCode(options.lc)
      }
    }
    // 埋点
    maidian.shop(maidian.spm.shop_detail)
  },
  // 小程序生命周期 页面卸载
  onUnload() {
    // 移除当前goodsId
    this.deleteGoodsIdInIds()
    // 上传 formId
    if (this.formids.length > 0) {
      this.uploadFormId()
    }
    // 清除 计时器
    basis.clearCountdown(this.countTimeKey)
    this.tabIndex = 1
    this.buyBtnTxt = '立即购买'
    if (this.activityPStart) this.activityPStart = false
    if (this.specShow) this.specShow = false
    if (this.couponShow) this.couponShow = false
    // this.goodsDetailData = null
  },
  onHide() {
    // 清除 计时器
    basis.clearCountdown(this.countTimeKey)
    this.tabIndex = 1
    this.buyBtnTxt = '立即购买'
    if (this.activityPStart) this.activityPStart = false
    if (this.specShow) this.specShow = false
    if (this.couponShow) this.couponShow = false
    // this.goodsDetailData = null
    Monitor.pageHide()
  },
  onShow() {
    console.log('on show', storage.props.launchOptions.query)
    this.goodsDetailData = null
    // 从模版消息 等其他地方进入时
    if (storage.props.launchStatus === 0) {
      let options = storage.props.launchOptions
      if (options && options.query.goodsId) {
        this.setGoodsIdsData(options.query.goodsId)

        // 清空一下
        options.query = {}
        storage.props.launchOptions = options
      }
    }
    this.getGoodsDetail()
    Monitor.pageShow()
  },
  onError() {
    Monitor.pageError()
  },
  // 小程序分享事件
  onShareAppMessage(options) {
    return {
      title: this.shareConfig.shareAppTitle,
      // imageUrl: this.shareConfig.miniProgramWebpageUrl,
      path: '/pages/common/goodsDetail?goodsId=' + this.goodsId,
      success: function(res) {
        // 转发成功
        // Tips.toast('分享成功！')
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  watch: {},
  methods: {
    ...mapMutations([
      'setGoodsIdsData',
      'setCurrentTabbarIndex',
      'deleteGoodsIdInIds',
      'setGoodsDetailData',
      'setLocationCode'
    ]),
    ...mapActions([
      'getGoodsDetailData',
      'getGoodsSpecData',
      'getCollectCouponListData',
      'collectCoupon',
      'submitFormId',
      'setConfirmGoodsData',
      'postMaidianInfo'
    ]),
    async uploadFormId() {
      let data = await this.submitFormId({ formId: this.formids.join(',') })
      console.log('submitFormId ', data)
    },
    async getGoodsDetail() {
      let detailData = await this.getGoodsDetailData()
      await this.getGoodsSpec()
      this.goodsDetailData = detailData
      this.goodsInfo = goodsTool.format(this.goodsDetailData)
      this.shareConfig = this.goodsDetailData.shareConfig
      this.activityMsgList = _.filter(this.goodsDetailData.activityMessageList, p => {
        return p.activityType !== 'REDUCE'
      })
      // 只有秒杀商品才计算倒计时
      if (this.goodsInfo.activityType === 2) {
        this.activityCountdown()
      }
      // 除了秒杀商品/店铺商品 不取优惠券
      if (this.goodsInfo.activityType !== 2 || this.goodsInfo.shopName !== null) {
        // 获取优惠券列表
        this.getCollectCouponList()
      }
      console.log(' activityPStart ', this.activityPStart)
    },
    async getGoodsSpec() {
      let data = await this.getGoodsSpecData()
      this.priceData = data.priceData
      this.propertyData = data.propertyData
    },
    async getCollectCouponList() {
      let data = await this.getCollectCouponListData()
      if (data.couponList !== null) this.couponList = data.couponList
      let title = []
      this.couponList = this.couponList.map(a => {
        if (a.type === 'DISCOUNT') {
          title.push('满' + a.limitAmount + '享' + Number(a.discount * 10).toFixed(1) + '折')
        } else if (a.limitAmount) {
          title.push('满' + a.limitAmount + '减' + a.amount)
        }
        let isAllGot = false
        // 如果券已全部领取完毕 false 未领完 true 已领完
        if (a.quotaAlready >= a.quota) {
          isAllGot = true
        }
        return Object.assign(
          {},
          a,
          { collapse: false },
          basis.formatTimestampToDays(a.gmtEnd),
          { date: util.formatDate(a.gmtEnd) },
          { isGot: a.userAlready >= a.limitCount },
          { isAllGot: isAllGot },
          { discount: (a.discount * 10).toFixed(1) },
          { isAmountSamall: a.amount > 99 || toString(a.amount).length >= 3 },
          // 是否排除已过期/已使用的优惠券
          { isExclude: false }
        )
      })
      // 去重
      this.couponTitle = _.uniq(title)
    },
    // 计时转换
    countTime(count, txt) {
      let oneday = 24 * 60 * 60
      let d = Math.floor(count / (60 * 60 * 24)) + '天'
      let modulo = count % (60 * 60 * 24)
      let h = Math.floor(modulo / (60 * 60))
      modulo = modulo % (60 * 60)
      let m = Math.floor(modulo / 60)
      let s = modulo % 60
      h = basis.pad0Start(h + '')
      m = basis.pad0Start(m + '')
      s = basis.pad0Start(s + '')
      if (count > oneday) {
        return { txt, d, h, m, s }
      } else {
        return { txt, h, m, s }
      }
    },
    // 活动商品 倒计时
    activityCountdown() {
      let startDate = new Date(this.goodsInfo.gmtStart)
      let pstartDate = new Date(this.goodsInfo.gmtPstart)
      let endDate = new Date(this.goodsInfo.gmtEnd)
      let nowDate = new Date()
      let countData = ''
      let txt = ''
      // 预告 是否开始 // 或者没有预告时间
      if (nowDate >= pstartDate || pstartDate === 0) {
        this.activityPStart = true
      } else {
        this.activityPStart = false
        return
      }
      // 活动 是否结束
      if (nowDate >= endDate) {
        this.activityTimer = {
          txt: '活动已结束',
          d: '00',
          h: '00',
          m: '00',
          s: '00'
        }
        return
      }
      // 距离开始时间/活动结束时间 倒计时
      if (startDate - nowDate >= 0) {
        countData = startDate
        txt = '距开始'
        this.buyBtnTxt = '即将抢购'
      } else {
        this.activityStart = true
        countData = endDate
        txt = '距结束仅剩'
        this.buyBtnTxt = '立即购买'
      }
      let duration = parseInt((countData - nowDate) / 1000)
      let key = basis.countdown(duration, {
        timer: data => {
          this.activityTimer = this.countTime(data.last, txt)
          console.log(' this.activityTimer ', this.activityTimer)
        },
        complete: () => {
          // 倒计时结束
          this.getGoodsDetail()
        }
      })
      this.countTimeKey = key
      console.log('key', this.countTimeKey)
    },
    // 优惠券弹窗
    couponFn() {
      this.couponShow = true
    },
    // 规格弹窗
    specShowFn() {
      if (!this.isLogin) {
        navigate.push({ url: '/pages/common/login' })
        return
      }
      this.specShow = true
    },
    // 关闭规格弹窗
    closeSpecsFn() {
      this.specShow = false
    },
    // 接收 领取优惠券组件值
    async getCouponFn(couponId, isGot, isAllGot, index) {
      if (!this.isLogin) {
        navigate.push({ url: '/pages/common/login' })
        return
      }
      if (isGot || isAllGot) {
        return
      }
      let data = await this.collectCoupon({ couponId: couponId })
      if (data) {
        this.getCollectCouponList()
        Tips.toast('领取成功!')
      }
      console.log('getcoupon data ', data)
    },
    // 接收 选择规格组件值 / 确认按钮
    getSelectGoodsInfo(data) {
      this.specChooseInfo = data
      if (this.specChooseInfo) {
        // 确认订单页
        let goodsData = {
          goodsSpec: this.specChooseInfo,
          goodsInfo: this.goodsInfo
        }
        console.log(' getSelectGoodsInfo ', goodsData)
        this.setConfirmGoodsData(goodsData)
        navigate.push({ url: '/pages/common/orderConfirm?clearAvCoupon=true' })
      }
    },
    // 切换 为你推荐/同类排行
    getTabIndex(data) {
      this.tabIndex = data.tabIndex
      switch (data.tabIndex) {
        case 1:
          maidian.shop(maidian.spm.detail_commend)
          break
        case 2:
          maidian.shop(maidian.spm.detail_similar)
      }
    },
    getFormIdFn(data) {
      this.formids.push(data)
      console.log(' this.formisd  ', this.formids)
    },
    // 加入购物车
    onMenuAdd() {
      if (!this.isLogin) {
        navigate.push({ url: '/pages/common/login' })
        return
      }
      this.specShow = true
    },
    // 立即购买
    onMenuBuy() {
      if (!this.isLogin) {
        navigate.push({ url: '/pages/common/login' })
        return
      }
      if (this.buyBtnTxt === '即将抢购') {
        Tips.toast('活动未开始')
        return
      }
      this.specShow = true
    }
  },
  components: { alaSwiper, alaGoodsList, alaCouponItem, alaChooseSpecs, alaTabs, menuGoods }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.set-fixed {
  position: fixed;
}
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.txt-right {
  text-align: right;
}
.swiper {
  .slide-image {
    width: 100%;
    height: 100%;
  }
}
// 删除式文字
.txt-decoration-line-through {
  text-decoration: line-through;
}
.goods-details__pinfo {
  position: relative;
  align-items: center;
  .gdp__price {
    padding-left: 5px;
    height: 1rem;
    line-height: 1rem;
    background: linear-gradient(#ff5143, #de2431);
    font-size: 0.5rem;
    color: #ffffff;
    &.start {
      color: @color-txt;
      background: linear-gradient(#ffed56, #ffe946);
    }
    span:first-child {
      font-size: 0.36rem;
    }
    span:last-child {
      margin-left: 10px;
      text-decoration: line-through;
      opacity: 0.6;
      font-size: 0.28rem;
    }
  }
  .gdp__offer-price {
    position: absolute;
    padding-left: 30px;
    right: 0;
    top: 0;
    height: 1rem;
    font-size: 0.26rem;
    color: #f4423d;
    background: linear-gradient(#ffed56, #ffe946);
    background: linear-gradient(115deg, transparent 20px, #ffed56 0) top left,
      linear-gradient(65deg, transparent 20px, #ffe946 0) bottom left;
    background-size: 100% 50%;
    background-repeat: no-repeat;
    &.start {
      color: #ffed56;
      background: linear-gradient(#d8cdcc, #f4423d);
      background: linear-gradient(70deg, transparent 20px, #f4423d 0) top left,
        linear-gradient(110deg, transparent 20px, #f4423d 0) bottom left;
    }
    .gdp__op-text {
      height: 1rem;
      margin-right: 25px;
      div:nth-child(1) {
        text-align: center;
        margin-top: 0.08rem;
        margin-bottom: 0.05rem;
      }
      div:nth-child(2) {
        color: #333333;
        span {
          width: 0.4rem;
          height: 0.4rem;
          text-align: center;
          line-height: 0.4rem;
          color: #ffffff;
          background: #333333;
          border-radius: 4px;
        }
        &.start span {
          background-color: #ffe946;
          color: @color-txt;
        }
      }
    }
  }
}
.goods-details__msg {
  padding: 0.2rem 0.3rem 0.03rem;
  background: #fff;
  .gdm__title {
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    position: relative;
    font-size: 0.28rem;
    color: @color-txt;
    font-family: PingFangSC-Medium;
  }
  .gdm__remark-title {
    font-size: 0.23rem;
    color: @color-txt-2;
    margin-bottom: 15px;
  }
  .gdm__price {
    font-family: PingFangSC-Medium;
    padding: 0 0 0.2rem;
    position: relative;
    display: flex;
    align-items: center;
    color: @color-price;
    font-size: 0.44rem;
    span {
      font-size: 0.26rem;
      color: #999999;
      padding-left: 0.2rem;
      height: 0.6rem;
      line-height: 0.7rem;
    }
  }
  .gdm__fitem {
    font-family: PingFangSC-Regular;
    padding: 0.18rem 0;
    border-bottom: 1px solid @color-border;
    color: @color-txt-2;
    font-size: 0.28rem;
    .arrow {
      .icon-arrow();
    }
    .gdm__fitem-cell {
      .flex-n();
      .show-line();
      margin-right: 10px;
    }
    .gdm__fitem-tit {
      margin-right: 0.3rem;
      font-size: 0.24rem;
      margin-top: 0.002rem;
    }
    .gdm__fitem-m {
      display: flex;
      color: @color-price;
      span {
        margin-right: 15px;
      }
    }
    .gdm__fitem-right {
      .top {
        padding-bottom: 0.13rem;
      }
      .gdm__ac-item {
        font-size: 0.26rem;
        color: @color-txt;
        display: flex;
        align-items: center;
        img {
          display: inline-block;
          height: 16px;
          width: 32px;
          margin-right: 2px;
        }
        span {
          color: @color-price;
          border: 1px @color-price solid;
          border-radius: 50px;
          padding: 0 0.1rem;
          font-size: 0.2rem;
          font-family: PingFangSC-Medium;
          margin-right: 2px;
        }
      }
    }
  }
  .gdm__ad {
    font-size: 0.22rem;
    text-align: center;
    color: @color-txt-1;
    padding: 0.15rem 0;
    align-items: center;
    .gdm__ad-item {
      justify-content: center;
    }
    .icon {
      display: inline-block;
      .icon('icon_qgou', 11px, 11px);
      margin-right: 0.1rem;
      margin-top: 0.05rem;
    }
  }
}
.goods-details__choose-spe {
  padding: 0.32rem 0.3rem;
  background: #fff;
  height: 0.4rem;
  display: flex;
  align-items: center;
  margin-top: 0.2rem;
  position: relative;
  .gdcs__left {
    width: 0.51rem;
    font-size: 0.24rem;
    flex-shrink: 0;
    margin-right: 0.3rem;
    color: @color-txt-2;
  }
  .gdcs__right {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    flex-shrink: 1;
    :first-child {
      font-size: 0.28rem;
      color: @color-txt;
    }
    .arrow {
      .icon-arrow();
    }
  }
}
.goods-details__recommend {
  margin-top: 10px;
  margin-bottom: 10px;
  .ala-tabs-view {
    position: relative;
    border-bottom-style: none;
    z-index: 50;
  }
  .gdr__content {
    background-color: #ffffff;
    width: 100%;
  }
  .ala-tab__line {
    width: 0.9rem;
  }
  .ala-tab__two-line {
    &.to1 {
      left: 1.7rem;
    }
    &.to2 {
      left: 4.9rem;
    }
  }
}
.goods-details__goods-img {
  margin-top: 0.4rem;
  padding-bottom: 1rem;
  height: auto;
  width: 100%;
  image {
    width: 100%;
  }
}
.goods-none__tip {
  opacity: 0.7;
  background: #5d6c8c;
  color: #ffffff;
  font-size: 0.28rem;
  text-align: center;
  position: fixed;
  bottom: 1rem;
  width: 100%;
  height: 30px;
  line-height: 30px;
}
.goods-details__foot {
  height: 1rem;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: #ffffff;
  padding: 0.05rem 0.1rem;
  color: #404040;
  font-size: 0.18rem;
  align-items: center;
  box-shadow: 0 -1px 16px 0 #e4e4e4;
  z-index: 100;
  .gdf__left {
    padding: 0 20px;
    .gdf__home-icon {
      .icon('icon_home_black', 30px, 30px);
    }
  }
  .gdf__right {
    padding: 0 20px 0 0;
    :first-child {
      background: @color-btn;
      border-radius: 100px;
      font-size: 0.3rem;
      color: @color-txt;
      text-align: center;
      height: 0.8rem;
      line-height: 0.8rem;
    }
    :first-child.out-of-stock {
      background-color: #dddddd;
    }
  }
}
.goods-details__coupon {
  background-color: #ffffff;
  position: fixed;
  height: 85%;
  width: 100%;
  z-index: 1002;
  background: #fff;
  bottom: 0;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  overflow-y: scroll;
  &.iponex {
    height: 90%;
  }
  .gdc__title {
    font-size: 0.32rem;
    color: @color-txt;
    padding: 15px 0 5px;
    text-align: center;
  }
  .gdc-cooupon-view {
    overflow-y: scroll;
    height: 80%;
    &.iphonex {
      height: 73%;
    }
  }
  .gdc-cooupon__item {
    position: relative;
    .gdc-info__btn {
      font-size: 0.24rem;
      color: @color-txt;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25%;
      padding-right: 5px;
      position: absolute;
      right: 0.07rem;
      top: 1.02rem;
      .get-btn {
        height: 27px;
        line-height: 27px;
        width: 64px;
        text-align: center;
        background: @color-btn;
        border-radius: 100px;
      }
      .btn-gray {
        color: #ffffff;
        background-color: #dddddd;
      }
      .choose-btn {
        .icon('icon_selected_y', 30px, 30px);
      }
      .choose-btn-gray {
        width: 28.5px;
        height: 28.5px;
        border: 2px solid #dddddd;
        border-radius: 50%;
      }
    }
  }
  .gdc__com-btn {
    position: fixed;
    bottom: 10px;
    font-size: 16px;
    margin: 0 5%;
    width: 90%;
    background: @color-btn;
    border-radius: 100px;
    text-align: center;
    line-height: 43px;
    height: 43px;
    color: @color-txt;
    &.gdc__iphonex-bottom {
      bottom: 74px;
    }
  }
}
.goods-details__choose-specs-active {
  bottom: 0;
}
</style>
