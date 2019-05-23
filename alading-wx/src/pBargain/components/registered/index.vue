/**
* Created by huangyilu on 2018/12/05.
* 帮砍弹窗（注册框）
*/
<template>
  <div class="bargan-registered-view">
    <!-- icon -->
    <div class="brv-icon" @click="bindCancelFn"></div>
    <!-- title -->
    <div class="brv-title">助力好友免费拿</div>
    <!-- 手机号 -->
    <!-- v-model="mobile" -->
    <input
      class="brv-tel"
      type="number"
      maxlength="11"
      placeholder="输入手机号"
      @input="bindMobileInput"
    >
    <!-- 验证码  v-model="verifyCode" -->
    <div class="brv-sms">
      <input
        class="brv-tel"
        type="tel"
        maxlength="6"
        placeholder="验证码"
        @input="bindVerifyCodeInput"
      >
      <div
        :class="['brv-sms-btn', {'btn-code-disabale': isBtnCodeDisable}]"
        @click="onCodeClick"
      >{{ codeTitle }}</div>
    </div>
    <!-- 提示 -->
    <div :class="['brv-remind-txt', { 'brt-empty': !showToast }]">请输入正确的手机号</div>
    <!-- 按钮 -->
    <button class="brv-join-btn" open-type="getUserInfo" @getuserinfo="bindGetuserinfoFn">参与活动</button>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'
import Tips from 'utils/tip'
import basis from 'utils/basis'
import navigate from 'utils/navigate'

export default {
  name: '',
  data () {
    return {
      // 手机号
      mobile: '',
      // 验证码
      verifyCode: '',
      // 是否显示提示文本
      showToast: false,
      // 验证码文本
      codeTitle: '获取验证码',
      // 验证码倒计时key
      countdownKey: ''
    }
  },
  props: {
    freeOrderId: {
      type: Number,
      default: () => {
        return {}
      }
    },
    recommendId: {
      type: Number,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    ...mapGetters('bargain', ['hasSendVerfiyCode']),
    // 是否可以注册
    loginable () {
      return this.mobile && /[0-9]{6}/.test(this.verifyCode)
    },
    // 返回验证码按钮是否不可用,不可用为true
    isBtnCodeDisable () {
      return !this.hasPhoneLength || this.hasSendVerfiyCode
    },
    // 是否为长度11的数字
    hasPhoneLength () {
      return this.mobile.length === 11
    }
  },
  created () { },
  mounted () {
    console.log(' this.recommendId == ', this.recommendId)
    console.log(' this.freeOrderId == ', this.freeOrderId)
  },
  destroyed () {
    // 清除 计时器
    basis.clearCountdown(this.countdownKey)
    this.verifyCodeComplete()
  },
  watch: {
    hasSendVerfiyCode () {
      if (this.hasSendVerfiyCode) {
        this.showCodeCountDown()
      }
    }
  },
  methods: {
    ...mapActions('bargain', ['registered', 'sendVerifyCode']),
    ...mapMutations('bargain', ['setIsRegisteredShow', 'setSendVerifyCodeState']),
    // 手机号
    bindMobileInput (event) {
      this.mobile = event.mp.detail.value
    },
    bindVerifyCodeInput (event) {
      this.verifyCode = event.mp.detail.value
    },
    // click 获取验证码
    onCodeClick () {
      basis.clickThrottle(this.clickCodeProcess)
    },
    // click code 处理
    clickCodeProcess () {
      if (this.isBtnCodeDisable) return
      if (this.mobile) {
        this.sendVerifyCode({
          mobile: this.mobile
        })
      } else {
        // 不是合法的
        this.showToast = true
      }
    },
    // 显示倒计时
    showCodeCountDown () {
      basis.clearCountdown(this.countdownKey)
      this.countdownKey = basis.oneMinute({
        timer: data => {
          this.codeTitle = data.last + '秒后重发'
        },
        complete: this.verifyCodeComplete
      })
    },
    verifyCodeComplete () {
      this.setSendVerifyCodeState(0)
      this.codeTitle = '获取验证码'
    },
    bindSendCodeFn () {
      console.log(' bindSendCodeFn = ', this.mobile)
      if (!this.mobile) {
        Tips.toast('请输入手机号')
        return
      }
      if (this.mobile.length < 11) {
        this.showToast = true
        return
      }
      this.showToast = false
      this.sendVerifyCode({
        mobile: this.mobile
      })
    },
    async bindRegisterFn (data) {
      // console.log(' input phone == ', this.mobile)
      // console.log(' input smsCode == ', this.verifyCode)
      let value = {
        registerName: this.mobile,
        verifyCode: this.verifyCode,
        recommendId: +this.recommendId,
        encryptedData: data.encryptedData,
        iv: data.iv,
        freeOrderId: +this.freeOrderId,
        thirdInfo: JSON.stringify(data.userInfo)
      }
      console.log('bindRegisterFn value  ', value)
      Tips.loading()

      let res = await this.registered(value)
      if (res) {
        // 取消 注册弹窗
        this.setIsRegisteredShow(false)
        // 更新 本页数据
        navigate.replace({
          url: '/pBargain/pages/bargainDetail?freeOrderId=' + this.freeOrderId + '&recommendId=' + this.recommendId
        })
        Tips.loaded()
      }
    },
    bindCancelFn () {
      this.setIsRegisteredShow(false)
    },
    async bindGetuserinfoFn (e) {
      console.log(e)
      if (!this.loginable) return
      this.bindRegisterFn({
        encryptedData: e.mp.detail.encryptedData,
        iv: e.mp.detail.iv,
        userInfo: e.mp.detail.userInfo
      })
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '../../style/index.less';
.bargan-registered-view {
  background-color: #ffffff;
  width: 250px;
  margin: 150px auto;
  border-radius: 5px;
  padding: 20px;
  position: relative;
  .brv-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    .icon('icon_close_black@2x', 20px, 20px);
  }
  .brv-tel {
    padding: 10px;
    .border();
  }
  .brv-title {
    color: #333333;
    font-size: 16px;
    font-weight: 500;
    padding-bottom: 20px;
    text-align: center;
  }
  .brv-sms {
    display: flex;
    margin-top: 20px;
    margin-bottom: 2px;
    font-size: 13px;
    color: @color-txt;
    input {
      .flex-n();
    }
    .brv-sms-btn {
      background-color: @color-main;
      margin-left: 15px;
      // line-height: 38.25px;
      align-items: center;
      display: flex;
      padding: 0 10px;
      &.btn-code-disabale {
        color: @color-txt;
        background: #cccccc;
      }
    }
  }
  .brv-remind-txt {
    color: #fc2929;
    font-size: 12px;
    &.brt-empty {
      opacity: 0;
    }
  }
  .brv-join-btn {
    text-align: center;
    background-color: @color-main;
    height: 40px;
    line-height: 40px;
    border-radius: 40px;
    margin-top: 10px;
  }
}
</style>
