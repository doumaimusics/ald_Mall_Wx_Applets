/**
* Created by xiejun on 2018/10/18.
* 地址项
*/
<template>
  <div class="ala-address-node" @click="onOrderConfirmSelectClick">
    <div class="ala-address-node__info-base">
      <span class="info-base-name">{{addressData.consignee}}</span>
      <span class="info-base-mobile">{{mobileCode}}</span>
    </div>
    <div class="ala-address-node__address">{{address}}</div>
    <div class="ala-address-node__menu">
      <ala-address-node-menu-select-node @select="onSelectClick" :isSelect="isSelect" title="默认地址"/>
      <div class="menu-fill"></div>
      <ala-address-node-menu-node @click="onEditClick" index="0" title="编辑"/>
      <ala-address-node-menu-node @click="onDeleteClick" index="1" title="删除"/>
    </div>
  </div>
</template>

<script>
import alaAddressNodeMenuSelectNode from './addressNodeMenuSelectNode'
import alaAddressNodeMenuNode from './addressNodeMenuNode'

import { mapState, mapMutations, mapActions } from 'vuex'
import basis from 'utils/basis'
import Tips from 'utils/tip'
import navigate from 'utils/navigate'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    index: {
      type: Number,
      default: 0
    },
    addressData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    ...mapState(['isSelectAddress']),
    mobileCode() {
      return basis.phone344Code(this.addressData.mobile)
    },
    address() {
      let result = ''
      let data = this.addressData
      let keys = ['province', 'city', 'county', 'address']
      keys.forEach(value => (result = result + data[value]))
      return result
    },
    // 是否为默认选中
    isSelect() {
      return this.addressData.isDefault === 'Y'
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations(['setCurrentEditAddressIndex', 'setUserSelectAddress']),
    ...mapActions(['changeUserDefaultAddress', 'deleteUserAddress']),
    async onSelectClick() {
      // 更新默认地址
      this.changeUserDefaultAddress(this.index)
    },
    // click 编辑
    onEditClick() {
      this.setCurrentEditAddressIndex(this.index)
      navigate.push({ url: '/pages/common/addressEdit' })
    },
    // click 删除
    onDeleteClick() {
      basis.clickThrottle(this.deleteClickProcess)
    },
    // click 选择
    onOrderConfirmSelectClick() {
      if (!this.isSelectAddress) return
      // 更新选择的地址
      Tips.loading()
      // this.setUserSelectAddress(this.index)
      this.setUserSelectAddress(this.addressData)
      setTimeout(() => {
        Tips.loaded()
        navigate.back({ delta: 1 })
      }, 600)
    },
    deleteClickProcess() {
      Tips.confirm('确定要删除该地址？').then(() => {
        // 删除用户地址
        let params = {
          addressId: this.addressData.rid,
          isDefault: this.addressData.isDefault
        }
        this.deleteUserAddress({ params, index: this.index })
      })
    }
  },
  components: { alaAddressNodeMenuSelectNode, alaAddressNodeMenuNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-address-node {
  position: relative;
  .border-1px-top();

  margin-top: 10px;

  padding-top: 19px;
  .padding-h(@padding-h);
  color: @color-txt;
  background-color: white;

  .ala-address-node__info-base {
    font-family: PingFangSC-Medium;
    font-size: @font-size-list;
    .flex-hor-center();
    .info-base-name {
      .flex-n();
    }
    .info-base-mobile {
      margin-right: 19px;
    }
  }

  .ala-address-node__address {
    margin-top: 8.5px;
    font-size: @font-size-list;
    line-height: 19px;
  }

  .ala-address-node__menu {
    position: relative;
    .border-1px-top();
    margin-top: 20.5px;
    height: 37px;
    .flex-hor-center();

    .menu-fill {
      .flex-n();
    }
  }
}
</style>
