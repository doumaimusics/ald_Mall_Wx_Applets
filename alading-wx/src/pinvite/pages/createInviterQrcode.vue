/**
* Created by xiejun on 2019/03/13.
* 生成邀请码
*/
<template>
  <div class="create-inviter-qrcode">
    <qrcode-menu @selectChange="onSelectChange" :select="select" :menus="menus"></qrcode-menu>
    <div v-if="isChannel" class="input-channel">
      <input-node placeholder="请输入推广渠道" @change="onSceneChange" :input="scene"/>
    </div>
    <div v-else-if="select === 1" class="input-page">
      <input-node placeholder="请输入路径" @change="onPageChange" :input="page"/>
      <input-node placeholder="请输入参数a,key=value" @change="onSceneChange" :input="scene"/>
    </div>

    <div class="btn" @tap="onTap" :class="{ 'disable': isCreateDisable }">生成</div>
    <div v-show="hasQrcode" class="qrcode-box">
      <img class="qrcode" :src="qrcodeUrl" mode="aspectFill">
      <div class="btn save" @tap="onSaveTap">保存二维码</div>
    </div>
  </div>
</template>

<script>
import qrcodeMenu from './components/qrcodeMenu'
import inputNode from './components/inputNode'

import { mapState, mapActions } from 'vuex'
import { saveImg } from 'utils/saveImg'
export default {
  name: '',
  components: { qrcodeMenu, inputNode },
  data() {
    return {
      menus: ['推广渠道', '小程序'],
      select: 0,
      qrcodeUrl: '',

      page: 'pages/index/index',
      scene: ''
    }
  },
  props: {},
  computed: {
    ...mapState('invite', ['QRcodeData']),
    isCreateDisable() {
      return this.page === '' || this.scene === ''
    },
    hasQrcode() {
      return typeof this.QRcodeData === 'string'
    },
    isChannel() {
      return this.select === 0
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapActions('invite', ['getQRcode']),
    onSelectChange(select) {
      this.select = select

      this.page = ''
      if (this.isChannel) {
        this.page = 'pages/index/index'
      }
    },
    onPageChange(text) {
      this.page = text
    },
    onSceneChange(text) {
      this.scene = text
    },
    async onTap() {
      let params = {
        scene: this.scene,
        page: this.page
      }
      await this.getQRcode(params)
      this.qrcodeUrl = ''
      setTimeout(() => {
        this.qrcodeUrl = this.QRcodeData
      }, 100)
    },
    onSaveTap() {
      saveImg(this.QRcodeData)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.create-inviter-qrcode {
  .fill-page(white);
  .flex-ver-center();
  box-sizing: border-box;
  .title {
    font-size: 20px;
  }
  .btn {
    margin-top: 23.5px;

    width: 330px;
    height: 43px;
    line-height: 43px;
    border-radius: 50px;
    background: @color-btn;
    text-align: center;

    font-size: 17px;
    color: @color-txt;

    &.disable {
      background: @color-btn-1;
    }

    &.save {
      margin: auto;
      margin-top: 20px;
      height: 30px;
      line-height: 30px;
      width: 160px;
    }
  }

  .qrcode {
    margin-top: 30px;
    width: 330px;
    height: 330px;
  }
}
</style>