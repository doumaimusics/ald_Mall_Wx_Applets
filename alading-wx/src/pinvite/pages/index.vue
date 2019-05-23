/**
* Created by liuguangqing on 2018/12/04.
* 邀请有礼页面
*/
<template>
  <div class="inviteGift">
    <div class="asjContainer" ref="asjContainer">
      <div class="invitePost">
        <div class="stageone">
          <span v-if="pageData.availableCoinAmount">持有金币</span>
          <p class="mount">{{pageData.availableCoinAmount}}</p>
          <a class="coinTrans" @click="inviteRule">规则说明</a>
          <div class="lunbodes">
            <div class="lunbocon swiper-container swiper-no-swiping stomsg">
              <!-- 轮播 -->
              <swiper
                class="lunbocon stomsg"
                catchtouchmove="touchflase"
                :indicator-dots="false"
                autoplay="true"
                interval="3000"
                duration="500"
                vertical="true"
                circular="true"
                touch="false"
              >
                <block v-for="(item , ind) in swiperData" :key="ind">
                  <swiper-item catchtouchmove="stopTouchMove">
                    <!-- <img :src="ite" class="slide-image" width="355" height="150"> -->
                    <img src="https://img.51fanbei.com/h5/app/activity/2018/09/lottery_gold.png">
                    <span>{{item.username}}</span>
                    邀请{{item.invitenum}}人，获得{{item.goldNum}}金币
                  </swiper-item>
                </block>
              </swiper>
            </div>
            <div class="swiper"></div>
          </div>
        </div>
      </div>
      <div class="myinvite">
        <div class="mytitle">
          <label>我邀请的奖励</label>
          <span>(每日最高邀请10人)</span>
          <a @click="jumpPage('invitereve')">查看我的收益</a>
        </div>
        <div class="panel">
          <div class="item invitenumber">
            <span>有效人数</span>
            <label>{{pageData.userSum?pageData.userSum:0}}</label>
          </div>
          <div class="item invitenumber">
            <span>累计订单数</span>
            <label>{{pageData.orderSum?pageData.orderSum:0}}</label>
          </div>
          <div class="item totalMount">
            <span>
              累计邀请奖励
              <!-- <i @click="ruleDes"></i> -->
            </span>
            <label>{{pageData.coinSum?pageData.coinSum:0}}</label>
          </div>
        </div>
      </div>
      <div class="inviteprogress commonBox">
        <div class="ititle">
          每邀请3人额外奖励{{pageData.extraCoin?pageData.extraCoin:0}}金币
          <span>(等价{{pageData.extraCash?pageData.extraCash:0}}元)</span>
        </div>
        <div class="photos">
          <img
            src="https://img.51fanbei.com/h5/app/activity/2018/09/progrestart.png"
            class="smile"
            :style="{'left':33*(pageData.surplusUser%3)+'%'}"
          >
          <div class="bonus">
            <img src="https://img.51fanbei.com/h5/app/activity/2018/09/progreend.png">
            {{pageData.extraCoin?pageData.extraCoin:0}}金币
          </div>
        </div>
        <div :class="'linebar active'+pageData.surplusUser%3">
          <div class="item">0</div>
          <div class="item">1</div>
          <div class="item">2</div>
          <div style="width:1px;">3</div>
        </div>
      </div>
      <div class="chickTricks">
        <div class="Trickstitle">
          <i></i>
          <span>邀请新用户 月赚</span>
          <span>2578元</span>
          <i></i>
        </div>
        <div class="Parity">(1000金币=1元)</div>
        <div class="Trickstop clearfix">
          <div class="fl">
            <img src="https://f.51fanbei.com/h5/app/activity/11/invite2login.png" alt>
            <div class="topdes">
              <div>{{pageData.loginCoin}}金币</div>
              <div>用户登录APP</div>
            </div>
          </div>
          <div class="fr">
            <img src="https://f.51fanbei.com/h5/app/activity/11/invite2Des.png" alt>
            <div class="topdes">
              <div>{{pageData.buyCoin}}金币</div>
              <div>首单实付满{{pageData.buyLimitCoin}}元</div>
            </div>
          </div>
        </div>
        <div class="Tricksmiddle">
          <img src="https://f.51fanbei.com/h5/app/activity/11/invite2data.png" alt>
          <div class="rebate">
            <div>购物返佣</div>
            <div>无上限</div>
          </div>
          <div class="linebg"></div>
          <div class="friendpay">
            <div>好友购物 您最高</div>
            <div>
              可得
              <span>10%</span>购物佣金
            </div>
          </div>
        </div>
        <div class="Tricksfoot">
          <img class="stepImgTop" src="https://f.51fanbei.com/h5/app/activity/11/stepAll.png" alt>
          <div class="clearfix step">
            <div class="fl">
              <div>
                <div>向好友发出</div>
                <div>邀请链接</div>
              </div>
            </div>
            <div class="fl">
              <div>
                <div>好友注册并下载</div>
                <div>爱上街</div>
              </div>
            </div>
            <div class="fl">
              <div>
                <div>登陆爱上街购物后</div>
                <div>您获得奖励</div>
              </div>
            </div>
          </div>
          <div class="Trickstitle">
            <i></i>
            <span>如何提升我的邀请成功率</span>
            <i></i>
          </div>
          <div class="stepdes">
            <p>1、邀请您的家人、朋友、同学、同事成功率高；</p>
            <p>2、分享到3个以上微信群/qq群，成功邀请的几率提升200%；</p>
            <p>3、可以告诉您的朋友：注册可领260元购物金，内含多张无门槛券，好友可以4.9元买暖宝宝10片装，4.2元买纸巾6连包。</p>
          </div>
        </div>
        <div id="newPic"></div>
      </div>
    </div>
    <div class="bottomOperate">
      <div class="splitItem fourItem">
        <div class="item" @click="face2face">
          <button>
            <img src="https://img.51fanbei.com/h5/app/activity/2018/09/invite_alt1.png">
            <p>面对面邀请</p>
          </button>
        </div>
        <div class="item">
          <button open-type="share">
            <img src="https://img.51fanbei.com/h5/app/activity/2018/09/invite_alt2.png">
            <p>微信</p>
          </button>
        </div>
      </div>
    </div>
    <div class="faceshadow" v-show="showFace2face"></div>
    <div
      class="face2face"
      v-show="showFace2face"
      :animation="animationData"
      :style="{'top':windowHeight}"
    >
      <div class="nullbox">
        <div class="fctitle">
          扫码领现金
          <span @click="face2face">&nbsp;</span>
        </div>
        <div class="subtitle">一元购爆款 错过不再有</div>
        <div class="photoArea" id="photoArea">
          <img v-if="QRcodeData" id="imageOne" class="imageOne" :src="QRcodeData" alt>
          <!-- <canvas canvasId="canvasId" style="border:1px solid black;width:540rpx;height:631rpx;"/> -->
        </div>
        <button class="saveImgs" @click="savePic">保存图片</button>
      </div>
    </div>
    <div :class="'altwin '+boxmsg.className" v-if="showWinAlt">
      <div class="altcontain">
        <!-- 关闭 -->
        <div class="altclose" @click="closealt"></div>
        <!-- 头部 -->
        <div class="althead" v-html="boxmsg.title">{{boxmsg.title}}</div>
        <!-- 内容 -->
        <div class="altcon" v-html="boxmsg.content">{{boxmsg.content}}</div>
        <!-- 按钮 -->
        <!-- <div class="altbtn">altbtn</div> -->
      </div>
    </div>
  </div>
