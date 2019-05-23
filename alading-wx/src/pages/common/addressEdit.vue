/**
* Created by xiejun on 2018/10/19.
* 用户收货地址-编辑
*/
<template>
  <div class="ala-address-edit">
    <ala-address-editor ref="editor" type="edit"></ala-address-editor>
    <div class="ala-address-edit__btn-save" @click="onSaveClick">保存</div>
    <div class="ala-address-edit__btn-delete" @click="onDeleteClick">删除地址</div>
  </div>
</template>

<script>
import alaAddressEditor from 'components/address/addressEditor'

import { mapState, mapGetters, mapActions } from 'vuex'
import Tips from 'utils/tip'
import basis from 'utils/basis'
import navigate from 'utils/navigate'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapState(['currentEditAddressIndex']),
    ...mapGetters(['editAddressData'])
  },
  created() {},
  mounted() {},
  onShow() {
    Monitor.pageShow()
  },
  onHide() {
    Monitor.pageHide()
  },
  onError() {
    Monitor.pageError()
  },
  watch: {},
  methods: {
    ...mapActions(['changeUserAddress', 'deleteUserAddress']),
    onSaveClick() {
      basis.clickThrottle(this.saveClickProcess)
    },
    async saveClickProcess() {
      let editor = this.$refs.editor
      let result = editor.verifyDataIntegrity()
      if (result) {
        let isSuccess = await this.changeUserAddress({ params: result, index: this.currentEditAddressIndex })
        if (isSuccess) {
          Tips.toast('修改成功')
          navigate.back({ delta: 1 })
        }
      }
    },
    // click 删除
    onDeleteClick() {
      basis.clickThrottle(this.deleteClickProcess)
    },
    async deleteClickProcess() {
      // 删除用户地址
      let params = {
        addressId: this.editAddressData.rid,
        isDefault: this.editAddressData.isDefault
      }
      let isSuccess = await this.deleteUserAddress({ params, index: this.currentEditAddressIndex })
      if (isSuccess) navigate.back({ delta: 1 })
    }
  },
  components: { alaAddressEditor }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@btn-add-height: 43px;
.ala-address-edit {
  .fill-page(@color-bg);

  .btn-address() {
    height: @btn-add-height;
    line-height: @btn-add-height;
    margin: 0 17.5px;
    background: @color-btn;
    border-radius: 50px;

    text-align: center;
    font-size: @font-size-btn-1;
    color: @color-txt;
  }

  .ala-address-edit__btn-save {
    .btn-address();
    margin-top: 20px;
    margin-bottom: 22px;
  }

  .ala-address-edit__btn-delete {
    .btn-address();
    color: @color-txt-1;
    background: none;
    border: 1rpx solid #666666;
    box-sizing: border-box;
  }
}
</style>
