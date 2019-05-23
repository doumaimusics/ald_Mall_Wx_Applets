/**
* Created by huangyilu on 2018/12/05.
* 我的砍价详情
*/
<template>
  <div class="help-bargain-detail-view" v-if="orderInfo">
    <!-- 自己打开 背景图 -->
    <image
      class="my-bargain-bg"
      :class="{'set-fixed': ruleShow || retainShow || isRegisteredShow }"
      src="https://img.51fanbei.com/h5/weChat/cj_my_bg.png"
      v-if="isMySelf"
      mode="widthFix"
      alt
    ></image>
    <!-- 好友打开 背景图 -->
    <image
      class="other-bg-img"
      :class="{'set-fixed': ruleShow || retainShow  || isRegisteredShow }"
      src="https://img.51fanbei.com/h5/weChat/cj_bdetail_bg_top.png"
      v-else
    mode="widthFix" alt></image>
    <!-- 砍价攻略 -->
    <div class="hbdv-gl" :class="{'set-fixed': ruleShow || retainShow  || isRegisteredShow }" @click="ruleShow=true">砍价攻略</div>

    <div
      :class="['help-bargain-bg', {'other-bg' : !isMySelf }, {'set-fixed': ruleShow || retainShow  || isRegisteredShow }]"
    >
      <div :class="['', { 'hbdv-bg-color': !isMySelf }]">
        <!-- 倒计时 -->
        <div v-if="helpStatus === 0" :class="['hbdv-countdown']">
          还剩 {{ timer.d }}
          <span>{{ timer.h }}</span> :
          <span>{{ timer.m }}</span> :
          <span>{{ timer.s }}</span>
        </div>
        <!-- 倒计时 占位 -->
        <div v-if="isMySelf" :class="[{ 'hbdv-countdown-empty': helpStatus !== 0 }]"></div>

        <!-- 砍价商品信息 -->
        <div class="hbdv-goods">
          <div class="goods__icon">
            <img :src="bargainGoodsInfo.goodsIcon" alt>
          </div>
          <div class="goods__info">
            <div class="goods-info__tit">{{ bargainGoodsInfo.goodsName }}</div>
            <div class="goods-info__spec">{{ bargainGoodsInfo.propertyValueNames }}</div>
            <div class="goods-info__price">
              <div class="gi-price">
                ¥
                <span>0</span>
              </div>
              <div class="gi-ac-price">￥{{ bargainGoodsInfo.saleAmount }}</div>
              <div class="gi-stock">已领{{ bargainGoodsInfo.saleCount }}件</div>
            </div>
          </div>
        </div>

        <!-- 自己打开时 的 文案 -->
        <my-txt-status
          v-if="isMySelf"
          :helpStatus="helpStatus"
          :goodsStatus="goodsStatus"
          :helpInfo="helpInfo"
        />

        <!-- 自己打开时 的 按钮 -->
        <my-btn-status
          v-if="isMySelf"
          :helpStatus="helpStatus"
          :goodsStatus="goodsStatus"
          :orderInfo="orderInfo"
          @bingShareFn="bingShareFn"
        />

        <!-- 好友打开时 的 文案 -->
        <other-txt-status
          v-if="!isMySelf"
          :helpStatus="helpStatus"
          :goodsStatus="goodsStatus"
          :helpInfo="helpInfo"
        />

        <!-- 好友打开时 的 按钮 -->
        <other-btn-status v-if="!isMySelf" :helpStatus="helpStatus" :goodsStatus="goodsStatus" :orderInfo="orderInfo" />


        <!-- 新人专项 -->
        <div v-if="!isMySelf && goodsStatus !== 4" class="hbdv-help-new-share-view">
          <div class="hhnsv-title"></div>
          <div class="hhnsv-info">
            <img class="goods-img" src="https://img.51fanbei.com/h5/weChat/cj_newpeople_goods.png" alt="">
            <!-- <div class="hhnsv-info__img">
              <img src="https://img.51fanbei.com/h5/xiaowx/cash_bg02.png" alt>
            </div>
            <div class="hhnsv-info__txt">
              <div>圣罗兰口红</div>
              <div>特价: ¥1元</div>
              <div>1元购、5元无门槛券、1元秒杀等优惠活动</div>
            </div> -->
          </div>
        </div>

        <!-- 帮砍列表 -->
        <friends-help
          :friendsHelpListData="friendsHelpListData"
          :freeOrderId="userBargainDetailId"
          :isMySelf="isMySelf"
        />
      </div>
      <!-- 其他砍价商品 -->
      <goods-list :goodsList="goodsList" :isCanBargain="false" />
    </div>

    <!-- 砍价攻略 弹窗 -->
    <div class="bdr-model" v-if="ruleShow" @click.stop="ruleShow=false">
      <div class="model-title" @click.stop>
        <div>活动攻略</div>
        <div class="model-delete-icon" @click="ruleShow=false"></div>
      </div>
      <div class="model-txt" @click.stop>
        <ala-raiders/>
      </div>
    </div>

    <!-- 分享弹窗 -->
    <!-- <div class="bdr-model model-bg" v-if="shareShow" @click.stop="shareShow=false">
      <ala-share :shareData="shareData"/>
    </div> -->

    <!-- 帮砍 注册 弹窗 -->
    <div class="bdr-model" v-if="isRegisteredShow">
      <ala-registered
        :freeOrderId="userBargainDetailId"
        :recommendId="recommendId"
      />
    </div>

    <!-- 注册成功 引导下载弹窗 -->
    <div class="bdr-model" v-if="isDownloadImgShow" >
      <div class="bdr-dow">
        <div class="bdr-cancel" @click="isDownloadImgShow=false"></div>
        <image class="bdr-img"
          src="https://img.51fanbei.com/h5/weChat/cj_reg_success@1.5x.png"></image>
        <div class="bdr-btn" @click="bindSaveImg">保存图片</div>
      </div>
    </div>
    <!-- 返回 挽留弹窗 -->
    <div class="bdr-model" v-if="retainShow">
      <ala-retain-panel :goodsIcon="bargainGoodsInfo.goodsIcon" @bindShareFn="bindShareFn" />
    </div>

  </div>
