/**
* Created by huangyilu on 2018/11/27.
* 选择收货地址 弹窗
*/
<template>
  <div class="help-address-view">
    <div class="help-address__content" :class="{ 'iphonex-fixed-bottom' : isIphoneX }">
      <!-- 收货地址列表 -->
      <address-list v-if="addressTCControl === 1"/>
      <!-- 编辑/添加 收货地址 -->
      <address-input v-if="addressTCControl === 2"/>
    </div>
  </div>
</template>

<script>
import addressItem from './addressItem'
import addressList from './addressList'
import addressInput from './addressInput'
import { mapState } from 'vuex'
import systemInfo from 'utils/systemInfo'

export default {
  name: '',
  data () {
    return {}
  },
  props: {},
  computed: {
    ...mapState('bargain', ['addressTCControl']),
    isIphoneX () {
      return systemInfo.isIphoneX
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {},
  components: { addressItem, addressInput, addressList }
}
</script>

<style lang="less">
@import "../../style/index.less";
.hap-title__icon {
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 16px;
  padding: 14px;
  :nth-child(2) {
    flex: 1;
  }
  .cancel-icon {
    .icon("icon_close_black@2x", 20px, 20px);
  }
  .back-icon {
    .icon-arrow(20px, 180deg);
  }
}
.help-confm__btn {
  width: 100%;
  height: 50px;
  background-color: @color-main;
  font-size: 17px;
  line-height: 50px;
  text-align: center;
  position: fixed;
  bottom: 0;
}
.help-address-view {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  z-index: 1000;
  .help-address__content {
    width: 100%;
    background-color: #ffffff;
    height: 410px;
    position: fixed;
    bottom: 50px;
    border-radius: 10px 10px 0 0;
    &.iphonex-fixed-bottom {
      bottom: 84px;
    }
    .hac__title {
      text-align: center;
      font-size: 16px;
      padding: 14px;
      display: flex;
      align-items: center;
      .border-bottom();
      :first-child {
        .flex-n();
      }
      .cancel-icon {
        .icon("icon_close_black@2x", 20px, 20px);
      }
    }
  }
}
</style>
