/**
* Created by huangyilu on 2018-10-16.
* 支付成功
*/
<template>
  <div class="pay-success-view">
    <div class="psv-bg__view">
      <div class="price-title">
        <div>支付成功</div>
        <!-- <div>￥{{ orderDetailData.actualAmount }}</div> -->
        <div class="lit">已支付{{ orderDetailData.actualAmount }}元</div>
      </div>
      <!-- <div class="address-view">
        <div class="tit">
          <div class="address-icon"></div>收货地址
        </div>
        <div class="info">
          <div class="name">{{ orderDetailData.consignee }} <span>{{ orderDetailData.consigneeMobile }}</span> </div>
          <div class="dal">{{ orderDetailData.address }}</div>
        </div>
      </div>-->
      <div class="bottom-btn">
        <div class="order-btn" @click="goOrderList">查看订单</div>
        <div class="goback-btn" @click="goBackHome">返回首页</div>
      </div>
    </div>
    <!-- 常驻运营位 -->
    <div class="lunbocon" v-if="showbannerList">
      <swiper
        class="stomsg"
        catchtouchmove="touchflase"
        :indicator-dots="false"
        autoplay="true"
        interval="3000"
        duration="500"
        circular="true"
        :style="'height: ' + bannerHeight + 'rpx'"
      >
        <block v-for="(item , ind) in swiperData" :key="ind">
          <swiper-item>
            <!-- <img :src="ite" class="slide-image" width="355" height="150"> -->
            <img
              mode="widthFix"
              @click="goOperate(item.content)"
              :src="item.imageUrl"
              bindload="imageLoad"
            >
          </swiper-item>
        </block>
      </swiper>
    </div>
    <!-- 弹窗运营位 -->
    <div class="altrun" v-if="closeStatus">
      <div>
        <img
          @click="goOperate(popBanner.content)"
          :src="popBanner.imageUrl"
          alt
          :style="'height:' + altheight+'rpx;width:'+altWidth+'rpx'"
        >
        <div :style="'transform:translateY('+closeBtnTop+'rpx)'" @click="closeWin"></div>
      </div>
    </div>
    <!-- 猜你喜欢 -->
    <div :class="['ala-mine__recommend', {'iphonex-bottom': isIphoneX }]">
      <h3 class="recommend-title">猜你喜欢</h3>
      <ala-goods-info-list :goodsInfoListData="goodsInfoFlow"></ala-goods-info-list>
      <!-- 底部加载中 -->
      <ala-loadding-bottom :status="loadingBottomStatus"/>
    </div>
  </div>
</template>