</template>

<script>
import goodsList from '../components/goods/goodsList'
import alaRaiders from '../components/raiders/raidersIndex'
import alaShare from '../components/share/index'
import alaRetainPanel from '../components/share/retainPanel'
import alaRegistered from '../components/registered/index'

import basis from 'utils/basis'
import { mapActions, mapState, mapMutations } from 'vuex'
import friendsHelp from '../components/friendsHelp/index'
// import navigate from 'utils/navigate'
import myTxtStatus from '../components/bargainDetailStatus/myTxtStatus'
import myBtnStatus from '../components/bargainDetailStatus/myBtnStatus'
import otherTxtStatus from '../components/bargainDetailStatus/otherTxtStatus'
import otherBtnStatus from '../components/bargainDetailStatus/otherBtnStatus'
// import wx from 'wx'

import maidian from 'utils/maidian'
import { saveImg } from 'utils/saveImg'
import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      userBargainDetailId: 0,
      // 是否为自己的订单 1是 0不是
      isMySelf: 1,
      // 规格弹窗
      ruleShow: false,
      // 分享弹窗
      shareShow: false,
      // 返回挽留弹窗
      retainShow: false,

      goodsList: [],

      bargainGoodsInfo: {},
      helpInfo: {},
      // 0:助力中 1:助力完成 2:超时失败
      helpStatus: -1,
      // 1:未助力(立即帮砍);2:助力成功(已帮砍);3:助力未完成(立即登录app);4:老用户(仅限新用户);5:超时未帮砍（砍价已超时）
      goodsStatus: -1,

      // 倒计时处理
      countTimeKey: '',
      timer: {},
      endTime: '',
      nowTime: '',

      // 分享数据
      shareData: {},
      friendsHelpListData: {},
      recommendId: 0,

      // 订单信息
      orderInfo: null,

      // 引导下载 图片 是否显示
      isDownloadImgShow: false,

      // 长按保存图片方法
      imgTimeStart: 0,
      imgTimeEnd: 0
    }
  },
  props: {},
  computed: {
    ...mapState('bargain', ['friendsHelpList', 'isRegisteredShow'])
  },
  created() {},
  mounted() {},
  onLoad(options) {
    console.log(' bargain options', options)
    this.userBargainDetailId = options.freeOrderId ? options.freeOrderId : 0
    this.recommendId = options.recommendId ? options.recommendId : 0
    console.log(' get freeOrderId == ', this.userBargainDetailId)
    console.log(' get recommendId == ', this.recommendId)
  },
  onShow() {
    this.getBargainOrderDetailData()
    this.getFriendsHelpListData()
    this.getBargainIndexGoodsData()
    Monitor.pageShow()
  },
  onHide() {
    // 清除 计时器
    basis.clearCountdown(this.countTimeKey)
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onUnload() {
    // 清除 计时器
    basis.clearCountdown(this.countTimeKey)
    this.orderInfo = null
  },
  onShareAppMessage(res) {
    maidian.click('kanjia_detail_invite', this.bargainGoodsInfo.goodsName, this.userBargainDetailId)
    maidian.view('kanjia_detail_sharepop', this.bargainGoodsInfo.goodsName, this.userBargainDetailId)
    maidian.view('kanjia_detail_shareup', this.bargainGoodsInfo.goodsName, this.userBargainDetailId)
    maidian.view('kanjia_miniprogram_invitehelp', this.bargainGoodsInfo.goodsName, this.userBargainDetailId)
    let shareValue = {
      title: '测试友谊的时候到了！请帮我点一下～',
      path:
        '/pBargain/pages/bargainDetail?freeOrderId=' +
        this.shareData.freeOrderId +
        '&recommendId=' +
        this.shareData.userId,
      success: function(res) {
        // 转发成功
      },
      fail: function(res) {
        // 转发失败
      }
    }
    return shareValue
  },
  watch: {},
  methods: {
    ...mapActions('bargain', [
      'getBargainOrderDetail',
      'getBargainIndexGoodsList',
      'getFriendsHelpList',
      'createBargain'
    ]),
    ...mapMutations('bargain', ['setBargainTabIndex', 'setIsRegisteredShow']),
    async getBargainOrderDetailData() {
      let data = await this.getBargainOrderDetail({
        freeOrderId: this.userBargainDetailId
      })
      this.nowTime = data.now
      this.isMySelf = +data.isMySelf === 1
      this.bargainGoodsInfo = {
        goodsName: data.userGoodsDetail.goodsName,
        goodsIcon: data.userGoodsDetail.goodsIcon,
        saleAmount: data.userGoodsDetail.saleAmount,
        saleCount: data.userGoodsDetail.saleCount,
        propertyValueNames: data.userGoodsDetail.propertyValueNames
      }
      this.helpInfo = {
        helpNum: data.userGoodsDetail.helpNum,
        targetNum: data.userGoodsDetail.targetNum
      }
      this.helpStatus = data.userGoodsDetail.helpStatus
      this.goodsStatus = data.goodsStatus
      this.endTime = data.userGoodsDetail.endTime
      if (this.helpStatus === 0) {
        basis.clearCountdown(this.countTimeKey)
        this.formatTimer()
      }
      this.shareData = {
        inviteTargetNum: data.userGoodsDetail.targetNum - data.userGoodsDetail.helpNum,
        endTime: data.userGoodsDetail.endTime,
        nowTime: data.now,
        freeOrderId: data.userGoodsDetail.freeOrderId,
        userId: data.userGoodsDetail.userId
      }
      this.orderInfo = {
        freeOrderGoodsId: data.userGoodsDetail.freeOrderGoodsId,
        addressId: data.userGoodsDetail.addressId,
        goodsPriceId: data.userGoodsDetail.goodsPriceId,
        goodsName: data.userGoodsDetail.goodsName,
        freeOrderId: this.userBargainDetailId
      }
      if (!this.isMySelf && this.helpStatus === 0 && this.goodsStatus === 3) {
        this.isDownloadImgShow = true
      }
      // 如果是自己的 砍价详情 且 是砍价中的商品 默认 显示分享弹窗
      // if (this.isMySelf && this.helpStatus === 0) {
      //   this.shareShow = true
      // }
      maidian.view('kanjia_detail', this.bargainGoodsInfo.goodsName, this.userBargainDetailId)
      if (!this.isMySelf) {
        maidian.view('kanjia_miniprogram', this.bargainGoodsInfo.goodsName, this.userBargainDetailId)
      }
      console.log(' getBargainOrderDetail == ', data)
      console.log(' orderInfo == ', this.orderInfo)
    },
    async getFriendsHelpListData() {
      let data = await this.getFriendsHelpList({
        freeOrderId: this.userBargainDetailId
      })
      this.friendsHelpListData = data
      console.log(' getFriendsHelpListData == ', this.friendsHelpListData)
    },
    async getBargainIndexGoodsData() {
      let data = await this.getBargainIndexGoodsList()
      this.goodsList = data.todayGoodss
    },
    // 倒计时
    formatTimer() {
      let duration = parseInt((this.endTime - this.nowTime) / 1000)
      let key = basis.countdown(duration, {
        timer: data => {
          this.timer = basis.formatCountTime(data.last)
          //   console.log('formatTimer == ', this.timer)
        },
        complete: () => {
          // 倒计时结束 更新数据
          this.getBargainOrderDetailData()
        }
      })
      this.countTimeKey = key
      console.log('countTimeKey == ', this.countTimeKey)
    },
    // 分享事件
    // bingShareFn () {
    //   this.shareShow = true
    // },
    // 长按保存图片 方法
    // bindImgTimeStart (e) {
    //   this.imgTimeStart = e.timeStamp
    //   console.log(' bindImgTimeStart ', e.timeStamp)
    // },
    // bindImgTimeEnd (e) {
    //   this.imgTimeEnd = e.timeStamp
    // },
    // 长按保存图片 -- 待优化
    async bindSaveImg() {
      saveImg('https://img.51fanbei.com/h5/weChat/cj_reg_success@1.5x.png')
    }
  },
  components: {
    goodsList,
    alaShare,
    alaRetainPanel,
    alaRaiders,
    friendsHelp,
    alaRegistered,
    myTxtStatus,
    myBtnStatus,
    otherTxtStatus,
    otherBtnStatus
  }
}
</script>

