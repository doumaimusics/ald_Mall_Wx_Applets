/**
* Created by huangyilu on 2018/11/27.
* 选择收货地址 列表
*/
<template>
  <div class="help-address-list">
    <div class="hac__title">
      <div>选择收货地址</div>
      <div class="cancel-icon" @click="bindCancelFn"></div>
    </div>
    <div class="hac__select">
      <address-item
        v-for="(aitem, i) in addressList"
        :key="i"
        :address="aitem"
        :index="i"
        @bindSelectAddress="bindSelectAddressFn(i)"
      />
      <div class="hac-add-address__btn" @click="bindAddAddressFn">+ 添加收货地址</div>
      <div
        class="help-confm__btn"
        :class="{ 'iphonex-bottom' : isIphoneX }"
        @click="bindCreatBargainFn"
      >确认</div>
    </div>
  </div>
</template>

<script>
import addressItem from './addressItem'
import { mapMutations, mapState, mapActions } from 'vuex'
import Tips from 'utils/tip'
import navigate from 'utils/navigate'
import systemInfo from 'utils/systemInfo'
import maidian from 'utils/maidian'

export default {
  name: '',
  data () {
    return {}
  },
  props: {},
  computed: {
    ...mapState('bargain', ['addressList']),
    isIphoneX () {
      return systemInfo.isIphoneX
    }
  },
  created () { },
  mounted () { },
  methods: {
    ...mapMutations('bargain', [
      'setAddressTCControl',
      'setUserSelectEditAddressIndex',
      'setUserSelectProvince'
    ]),
    ...mapActions('bargain', ['createBargain']),
    bindAddAddressFn () {
      this.setAddressTCControl(2)
      this.setUserSelectEditAddressIndex(-1)
      this.setUserSelectProvince(null)
    },
    bindCancelFn () {
      this.setAddressTCControl(-1)
    },
    bindSelectAddressFn (index) {
      this.addressList.forEach(item => {
        item.isSelect = false
      })
      this.addressList[index].isSelect = true
      console.log(' bindSelectAddressFn = ', this.addressList)
    },
    async bindCreatBargainFn () {
      maidian.click('kanjia_homepage_address')
      if (this.addressList.length > 0) {
        let data = await this.createBargain()
        if (data) {
          navigate.push({ url: '/pBargain/pages/bargainDetail?freeOrderId=' + data.freeOrderId + '&recommendId=' + data.userId })
        }
      } else {
        Tips.toast('请选择收货地址')
      }
    }
  },
  components: { addressItem }
}
</script>

<style lang="less">
@import '../../style/index.less';
.help-address-list {
  .hac__select {
    max-height: 700 / @px;
    overflow-y: scroll;
  }
  .hac-add-address__btn {
    border-radius: 40 / @px;
    opacity: 0.5;
    margin: 50 / @px auto 30 / @px;
    border: 1 / @px dashed #666666;
    width: 480 / @px;
    height: 80 / @px;
    color: #666666;
    font-size: 26 / @px;
    font-weight: 500;
    line-height: 80 / @px;
    text-align: center;
  }
}
</style>
