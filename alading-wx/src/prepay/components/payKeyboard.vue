<template>
  <div :class="payKeyboardShow?'payKeyboard payKeyboardActive':'payKeyboard'">
    <!--头部-->
    <div class="title">
      <p class="backIcon" @click="backIconClick"></p>
      <p class="word">请输入交易密码</p>
      <p class="des" @click="forgetPwd">忘记密码</p>
    </div>
    <!--输入框-->
    <div class="inputWrap">
      <div class="inputBg" v-for="(i,index) in 6" :key="index" ></div>
      <div class="inputKey">
        <p v-for="(i,index) in payPassword" :key="index" class="everyKey"><span></span></p>
      </div>
    </div>
    <!--数字键盘-->
   <div class="keyboard" :class="isIphoneX?'iphoneX':''">
     <p @click="handleClick(1)">1</p>
     <p @click="handleClick(2)">2</p>
     <p @click="handleClick(3)">3</p>
     <p @click="handleClick(4)">4</p>
     <p @click="handleClick(5)">5</p>
     <p @click="handleClick(6)">6</p>
     <p @click="handleClick(7)">7</p>
     <p @click="handleClick(8)">8</p>
     <p @click="handleClick(9)">9</p>
     <p class="disabled"></p>
     <p @click="handleClick(0)">0</p>
     <p class="backspace" @click="backspace"></p>
    </div>
  </div>
</template>

<script>
import systemInfo from 'utils/systemInfo'
export default {
  name: 'payKeyboard',
  props: ['payKeyboardShow'],
  data() {
    return {
      payPassword: [],
      isIphoneX: systemInfo.isIphoneX
    }
  },
  methods: {
    backspace() {
      if (this.payPassword.length === 0) return
      this.payPassword = this.payPassword.slice(0, -1)
    },
    handleClick(number) {
      if (this.payPassword.length < 6) {
        this.payPassword.push(number)
      }
      if (this.payPassword.length === 6) {
        this.$emit('completed', this.payPassword.join(''))
        this.payPassword = []
      }
    },
    backIconClick() {
      this.payPassword = []
      this.$emit('backIcon_keyBoard', false)
    },
    forgetPwd() {
      this.$emit('forgetPwd')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
@import '~@/styles/base/fn.less';

.payKeyboard {
  width: 100%;
  background-color: @color-bg;
  position: fixed;
  left: 0;
  bottom: -100%;
  z-index: 20;
  transition: all 0.3s;
  .title {
    width:94%;
    padding: 0 4% 0 2%;
    height: 49px;
    background-color: #fff;
    border-bottom: 1px solid @color-border;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .backIcon{
      transform: rotateY(-180deg);
      margin-top:2px;
      .icon('icon_arrow',23px,23px)
    }
    .word {
      font-size: @font-size-label;
      color: @color-txt;
    }
    .des{
      font-size: @font-size-txt;
      color: @color-txt;
    }
  }
  .inputWrap {
    margin: 45px auto 82px;
    width: 341px;
    height: 56px;
    line-height: 57px;
    border:1px solid @color-border-1;
    display: flex;
    position: relative;
    box-sizing: border-box;
    .inputBg,.everyKey{
      width: 16.333%;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right:1px solid @color-border-1;
    }
    .inputBg:nth-child(6){
      border:none;
    }
    .inputKey{
      width:100%;
      height:100%;
      position: absolute;
      top:0;
      left:50%;
      transform: translateX(-170px);
      .everyKey{
        float: left;
        border:none;
      }
      span{
        width:12px;
        height:12px;
        background:@color-btn;
        border-radius: 50%;
      }
    }
  }
  .keyboard {
    width: 100%;
    height:223px;
    background:rgba(207,213,222,1);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding-top:2px;
    p{
      width:122px;
      height:54px;
      background:#fff;
      border-radius:4px;
      margin-bottom: 1px;
      font-size:28px;
      text-align: center;
      line-height: 55px;
    }
    p.backspace {
      background: url(https://f.51fanbei.com/h5/app/activity/2018/04/icon_keyboard_backspace.png) no-repeat center;
      background-size: 22px 16px;
      background-color: transparent;
    }
    p:active {
      background-color: #aaa;
    }
    p.disabled {
      background-color: transparent;
    }
  }
  .iphoneX{
    padding-bottom:@padding-iphonex
  }
}
.payKeyboardActive {
  bottom: 0;
}
</style>
