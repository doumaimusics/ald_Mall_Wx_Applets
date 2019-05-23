/**
* Created by liuguangqing on 2018/10/11.
* 显示二维码
*/
<template>
  <div class="container">
    <div>
        <div>
            <span>路径:</span>
            <input type="text" placeholder="请输入路径" class="intoprot" v-model="getpath">
        </div>
        <div>
            <span>参数:</span>
            <input type="text" placeholder="请输入参数" class="intoprot" v-model="getparam">
        </div>
    </div>
    <div @click="createRr" class="createBtn">生成二维码</div>
    <div class="desc">注意：最新参数格式<span>a,key=value,key1=value1</span></div>
    <img v-if="QRcodeData" :src="QRcodeData" alt="" class="qrCodeBox">
    <input type="text" :value="QRcodeData"  class="intoprot">
  </div>
</template>

<script>
// import { Base64 } from 'js-base64'
import { mapState, mapActions } from 'vuex'
// import storage from 'utils/storage'
// import navigate from 'utils/navigate'
import Monitor from 'utils/monitor'

export default {
  data() {
    return {
      getpath: 'pages/common/goodsDetail',
      getparam: 'a,key=value,key1=value1',
      imageUrl: ''
    }
  },
  props: {},
  created() {},
  mounted() {},
  onLoad(options) {},
  onShow() {
    // let options = storage.props.launchOptions
    // if (options && options.query.page) {
    // }
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  computed: {
    ...mapState('invite', ['QRcodeData'])
  },
  methods: {
    ...mapActions('invite', ['getQRcode']),
    async toGetQrCodeData(param) {
      await this.getQRcode(param)
      console.log(this.QRcodeData)
    },
    createRr() {
      let params = {
        // scene: Base64.encode(this.getparam),
        scene: this.getparam,
        page: this.getpath
      }
      this.toGetQrCodeData(params)
    }
  }
}
</script>

<style lang="less">
div {
  padding: 0.04rem 0;
}
.container {
  padding: 0.1rem;
  box-sizing: border-box;
}
.qrCodeBox {
  width: 4rem;
  height: 4rem;
}
.intoprot {
  width: 4rem;
  border: 1px solid #ccc;
  color: #bbb;
  border-radius: 0.06rem;
  padding: 0 0.1rem;
}
.createBtn {
  height: 0.6rem;
  line-height: 0.6rem;
  width: 2rem;
  text-align: center;
  background-color: skyblue;
  color: #fff;
  border-radius: 0.06rem;
}
</style>
