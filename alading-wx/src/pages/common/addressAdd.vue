/**
* Created by xiejun on 2018/10/19.
* 用户收货地址-新增
*/
<template>
  <div class="ala-address-add">
    <ala-address-editor ref="editor" type='add'></ala-address-editor>
    <div class="ala-address-add__btn-add" @click="onClick">完成</div>
  </div>
</template>

<script>
import alaAddressEditor from 'components/address/addressEditor'

import { mapActions } from 'vuex'
import basis from 'utils/basis'
import navigate from 'utils/navigate'

import Monitor from 'utils/monitor'

export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {},
  created() {},
  mounted() {
    console.log('address add mounted')
  },
  onShow() {
    let editor = this.$refs.editor
    if (editor) {
      editor.clearAll()
    }
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
    ...mapActions(['addUserAddress']),
    onClick() {
      basis.clickThrottle(this.onOkClick)
    },
    async onOkClick() {
      let editor = this.$refs.editor
      let result = editor.verifyDataIntegrity()
      if (result) {
        let isSuccess = await this.addUserAddress(result)
        if (isSuccess) navigate.back({ delta: 1 })
      }
    }
  },
  components: { alaAddressEditor }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@btn-add-height: 43px;
.ala-address-add {
  .fill-page(@color-bg);

  .ala-address-add__btn-add {
    height: @btn-add-height;
    line-height: @btn-add-height;
    margin: 0 17.5px;
    background: @color-btn;
    border-radius: 50px;

    margin-top: 20px;
    text-align: center;
    font-size: @font-size-btn-1;
    color: @color-txt;
  }
}
</style>
