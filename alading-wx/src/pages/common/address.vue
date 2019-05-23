/**
* Created by xiejun on 2018/10/18.
* address 地址管理
*/
<template>
  <div class="ala-address">
    <!-- 地址列表 -->
    <div v-if="hasAddressList" :class="['ala-address__node-list', {'iphonex-bottom': isIphoneX }]">
      <ala-address-node
        v-for="(addressData, index) in addressList"
        :addressData="addressData"
        :index="index"
        :key="index"
      ></ala-address-node>
    </div>
    <ala-list-empty v-else-if="!isLoad" title="收货地址为空"></ala-list-empty>
    <div :class="['ala-address__btn-add', {'iphonex-bottom': isIphoneX }]">
      <div class="btn-add" @click="onAddClick">手动添加</div>
      <div class="btn-add wechat" @click="onAddWechat">微信添加</div>
    </div>
  </div>
</template>

<script>
import alaListEmpty from 'components/common/listEmpty'
import alaAddressNode from 'components/address/addressNode'

import { mapState, mapMutations, mapActions } from 'vuex'
import systemInfo from 'utils/systemInfo'
import Tips from 'utils/tip'
import navigate from 'utils/navigate'
import wx from 'wx'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {
      isLoad: false,
      wechatData: {}
    }
  },
  props: {},
  computed: {
    ...mapState(['addressList']),
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    hasAddressList() {
      return this.addressList && this.addressList.length
    }
  },
  created() {},
  mounted() {
    this.toGetUserAddressList()
  },
  onShow() {
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  onPullDownRefresh() {
    this.refresh()
  },
  onUnload() {
    this.setIsSelectAddress(false)
  },
  watch: {},
  methods: {
    ...mapMutations(['setIsSelectAddress']),
    ...mapActions(['getUserAddressList', 'setSelectAddressIndex', 'addUserAddress']),
    async refresh() {
      await this.toGetUserAddressList()
      wx.stopPullDownRefresh()
    },
    async addresAddfn(result) {
      console.log(result)
      await this.addUserAddress(result)
      this.toGetUserAddressList()
    },
    async toGetUserAddressList() {
      this.isLoad = true
      Tips.loading()
      await this.getUserAddressList()
      Tips.loaded()
      this.isLoad = false
    },
    // click add
    onAddClick() {
      navigate.push({ url: '/pages/common/addressAdd' })
    },
    // 两个地址数据是否一致
    isEqualAddress(d1, d2) {
      let { userName, telNumber, provinceName, cityName, countyName, detailInfo } = d1
      let { consignee, mobile, province, city, county, address } = d2
      return (
        userName === consignee &&
        telNumber === mobile &&
        provinceName === province &&
        cityName === city &&
        countyName === county &&
        detailInfo === address
      )
    },
    // 微信新增
    onAddWechat() {
      wx.chooseAddress({
        success: res => {
          let findData = this.addressList.find(data => {
            return this.isEqualAddress(res, data)
          })
          if (findData) {
            Tips.toast('已有该收货地址')
          } else {
            let {
              userName: consignee,
              telNumber: mobile,
              provinceName: province,
              cityName: city,
              countyName: county,
              detailInfo: address
            } = res
            let isDefault = 'N'
            this.addAddress({ consignee, mobile, province, city, county, address, isDefault })
          }
        }
      })
    },
    async addAddress(data) {
      await this.addUserAddress(data)
      this.toGetUserAddressList()
    }
  },
  components: { alaListEmpty, alaAddressNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@btn-add-height: 43px;
@btn-add-bottom: 15px;
.ala-address {
  .fill-page(@color-bg);

  .ala-list-empty {
    margin-top: 179px;
  }

  .ala-address__node-list {
    margin-bottom: @btn-add-height + @btn-add-bottom;
    .ala-address-node:first-child {
      margin-top: 0;
    }
  }

  .ala-address__btn-add {
    position: fixed;
    bottom: @btn-add-bottom;
    width: 100%;
    .btn-add {
      height: @btn-add-height;
      line-height: @btn-add-height;
      // margin: 0 17.5px;
      // background: @color-btn;
      // border-radius: 50px;
      text-align: center;
      font-size: @font-size-btn-1;
      color: @color-txt;
      width: 3.3rem;
      height: 0.86rem;
      background: rgba(255, 213, 0, 1);
      box-shadow: 0rem 0.05rem 0.06rem 0rem rgba(255, 215, 5, 0.68);
      border-radius: 0.43rem;
      display: inline-block;
      margin-left: 0.3rem;

      &.wechat {
        background: rgba(20, 204, 76, 1);
        box-shadow: 0rem 0.05rem 0.06rem 0rem rgba(20, 204, 76, 0.6);
        color: #fff;
      }
    }
  }
}
</style>