<script>
import alaGoodsInfoList from 'components/goodsInfo/goodsInfoList'
import alaLoaddingBottom from 'components/loadding/loaddingBottom'
import webview from 'utils/webview'
import { mapActions, mapMutations, mapState } from 'vuex'
import cache from 'utils/cache'
import systemInfo from 'utils/systemInfo'
import navigate from 'utils/navigate'
import maidian from 'utils/maidian'
import wx from 'wx'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      orderData: {},
      pageNum: 1,
      pageFlag: 'PAY_FINISHED',
      // 商品信息流
      goodsInfoFlow: [],
      // 底部加载
      loadingBottomStatus: 0,
      // banner 高
      bannerHeight: '',

      // 关闭弹窗
      closeStatus: false,
      showbannerList: false,
      popBanner: {},
      swiperData: [
        // {
        //   content: 'http://www.baidu.com',
        //   imageUrl: 'http://f.51fanbei.com/online/c2a7936accc124cb.jpg',
        //   sort: 0,
        //   titleName: 'sss',
        //   type: 'H5_URL'
        // },
        // {
        //   content: 'http://www.baidu.com',
        //   imageUrl: 'http://f.51fanbei.com/online/c2a7936accc124cb.jpg',
        //   sort: 0,
        //   titleName: 'sss',
        //   type: 'H5_URL'
        // },
        // {
        //   content: 'http://www.baidu.com',
        //   imageUrl: 'http://f.51fanbei.com/online/c2a7936accc124cb.jpg',
        //   sort: 0,
        //   titleName: 'sss',
        //   type: 'H5_URL'
        // }
      ],
      numadd: 0,
      // 弹窗图片定位
      closeBtnTop: '',
      altWidth: '',
      altheight: ''
    }
  },
  props: {},
  computed: {
    ...mapState(['orderDetailData', 'paysuceOperate']),
    isIphoneX() {
      return systemInfo.isIphoneX
    }
  },
  created() {},
  mounted() {
    // 埋点
    maidian.shop(maidian.spm.shop_payment)
    if (this.$root.$mp.query.orderId) {
      this.orderId = this.$root.$mp.query.orderId
      console.log('this.orderId = ', this.orderId)
    }
    this.getMineInfo(true)
    this.getGoods()
    this.getOrderDetail()
    this.togetPaysuceOperate()
    // 清除state里已选择的优惠券
    this.setAvailableCouponIndex(-1)
  },
  // 小程序生命周期
  onReachBottom() {
    this.getGoods()
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
    ...mapMutations(['setCurrentOrderId', 'setCurrentTabbarIndex']),
    ...mapActions([
      'getMineInfo',
      'getBottomMoreGoods',
      'getOrderDetailData',
      'setAvailableCouponIndex',
      'getPaysuceOperate'
    ]),
    async getGoods() {
      if (this.pageNum > 0) {
        let data = await cache.list('mineGoods', this.pageNum, this.toGetGoods, cache.TIMEOUT)
        if (data) {
          let list = data.moreGoodsList
          if (list && list.length) {
            this.goodsInfoFlow = this.goodsInfoFlow.concat(list)
            this.pageNum++
            if (data.nextPageNo < 0) this.pageNum = -1
          } else {
            this.pageNum = -1
          }
        }
      }
      this.loadingBottomStatus = this.pageNum < 0 ? 1 : 0
    },
    async toGetGoods() {
      let params = { pageNum: this.pageNum, pageFlag: this.pageFlag }
      let data = await this.getBottomMoreGoods(params)
      return data
    },
    async getOrderDetail() {
      this.setCurrentOrderId(this.orderId)
      await this.getOrderDetailData()
    },
    // 支付完成页运营位
    async togetPaysuceOperate(param) {
      let that = this
      await this.getPaysuceOperate(param)
      console.log(this.paysuceOperate)
      // 常驻运营位
      if (this.paysuceOperate.bannerList.length > 0) {
        this.showbannerList = true
        this.swiperData = this.paysuceOperate.bannerList
        // 获取图片高度
        wx.getImageInfo({
          src: that.swiperData[0].imageUrl,
          success: function(res) {
            that.bannerHeight = 750 / (res.height / 750)
            console.log(that.bannerHeight)
          }
        })
      }
      // 弹窗运营位
      if (this.paysuceOperate.popBanner) {
        this.popBanner = this.paysuceOperate.popBanner
        this.closeStatus = true
        // 获取图片高度
        wx.getImageInfo({
          src: that.popBanner.imageUrl,
          success: function(res) {
            console.log(res)
            res.width = 601
            res.height = 601
            that.altWidth = res.width
            // 大于 700 取图片高度
            if (res.width > 600) {
              console.log('enter')
              that.altheight = res.height * 600 / res.width
            } else {
              that.altheight = res.height
            }
            that.closeBtnTop = that.altheight / 2 + 60
          }
        })
      }
    },
    goBackHome() {
      this.setCurrentTabbarIndex(0)
      navigate.reLaunch({ url: '/pages/index/index' })
    },
    goOrderList() {
      navigate.push({ url: '/pages/common/orderDetailMine' })
    },
    goOperate(contentURL) {
      if (contentURL && contentURL !== 'undefined') {
        webview.openOpeNav(contentURL)
      }
    },
    closeWin() {
      this.closeStatus = false
    }
  },
  components: { alaGoodsInfoList, alaLoaddingBottom }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.pay-success-view {
  .psv-bg__view {
    // background-color: #ffffff;
    background: linear-gradient(171deg, rgba(255, 233, 77, 1) 0%, rgba(253, 209, 0, 1) 100%);
    box-shadow: 0px -2px 0px 0px rgba(228, 228, 228, 1);
    padding-bottom: 0.6rem;
  }
  .lunbocon {
    height: auto;
    transform: translateY(-0.5rem);
    .stomsg {
      ._swiper-item {
        img {
          width: 7rem;
          margin: 0 auto;
          border-radius: 0.14rem;
        }
      }
    }
  }
  .altrun {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    text-align: center;

    & > div {
      img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 7rem;
        display: inline-block;
      }
      div {
        position: absolute;
        top: 50%;
        left: 46%;
        width: 0.6rem;
        height: 0.6rem;
        background: url(https://f.51fanbei.com/h5/app/activity/2018/09/invite_close.png) no-repeat center center / 100%
          100%;
      }
    }
  }
  .price-title {
    padding: 0.24rem;
    font-size: 0.5rem;
    // color: @color-price;
    color: #000;
    text-align: center;
    .lit {
      padding-top: 0.1rem;
      font-family: PingFangSC-Regular;
      font-size: 0.26rem;
      color: #000;
    }
  }
  .address-view {
    color: @color-txt;
    background: #ffffff;
    box-shadow: 0 2px 15px 0 rgba(148, 174, 247, 0.21);
    border-radius: 12px;
    margin: 10px 12.5px;
    padding: 15px;
    .tit {
      font-size: 0.3rem;
      display: flex;
      align-items: center;
      .address-icon {
        .icon('icon_adress_black', 20px, 20px);
        margin-right: 3.5px;
      }
    }
    .info {
      padding-top: 15px;
      padding-left: 23px;
      font-size: 0.28rem;
      color: @color-txt;
      .name span {
        margin-left: 15px;
      }
      .dal {
        padding-top: 5px;
        font-size: 0.26rem;
        color: #8a8a8a;
      }
    }
  }
  .bottom-btn {
    font-size: 0.26rem;
    text-align: center;
    padding: 5px 0 0.3rem 0;
    box-sizing: border-box;

    div {
      height: 0.6rem;
      width: 1.9rem;
      display: inline-block;
      line-height: 0.6rem;
      margin: 0.15rem;
      border-radius: 100px;
      border: 1px #666666 solid;
    }
  }
  // .order-btn {
  //   background-color: @color-btn;
  //   color: @color-txt;
  // }
  // .goback-btn {

  //   color: #666666;
  // }
  .ala-mine__recommend {
    // margin-top: 25px;
    margin-bottom: @tabbar-height;
    .recommend-title {
      margin-bottom: 7.5px;
      font-family: PingFangSC-Medium;
      font-size: 17px;
      color: @color-txt;
      text-align: center;
    }
  }
}
</style>
