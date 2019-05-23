/**
* Created by xiejun on 2018/10/11.
* 登录
*/
<template>
  <div class="ala-login">
    <div class="ala-login__logo"></div>
    <div class="ala-login__phone">
      <input
      @input="onPhoneInputChange"
      type="number"
      v-model="phone"
      placeholder="请输入手机号"
      placeholder-class="login-input-placeholder"
      maxlength="13"
      focus/>
      <div class="btn-clear" v-if="hasPhone" @click="onClearClick"></div>
    </div>
    <div class="ala-login__code">
      <input
      v-model="code"
      type="number"
      placeholder="请输入验证码"
      placeholder-class="login-input-placeholder"
      maxlength="6"/>

      <span
      :class="[ 'btn-code', {'btn-code-disabale': isBtnCodeDisable} ]"
      @click="onCodeClick">
        {{codeTitle}}
      </span>
    </div>

    <!-- <button
    v-if="loginable"
    class="ala-login__btn-confirm"
    open-type="getUserInfo"
    @getuserinfo="onGotUserInfo">
      登录
    </button> -->
    <div
    class="ala-login__btn-confirm"
    @click="onClick"
    :class="{ 'btn-confirm-disable': !loginable }">
      <span>登录</span>
    </div>
    <!-- <div class="ala-login__protocal">未注册用户默认注册并同意<span @click="onPrototalClick">《爱上街注册协议》</span></div> -->
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Tips from 'utils/tip'
import basis from 'utils/basis'
import storage from 'utils/storage'
import navigate from 'utils/navigate'
// import maidian from 'utils/maidian'
import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      // 手机号
      phone: '',
      // 验证码
      code: '',
      // 验证码文本
      codeTitle: '获取验证码'
    }
  },
  props: {},
  computed: {
    ...mapGetters(['hasSendVerfiyCode']),
    // 是否可以登录
    loginable() {
      return this.isPhone && /[0-9]{6}/.test(this.code)
    },
    // 存在手机号码
    hasPhone() {
      return this.phone.length
    },
    // 是否为合法的号码
    isPhone() {
      let mobile = basis.trimAll(this.phone)
      mobile = basis.prettyPhone(mobile)
      return basis.isPhone(mobile)
    },
    // 是否为长度11的数字
    hasPhoneLength() {
      return basis.trimAll(this.phone).length >= 11
    },
    // 返回验证码按钮是否不可用,不可用为true
    isBtnCodeDisable() {
      return !this.hasPhoneLength || this.hasSendVerfiyCode
    }
  },
  created() {},
  onShow() {
    this.code = ''
    this.phone = storage.props.loginMobile
    this.phoneTo334()
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onLoad(options) {
    // 如果账号已经注销了，清除老的token, 并重新获取token
    if (options && options.clearToken) {
      this.setToken(null)
      this.setIsLogin(false)
      this.getToken()
    }
  },
  mounted() {},
  updated() {},
  onUnload() {
    basis.clearCountdown(this.countdownKey)
    this.verifyCodeComplete()
  },
  watch: {
    hasSendVerfiyCode() {
      if (this.hasSendVerfiyCode) {
        this.showCodeCountDown()
      }
    }
  },
  methods: {
    ...mapMutations(['setToken', 'setIsLogin', 'setSendVerifyCodeState']),
    ...mapActions(['sendVerifyCode', 'boundMobile', 'quickLogin', 'getToken']),
    // 转换一下手机号为334格式
    phoneTo334() {
      this.phone = basis.phone344Code(this.phone)
    },
    // 手机号输入及失去焦点
    onPhoneInputChange(event) {
      if (event.target.cursor === this.phone.length) {
        this.phoneTo334()
      }
    },
    // click 清空手机号
    onClearClick() {
      this.phone = ''
    },
    // click 获取验证码
    onCodeClick() {
      basis.clickThrottle(this.clickCodeProcess)
    },
    // click code 处理
    clickCodeProcess() {
      if (this.isBtnCodeDisable) return
      if (this.isPhone) {
        let mobile = basis.trimAll(this.phone)
        mobile = basis.prettyPhone(mobile)
        storage.props.loginMobile = mobile
        this.sendVerifyCode({ mobile })
      } else {
        // 不是合法的
        Tips.toast('请输入正确的手机号码')
      }
    },
    // 取得用户信息
    async onClick(event) {
      if (!this.loginable) return
      // maidian.my(maidian.spm.my_login)

      let mobile = basis.trimAll(this.phone)
      mobile = basis.prettyPhone(mobile)
      let verifyCode = this.code
      let success = await this.quickLogin({mobile, verifyCode, headers: { 'mobile': mobile }})
      if (success) navigate.back({ delta: 1 })
      storage.props.loginMobile = this.phone
    },

    // click 协议
    // onPrototalClick() {
    //   navigate.push({ url: '/pages/common/protocal' })
    // },
    // 显示倒计时
    showCodeCountDown() {
      basis.clearCountdown(this.countdownKey)
      this.countdownKey = basis.oneMinute({
        timer: data => {
          this.codeTitle = data.last + '秒后重发'
        },
        complete: this.verifyCodeComplete
      })
    },
    verifyCodeComplete() {
      this.setSendVerifyCodeState(0)
      this.codeTitle = '获取验证码'
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@logo-size: 70px;
@content-width: 330px;
.ala-login {
  .fill-page();
  .flex-ver-center();
  .ala-login__logo {
    .icon('icon_logo', @logo-size, @logo-size);
    margin-top: 43px;
    margin-bottom: 67px;
  }

  .login-input {
    position: relative;
    .flex-hor-center();
    .border-1px-bottom();
    width: @content-width;
    height: 32px;
    margin-bottom: 27px;
    padding-right: 31px;
    box-sizing: border-box;
    input {
      .flex-n();
      font-size: 17px;
      color: @color-txt;
    }
  }

  .login-input-placeholder {
    font-size: 15px;
    color: #cccccc;
  }

  .ala-login__phone {
    .login-input();
    .btn-clear {
      .icon('icon_cancle', 20px, 20px);
    }
  }
  .ala-login__code {
    .login-input();

    .btn-code {
      margin-top: -3px;
      height: 24px;
      line-height: 24px;
      padding: 0 13px;

      background: @color-btn;
      border-radius: 50px;

      font-size: 11px;
      color: white;
    }

    .btn-code-disabale {
      color: @color-txt;
      background: @color-btn-1;
    }
  }

  .ala-login__btn-confirm {
    margin-top: 23.5px;

    width: @content-width;
    height: 43px;
    line-height: 43px;
    border-radius: 50px;
    background: @color-btn;
    text-align: center;

    font-size: 17px;
    color: @color-txt;
  }

  .btn-confirm-disable {
    background: @color-btn-1;
  }

  .ala-login__protocal {
    margin-top: 13px;

    font-size: @font-size-tip;
    color: @color-txt;
  }
}
</style>