</template>
<script>
import wx from 'wx'
import Tips from 'utils/tip'
import storage from 'utils/storage'
import basis from 'utils/basis'
import navigate from 'utils/navigate'
import { mapState, mapActions } from 'vuex'
// import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import maidian from 'utils/maidian'
import { saveImg } from 'utils/saveImg'
// import { Base64 } from 'js-base64'
import Monitor from 'utils/monitor'

export default {
  data() {
    return {
      windowHeight: '',
      swiperData: [
        {
          imgIcon: '',
          username: '威尼斯摩登',
          invitenum: '3',
          goldNum: '30000'
        },
        { imgIcon: '', username: '故事人生', invitenum: '1', goldNum: '10000' },
        { imgIcon: '', username: '小猪宝贝', invitenum: '7', goldNum: '70000' },
        {
          imgIcon: '',
          username: '忆苦思甜@',
          invitenum: '6',
          goldNum: '60000'
        },
        { imgIcon: '', username: '一無所有', invitenum: '8', goldNum: '80000' },
        {
          imgIcon: '',
          username: '都是钻石i',
          invitenum: '12',
          goldNum: '120000'
        },
        {
          imgIcon: '',
          username: '不可兼得',
          invitenum: '14',
          goldNum: '140000'
        },
        { imgIcon: '', username: '三尺红绳', invitenum: '9', goldNum: '90000' },
        { imgIcon: '', username: '系你一生', invitenum: '3', goldNum: '30000' },
        {
          imgIcon: '',
          username: '回忆不淡',
          invitenum: '76',
          goldNum: '760000'
        },
        { imgIcon: '', username: '半糊涂', invitenum: '56', goldNum: '560000' },
        { imgIcon: '', username: '画心难', invitenum: '11', goldNum: '110000' },
        { imgIcon: '', username: '我高兴。', invitenum: '2', goldNum: '20000' },
        { imgIcon: '', username: '不怕痛', invitenum: '98', goldNum: '980000' },
        { imgIcon: '', username: '难入怹', invitenum: '32', goldNum: '320000' }
      ],
      pageData: {
        availableCoinAmount: '',
        invitationCode: '',
        coinSum: '',
        userSum: '',
        surplusUser: '',
        listRule: [],
        flag: false,
        loginCash: '',
        loginCoin: '',
        buyCash: '',
        buyCoin: ''
      },
      showFace2face: false,
      boxmsg: {
        title: '',
        content: '',
        className: ''
      },
      obj: {},
      isIphoneX: false,
      isIos: true,
      top: 1.28,
      pageY: 0,
      startScroll: 0,
      translatey: 0,
      slowFlag: false,
      showWinAlt: false,
      animation: {},
      animationData: {},
      scene: '',
      base64: '',
      toRegLink: 'pinvite/pages/invitereg'
      // toRegLink: 'pages/activity/activity1'
    }
  },
  onLoad(options) {
    console.log(decodeURIComponent(options.scene))
  },
  onUnload() {},
  onShow() {
    // 判断登陆
    if (storage.props.launchStatus === 1) return
    if (!this.isLogin) {
      basis.toLogin()
    }
    this.toGetIndexData()
    maidian.view('invite_home')
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  // 小程序分享事件
  onShareAppMessage(options) {
    maidian.view('invite_home_onShare')
    let title = ''
    let imageUrl = ''
    if (this.pageData.wechatShareConfig) {
      title = this.pageData.wechatShareConfig.firstTitle
      imageUrl = this.pageData.wechatShareConfig.imgUrl
    }
    return {
      title,
      path: this.toRegLink + '?invitationCode=' + this.pageData.invitationCode,
      imageUrl,
      success: function(res) {
        // 转发成功
        Tips.toast('分享成功！')
      },
      fail: function(res) {
        // 转发失败
      }
    }
  },
  computed: {
    ...mapState(['isLogin']),
    ...mapState('invite', ['inviteData', 'QRcodeData'])
  },
  mounted() {
    this.windowHeight = wx.getSystemInfoSync().windowHeight
  },
  methods: {
    ...mapActions('invite', ['getIndexData', 'getQRcode']),
    async toGetIndexData() {
      await this.getIndexData()
      this.pageData = this.inviteData
      this.pageData.coinSum = numberSlim(this.pageData.coinSum)
      let params = {
        scene: this.pageData.invitationCode,
        page: this.toRegLink
      }
      console.log(params)
      this.toGetQrCodeData(params)
    },
    async toGetQrCodeData(param) {
      await this.getQRcode(param)
    },
    touchflase() {
      return false
    },
    stopTouchMove() {
      return false
    },
    inviteRule() {
      this.boxmsg.title = '活动规则'
      var str = ''
      for (let i = 0; i < this.pageData.activeRule.length; i++) {
        str += '<p>' + this.pageData.activeRule[i] + '</p>'
      }
      this.boxmsg.content = str
      this.showAlt()
    },
    jumpPage(jumpurl) {
      // 优惠券, 跳转到优惠券列表
      navigate.push({ url: '/pinvite/pages/' + jumpurl })
      // Router.linkto(url)
    },
    // 关闭弹窗
    closealt() {
      this.boxmsg.className = ''
      this.showWinAlt = false
    },
    // //弹窗展示
    showAlt() {
      this.showWinAlt = true
      maidian.view('invite_home_QRcode')
    },
    // 保存图片
    savePic() {
      saveImg(this.QRcodeData)
      maidian.view('invite_home_QRcode_saveImg')
    },
    // 面对面邀请
    face2face() {
      if (this.showFace2face) {
        this.showFace2face = false
      } else {
        this.showFace2face = true
      }
    }
  }
}
// 数值转换
function numberSlim(num, type) {
  num = num || 0
  let str = num.toString()
  if (str.length >= 4) {
    let str1 = ''
    let res = []
    for (let i = str.length; i > 0; i = i - 3) {
      str1 = i > 3 ? ',' + str.substr(i - 3, 3) : str.substr(0, i)
      res.push(str1)
    }
    return res.reverse().join('')
  } else {
    return num
  }
}
</script>
<style lang="less">
@import '../compoments/css/index.less';
</style>
