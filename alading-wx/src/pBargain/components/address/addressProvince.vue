/**
* Created by huangyilu on 2018/11/27.
* 选择省市区 item
*/
<template>
  <div class="help-address-province-item">
    <div class="hap-title__icon">
      <div class="back-icon" @click="bindGoBackFn"></div>
      <div>选择地址</div>
      <div class="cancel-icon" @click="bindCancelFn"></div>
    </div>

    <div class="hap-title__item">
      <div :class="['item-tit', { 'active' : tabIndex===1 }]">{{ province }}</div>
      <div :class="['item-tit', { 'active' : tabIndex===2 }]" v-if="tabIndex>1">{{ city }}</div>
      <div :class="['item-tit', { 'active' : tabIndex===3 }]" v-if="tabIndex>2">{{ area }}</div>
      <!-- <div :class="['item-line', 'to' + tabIndex]"></div> -->
    </div>

    <div class="hap-title__content">
      <!-- 省 -->
      <div
        class="content-item"
        v-for="(value, key, index) in addressData"
        :key="index"
        v-if="tabIndex===1"
      >
        <div class="item__key">{{ key }}</div>
        <div class="item__pro">
          <div
            :class="['item', { 'pro-bottom-none': proi+1 === value.length || value.length <= 1 }]"
            v-for="(proItem, proi) in value"
            :key="proi"
            @click="bindProFn(key, proi)"
          >
            <div class="name">{{ proItem.name }}</div>
            <div class="select-icon" v-if="proItem.name === province"></div>
          </div>
        </div>
      </div>
      <!-- 市 -->
      <div
        class="content-item"
        v-for="(value, key, index) in cityData"
        :key="index"
        v-if="tabIndex===2"
      >
        <div class="item__key">{{ key }}</div>
        <div class="item__pro">
          <div
            :class="['item', { 'pro-bottom-none': cityi+1 === value.length || value.length <= 1}]"
            v-for="(cityItem, cityi) in value"
            :key="cityi"
            @click="bindCityFn(key, cityi)"
          >
            <div class="name">{{ cityItem.name }}</div>
            <div class="select-icon" v-if="cityItem.name === city"></div>
          </div>
        </div>
      </div>
      <!-- 区 -->
      <div
        class="content-item"
        v-for="(value, key, index) in areaData"
        :key="index"
        v-if="tabIndex===3"
      >
        <div class="item__key">{{ key }}</div>
        <div class="item__pro">
          <div
            :class="['item', { 'pro-bottom-none': areai+1 === value.length || value.length <= 1}]"
            v-for="(areaItem, areai) in value"
            :key="areai"
            @click="bindAreaFn(key, areai)"
          >
            <div class="name">{{ areaItem }}</div>
            <div class="select-icon" v-if="areaItem === area"></div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="help-confm__btn"
      :class="{ 'iphonex-bottom' : isIphoneX }"
      @click="bindAddressConfm"
    >确认</div>
  </div>
</template>

<script>
import addressProvinceData from './addressData'

import { mapMutations } from 'vuex'
import systemInfo from 'utils/systemInfo'

export default {
  name: '',
  data () {
    return {
      tabIndex: 1,
      addressData: [],
      cityData: [],
      areaData: [],

      isMunicipality: false,
      province: '选择省',
      city: '选择市',
      area: '选择区县'
    }
  },
  props: {},
  computed: {
    isIphoneX () {
      return systemInfo.isIphoneX
    }
  },
  created () {
    this.addressData = addressProvinceData
    console.log(' addressData = ', this.addressData)
  },
  mounted () { },
  watch: {},
  methods: {
    ...mapMutations('bargain', ['setUserSelectProvince', 'setAddressTCControl']),
    bindGoBackFn () {
      switch (this.tabIndex) {
        case 1:
          this.$emit('provinceBack')
          break
        case 2:
          this.tabIndex = 1
          // this.city = '选择市'
          break
        case 3:
          this.tabIndex = 2
          // this.area = '选择市'
          if (this.isMunicipality) {
            this.tabIndex = 1
          }
          break
      }
    },
    bindProFn (citykey, cityIndex) {
      this.tabIndex = 2
      if (this.addressData[citykey][cityIndex].cityList) {
        this.cityData = this.addressData[citykey][cityIndex].cityList
        this.province = this.addressData[citykey][cityIndex].name
        // console.log(' citydata ', this.cityData)
        this.isMunicipality = false
        this.city = '选择市'
      } else {
        this.tabIndex = 3
        this.areaData = this.addressData[citykey][cityIndex].areaList
        this.province = this.addressData[citykey][cityIndex].name
        this.city = this.addressData[citykey][cityIndex].name
        // console.log(' pro areaData == ', this.areaData)
        this.isMunicipality = true
        this.area = '选择区县'
      }
    },
    bindCityFn (areakey, areaIndex) {
      this.tabIndex = 3
      this.areaData = this.cityData[areakey][areaIndex].areaList
      this.city = this.cityData[areakey][areaIndex].name
      // console.log(' city areaData == ', this.areaData)
    },
    bindAreaFn (areakey, areai) {
      this.area = this.areaData[areakey][areai]
      // console.log(' this.areaData == ', this.area)
    },
    bindAddressConfm () {
      console.log(
        ' address province == ',
        this.province + this.city + this.area
      )
      this.setUserSelectProvince({
        province: this.province,
        city: this.city,
        area: this.area
      })
      this.$emit('provinceBack')
    },
    bindCancelFn () {
      this.setAddressTCControl(-1)
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '../../style/index.less';
.help-address-province-item {
  .hap-title__item {
    display: flex;
    padding: 5px;
    position: relative;
    .item-tit {
      min-width: 50px;
      padding: 10px 0;
      margin: 0 10px;
      font-size: 15px;
      color: @color-txt-999;
      text-align: center;
      &.active {
        color: @color-txt;
        border-bottom: 3px @color-main solid;
      }
    }
    .item-line {
      position: absolute;
      width: 33px;
      height: 3px;
      background: @color-main;
      border-radius: 1.5px;
      top: 30px;
      &.to1 {
        left: 20px;
      }
      &.to2 {
        left: 60px;
      }
      &.to3 {
        left: 168px;
      }
    }
  }
  .hap-title__content {
    overflow-y: scroll;
    height: 287.5px;
    padding: 10px 0;
    .content-item {
      padding: 15px 0 0 15px;
      display: flex;
      .item__key {
        color: @color-txt-999;
        padding-right: 10px;
      }
      .item__pro {
        .flex-n();
        .item {
          padding-bottom: 20px;
          display: flex;
          .name {
            .flex-n();
            height: 20px;
          }
          &.pro-bottom-none {
            padding-bottom: 0;
          }
          .select-icon {
            .icon('cj_address_selected', 20px, 20px);
            margin-right: 15px;
          }
        }
      }
    }
  }
}
</style>
