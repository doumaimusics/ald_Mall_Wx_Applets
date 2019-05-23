/**
* Created by xiejun on 2018/10/19.
* 用户收货地址编辑
*/
<template>
  <div class="ala-address-editor">
    <div class="ala-address-editor__name">
      <span class="editor-title">收件人</span>
      <input
      class="editor-input"
      v-model="userName"
      type="text"
      placeholder="请输入收件人"
      placeholder-class="editor-input-placeholder"
      maxlength="15"/>
    </div>
    <div class="ala-address-editor__mobile">
      <span class="editor-title">手机号</span>
      <input
      class="editor-input"
      @input="onMobileInputChange"
      v-model="mobile"
      type="number"
      placeholder="请输入手机号码"
      placeholder-class="editor-input-placeholder"
      maxlength="13"/>
    </div>
    <div class="ala-address-editor__address">
      <span class="editor-title">所在地区</span>
      <picker mode="region" :value="region" @change="onRegionChange">
        <div class="address-info">
          <span 
          class="address-info__show" 
          :class="{'address-info__show-placeholder':region.length === 0}">
            {{regionStr}}
          </span>
          <div class="address-info__icon-arrow"></div>
        </div>
      </picker>
    </div>
    <div class="ala-address-editor__address-detail">
      <span class="editor-title">详细地址</span>
      <textarea 
      class="editor-input"
      type="text" 
      @input="onAddressInputChange"
      @blur="onAddressInputChange"
      :value="address"
      placeholder="详细地址不少于5个字"
      placeholder-class="editor-input-placeholder">
      </textarea>
    </div>
    <div class="ala-address-editor__default">
      <span class="editor-title" >设为默认</span>
      <switch @change="onIsDefaultChange" :checked="isDefault"></switch>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import basis from 'utils/basis'
import Tips from 'utils/tip'
export default {
  name: '',
  data() {
    return {
      userName: '',
      mobile: '',
      address: '',
      isDefault: false,
      region: []
    }
  },
  props: {
    type: {
      type: String,
      default: 'edit'
    }
  },
  computed: {
    ...mapGetters(['editAddressData']),
    regionStr() {
      let result = '请选择你所在的省市地区'
      if (this.region.length) {
        result = this.region.join(' ')
      }
      return result
    }
  },
  created() {},
  mounted() {
    this.udpateEditorData()
  },
  watch: {
    editAddressData() {
      this.udpateEditorData()
    }
  },
  methods: {
    // 清空所有
    clearAll() {
      this.userName = ''
      this.mobile = ''
      this.region = []
      this.address = ''
      this.isDefault = false
    },
    // 更新编辑数据
    udpateEditorData() {
      if (this.editAddressData && this.type === 'edit') {
        let addressData = this.editAddressData
        // 更新数据
        this.userName = addressData.consignee
        this.mobile = addressData.mobile
        this.region = [addressData.province, addressData.city, addressData.county]
        this.address = addressData.address
        this.isDefault = addressData.isDefault === 'Y'
      }
      this.phoneTo344()
    },
    // 验证数据完整性并返回用户输入结果
    verifyDataIntegrity() {
      // 验证收件人不为空
      let consignee = basis.trimAll(this.userName)
      if (!consignee) {
        Tips.toast('请输入收件人姓名')
        return false
      }
      // 验证手机号
      let mobile = basis.trimAll(this.mobile)
      mobile = basis.prettyPhone(mobile)
      if (!mobile) {
        Tips.toast('请输入手机号码')
        return false
      }
      if (!basis.isPhone(mobile)) {
        Tips.toast('请输入正确的手机号')
        return false
      }
      // 验证地址
      if (!this.region.length) {
        Tips.toast('请选择所在地区')
        return false
      }
      let address = basis.trimAll(this.address)
      if (address.length < 5) {
        Tips.toast('详细地址不能少于5个字')
        return false
      }

      let data = {
        consignee,
        mobile,
        province: this.region[0],
        city: this.region[1],
        county: this.region[2],
        address,
        isDefault: this.isDefault ? 'Y' : 'N'
      }
      if (this.type === 'edit') data.addressId = this.editAddressData.rid

      return data
    },
    // 转换一下手机号为334格式
    phoneTo344() {
      this.mobile = basis.phone344Code(this.mobile)
    },
    // 手机号输入
    onMobileInputChange(event) {
      console.log('mobile input change', event)
      if (event.target.cursor === this.mobile.length) {
        this.phoneTo344()
        console.log('mobile input change need to 334', this.mobile)
      }
    },
    // 地区改变
    onRegionChange(event) {
      this.region = event.target.value
    },
    // 详细地址文本输入及失去焦点
    onAddressInputChange(event) {
      let target = event.target
      this.address = target.value
    },
    // 是否为默认地址
    onIsDefaultChange(event) {
      let target = event.target
      if (target) {
        this.isDefault = target.value
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@padding: 6px;
@cell-height: 40px;
.ala-address-editor {
  .padding-h(@padding-h);
  padding-top: @padding;
  background: white;

  .editor-cell() {
    position: relative;
    .border-1px-bottom();

    .flex-hor-center();
    margin-top: @padding;
    height: @cell-height;
  }
  .ala-address-editor__name {
    .editor-cell();
  }
  .ala-address-editor__mobile {
    .editor-cell();
  }
  .ala-address-editor__address {
    .editor-cell();

    picker {
      .flex-n();
    }

    .address-info {
      .flex-hor-center();
      height: @cell-height;
      .address-info__show {
        .editor-input();
        .show-line();
        .flex-n();
      }
      .address-info__show-placeholder {
        color: #cccccc;
      }
      .address-info__icon-arrow {
        .icon-arrow();
      }
    }
  }
  .ala-address-editor__address-detail {
    .editor-cell();
    margin-top: 15.5px;
    height: 110px;
    .editor-title {
      display: inline-block;
      height: 80px;
    }
    .editor-input {
      margin-top: -10px;
      height: 80px;
    }
  }
  .ala-address-editor__default {
    .flex-hor-center();
    height: 46px;
    .editor-title {
      .flex-n();
    }
  }
  .editor-title {
    font-size: @font-size-list;
    color: @color-txt-2;
    width: 88px;
  }
  .editor-input {
    font-size: @font-size-list;
    color: @color-txt;
    .flex-n();
  }
  .editor-input-placeholder {
    color: #cccccc;
  }
  .wx-switch-input {
    width: 42px !important;
    height: 25px !important;
  }
  .wx-switch-input::before {
    width: 40px !important;
    height: 23px !important;
  }
  .wx-switch-input::after {
    width: 22.5px !important;
    height: 22.5px !important;
  }
}
</style>