<style lang="less">
@import '../style/index.less';
@color-red: #ff513d;
@color-price-red: #e12020;
.help-bargain-detail-view {
  height: 100%;
  background-color: #f8f8f8;
  .model-bg {
    background-color: rgba(0, 0, 0, 0.3) !important;
  }
  .my-bargain-bg {
    width: 100%;
    z-index: 0;
    position: absolute;
  }
  .other-bg-img {
    width: 100%;
    z-index: 0;
    position: absolute;
  }
  .hbdv-gl {
    font-size: 26 / @px;
    line-height: 32 / @px;
    text-align: center;
    width: 60 / @px;
    height: 70 / @px;
    padding: 10 / @px;
    background: rgba(255, 213, 0, 1);
    border-radius: 0 0 50px 50px;
    position: absolute;
    right: 30 / @px;
    z-index: 999;
  }
  .help-bargain-bg {
    padding-bottom: 20 / @px;
    background-size: 100% 100%;
    position: absolute;
    width: 100%;
    .hbdv-bg-color {
      background-color: #fff5ef;
      padding-bottom: 10px;
    }
    &.other-bg {
      margin-top: 170px;
    }
    .hbdv-countdown-empty {
      opacity: 0;
      height: 60px;
    }
    .hbdv-countdown {
      color: @color-red;
      font-size: 30 / @px;
      padding: 12.5px 0;
      text-align: center;
      width: 65%;
      margin: auto;
      &.other-hbdv-countdown {
        padding-top: 351 / @px;
      }
      span {
        width: 28px;
        height: 26px;
        line-height: 26px;
        margin: 0 5px;
        background: linear-gradient(121deg, rgba(255, 120, 67, 1) 0%, rgba(255, 60, 57, 1) 100%);
        border-radius: 2px;
        color: #ffffff;
      }
    }
    .hbdv-goods {
      margin: 0 15px;
      padding: 30 / @px;
      background-color: #ffffff;
      display: flex;
      border-radius: 8 / @px;
      // position: absolute;
      // top: 220px;
      // width: 315px;
      .goods__icon {
        width: 240 / @px;
        height: 240 / @px;
        justify-items: center;
        margin-right: 30 / @px;
        img {
          .border(#eeeeee);
        }
      }
      .goods__info {
        .flex-n();
        .goods-info__tit {
          font-size: 30 / @px;
          font-weight: 500;
          font-family: PingFangSC-Medium;
          height: 84 / @px;
          line-height: 42 / @px;
          .show-line(2);
        }
        .goods-info__spec {
          font-size: 28 / @px;
          color: @color-txt-666;
          margin: 28 / @px 0 38 / @px;
          height: 40 / @px;
          line-height: 20px;
          .show-line(1);
        }
        .goods-info__price {
          display: flex;
          align-items: center;
          .gi-price {
            font-size: 30 / @px;
            font-weight: 500;
            color: @color-price-red;
            font-family: PingFangSC-Medium;
            margin-right: 10 / @px;
            span {
              font-size: 36 / @px;
            }
          }
          .gi-ac-price {
            .flex-n();
            .line-through();
            color: @color-txt-999;
            font-size: 26 / @px;
          }
          .gi-stock {
            font-size: 26 / @px;
            color: @color-txt-999;
          }
        }
      }
    }
    .hbdv-bargain-info {
      font-size: 36 / @px;
      text-align: center;
      padding: 12.5px 0;
      span {
        color: @color-red;
      }
    }
    .hbdv-help-btn {
      margin: 0 30 / @px;
      height: 90 / @px;
      line-height: 90 / @px;
      font-size: 30 / @px;
      text-align: center;
      color: #eeeeee;
      background: linear-gradient(121deg, rgba(255, 120, 67, 1) 0%, rgba(255, 60, 57, 1) 100%);
      border-radius: 45 / @px;
      &.secondary-btn {
        margin-top: 10px;
        background: #fff4ec;
        color: #ff513d;
        border: 1px solid rgba(255, 81, 61, 1);
      }
      &.three-btn {
        background: rgba(204, 204, 204, 1);
        color: #999999;
      }
    }
    .hbdv-help-new-share-view {
      align-items: center;
      text-align: center;
      .hhnsv-title {
        margin: 15px auto;
        .icon('cj_newpeople_share@1.5x', 137px, 17.5px);
      }
      .hhnsv-info {
        display: flex;
        width: 345px;
        height: 130px;
        margin: auto;
        box-sizing: border-box;
        background: linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 237, 220, 1) 100%);
        .goods-img {
          width: 100%;
          height: 100%;
        }
        .hhnsv-info__img {
          width: 100px;
          height: 100px;
          justify-items: center;
        }
        .hhnsv-info__txt {
          margin-left: 15px;
          text-align: left;
          .flex-n();
          :nth-child(1) {
            font-size: 17px;
            font-weight: 500;
          }
          :nth-child(2) {
            font-size: 17px;
            font-weight: 500;
            color: #ff513d;
            padding: 7.5px 0;
          }
          :nth-child(3) {
            font-size: 13px;
            color: #af7b4a;
          }
        }
      }
    }
    .hbdv-help-tc {
      width: 250px;
      height: 250px;
      padding: 20px;
      margin: 30% auto;
      font-size: 17px;
      font-weight: 500;
      font-family: PingFangSC-Medium;
      background-color: #ffffff;
      text-align: center;
      border-radius: 5px;
      position: relative;
      .cancel {
        .icon-cancel();
        position: absolute;
        top: 10px;
        right: 10px;
      }
      .icon {
        width: 80px;
        height: 80px;
        margin: 15px auto 20px;
      }
      .btn {
        background-color: @color-main;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
        width: 100%;
        font-weight: 400;
        border-radius: 50px;
        color: @color-txt;
        margin-top: 40px;
      }
    }
  }
  .bdr-model {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 2001;
    .model-title {
      height: 80 / @px;
      line-height: 80 / @px;
      width: 100%;
      background-color: #ffffff;
      position: absolute;
      bottom: 700 / @px;
      display: flex;
      align-items: center;
      div {
        margin: 0 30 / @px;
      }
      :first-child {
        .flex-n();
      }
      .model-delete-icon {
        .icon-cancel();
      }
    }
    .model-txt {
      bottom: 0;
      overflow-y: scroll;
      height: 700 / @px;
      position: absolute;
      .ala-raiders-view {
        padding-bottom: 0;
      }
    }
  }
  .bdr-dow {
    position: relative;
    width: 300px;
    height: 450px;
    margin: 20% auto;
    background-color: #ffffff;
    image {
      width: 300px;
      height: 390px;
    }
    .bdr-cancel {
      .icon-cancel();
      position: absolute;
      right: 10px;
      top: 10px;
    }
    .bdr-btn {
      background: linear-gradient(128deg, rgba(255, 233, 121, 1) 0%, rgba(255, 201, 76, 1) 100%);
      width: 147px;
      height: 35px;
      line-height: 35px;
      margin: auto;
      border-radius: 17.5px;
      text-align: center;
    }
  }
}
</style>
