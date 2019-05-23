/**
* Created by huangyilu on 2018/11/27.
* 添加/编辑/收货地址
*/
<template>
  <div class="help-address-input-item">
    <div class="hap-title__icon" v-if="!provinceShow">
      <div class="back-icon" @click="bindGoBackFn"></div>
      <div>编辑收货地址</div>
      <div class="cancel-icon" @click="bindCancelFn"></div>
    </div>

    <div v-if="!provinceShow">
      <div class="hai-input__item">
        <div class="tit">收件人</div>
        <input type="text" v-model="consignee" placeholder="请输入收件人">
      </div>
      <div class="hai-input__item">
        <div class="tit">手机号</div>
        <!-- :placeholder="phonePlaceholder"  -->
        <input type="number" maxlength="11" v-model="mobile" @input="bindMobileInput">
      </div>
      <div class="hai-input__item" @click="provinceShow=true">
        <div class="tit">所在地区</div>
        <div class="text-placeholder" v-if="!selectProvince">点击选择</div>
        <div class="text-value" v-if="selectProvince">
          <span>{{ selectProvince.province }}</span>
          <span>{{ selectProvince.city }}</span>
          <span>{{ selectProvince.area }}</span>
        </div>
      </div>
      <div class="hai-input__item">
        <div class="tit">详细地址</div>
        <input type="text" v-model="addressDetail" placeholder="如道路、门牌号、小区楼栋号、单位时等">
      </div>
      <div class="hai-input__item border-none">
        <div class="tit flex-1">设为默认地址</div>
        <div>
          <ala-switch :switchTap="isDefault" @getSwitchDataFn="getSwitchDataFn"/>
        </div>
      </div>
      <div
        class="help-confm__btn"
        :class="{ 'iphonex-bottom' : isIphoneX }"
        @click="bindSaveFn"
      >保存地址</div>
    </div>

    <!-- 选择省市区 -->
    <div v-if="provinceShow">
      <address-province @provinceBack="provinceShow=false"/>
    </div>
  </div>
</template>

<script>
import alaSwitch from '../../../components/alaUI/ala-switch'
import addressProvince from './addressProvince'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import Tips from 'utils/tip'
import _ from 'lodash'
import systemInfo from 'utils/systemInfo'

export default {
  name: '',
  data () {
    return {
      // 收件人
      consignee: '',
      // 手机号
      mobile: '',
      // 详细地址
      addressDetail: '',
      // 设置编辑时 是否为默认地址
      isDefaultData: false,
      // 获取 最终 用户是否设置为默认地址
      isDefault: false,
      provinceShow: false,

      phonePlaceholder: '请输入手机号码'
    }
  },
  props: {
    address: {
      type: Object,
      defaults: function () {
        return {}
      }
    }
  },
  computed: {
    ...mapState('bargain', ['selectProvinceData', 'selectAddress']),
    ...mapGetters('bargain', ['selectEditAddress']),
    isIphoneX () {
      return systemInfo.isIphoneX
    },
    selectProvince () {
      console.log(' selectProvinceData ', this.selectProvinceData)
      console.log(' selectEditAddress ', this.selectEditAddress)
      if (this.selectProvinceData) return this.selectProvinceData
      if (this.selectEditAddress) {
        return {
          province: this.selectEditAddress.province,
          city: this.selectEditAddress.city,
          area: this.selectEditAddress.county,
          rid: this.selectEditAddress.rid
        }
      }
    }
  },
  created () {
    console.log('selectEditAddress == ', this.selectEditAddress)
    if (this.selectEditAddress) {
      this.consignee = this.selectEditAddress.consignee
      this.mobile = this.selectEditAddress.mobile
      this.addressDetail = this.selectEditAddress.address
      this.isDefaultData = this.selectEditAddress.isDefault === 'Y'
      this.isDefault = this.selectEditAddress.isDefault === 'Y'
      // this.phonePlaceholder = this.selectEditAddress.mobile
    }
  },
  mounted () { },
  watch: {},
  methods: {
    ...mapMutations('bargain', ['setAddressTCControl']),
    ...mapActions('bargain', ['addUserAddress', 'createBargain', 'changeUserAddress']),
    // 设默认地址按钮
    getSwitchDataFn (data) {
      this.isDefault = data
      console.log(' getSwitchDataFn == ', this.isDefault)
    },
    // 手机号
    // bindMobileInput (event) {
    //   this.mobile = event.mp.detail.value
    // },
    bindSaveFn () {
      // 判空
      let addressValue = this.checkUserAddress()
      if (!addressValue) {
        return
      }
      // 编辑更新/新增地址
      this.saveUserAddress(addressValue)
    },
    checkUserAddress () {
      let addressValue = {
        mobile: this.mobile,
        consignee: this.consignee,
        address: this.addressDetail,
        province: this.selectProvince.province,
        city: this.selectProvince.city,
        county: this.selectProvince.area,
        isDefault: this.isDefault ? 'Y' : 'N'
      }
      let isNull = false
      _.forIn(addressValue, function (value, key) {
        if (value === '') {
          isNull = true
        }
      })
      if (isNull) {
        Tips.toast('请填写完整地址')
        return
      }
      return addressValue
    },
    async saveUserAddress (addressValue) {
      // 编辑更新/新增地址
      let data = null
      Tips.loading()

      if (this.selectEditAddress) {
        addressValue.addressId = this.selectEditAddress.rid
        console.log(' addressValue === ', addressValue)
        data = await this.changeUserAddress(addressValue)
        console.log(' changeUserAddress return data ', data)
        if (data !== null) {
          Tips.loaded()
          Tips.success('保存成功').then(() => {
            this.setAddressTCControl(1)
          })
        }
      } else {
        data = await this.addUserAddress(addressValue)
        if (data !== null) {
          Tips.loaded()
          Tips.success('添加成功').then(() => {
            this.setAddressTCControl(1)
          })
        }
      }
    },
    bindGoBackFn () {
      this.setAddressTCControl(1)
    },
    bindCancelFn () {
      this.setAddressTCControl(-1)
    }
  },
  components: { alaSwitch, addressProvince }
}
</script>

<style lang="less">
@import '../../style/index.less';
.help-address-input-item {
  color: @color-txt-666;
  font-size: 14px;
  .hai-input__item {
    margin: 0 15px;
    padding: 15px 0;
    display: flex;
    .flex-1 {
      .flex-n();
    }
    .border-bottom(#c7c7c7);
    .tit {
      width: 84px;
    }
    input {
      .flex-n();
      width: 100%;
      font-size: 14px;
    }
    .text-value {
      .flex-n();
      color: @color-txt;
      span {
        margin-right: 5px;
      }
    }
  }
  .border-none {
    border-style: none;
  }
}
</style>
