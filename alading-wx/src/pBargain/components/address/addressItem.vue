/**
* Created by huangyilu on 2018/11/27.
* 选择收货地址 item
*/
<template>
  <div class="help-address-item">
    <div class="hai-unselect__icon" v-if="!addressData.isSelect" @click="bindSelectAddress"></div>
    <div class="hai-select__icon" v-if="addressData.isSelect" @click="bindSelectAddress"></div>
    <div class="hai__info" @click="bindSelectAddress">
      <div class="info-name">
        <span>{{ addressData.consignee }}</span>
        <span>{{ addressData.mobile }}</span>
      </div>
      <div class="info-detail">{{ addressDetail }}</div>
    </div>
    <div class="hai-edit__btn" @click="bindEditAddress">编辑</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: '',
  data () {
    return {
      isAddressTap: false
    }
  },
  props: {
    address: {
      type: Object,
      defaults: function () {
        return {}
      }
    },
    index: {
      type: Number,
      default: 0
    }
  },
  computed: {
    addressData () {
      return this.address
    },
    addressDetail () {
      return this.address.province + this.address.city + this.address.county + this.address.address
    }
  },
  created () { },
  mounted () {
    console.log(' address item = ', this.address)
  },
  watch: {},
  methods: {
    ...mapMutations('bargain', [
      'setUserSelectEditAddressIndex',
      'setAddressTCControl',
      'setUserSelectAddress',
      'setUserSelectAddressIndex'
    ]),
    bindEditAddress () {
      this.setUserSelectEditAddressIndex(this.index)
      this.setAddressTCControl(2)
    },
    bindSelectAddress () {
      this.setUserSelectAddress(this.address)
      this.$emit('bindSelectAddress')
    }
  },
  components: {}
}
</script>

<style lang="less">
@import "../../style/index.less";
.help-address-item {
  display: flex;
  align-items: center;
  margin: 0 30 / @px;
  font-size: 28 / @px;
  .border-bottom(#eeeeee);
  .hai-unselect__icon {
    .icon("icon_address_unselected@2x", 60 / @px, 60 / @px);
    opacity: 0.4;
  }
  .hai-select__icon {
    .icon("icon_address_selected@2x", 60 / @px, 60 / @px);
  }
  .hai__info {
    .flex-n();
    margin: 40 / @px 30 / @px;
    padding-right: 70 / @px;
    .border-right(#eeeeee);
    .info-name {
      font-size: 32 / @px;
      margin-bottom: 20 / @px;
      :first-child {
        margin-right: 30 / @px;
      }
    }
  }
}
</style>
