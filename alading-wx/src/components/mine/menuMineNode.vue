/**
* Created by xiejun on 2018/10/17.
* menu mine node 我的菜单节点
*/
<template>
  <div class="ala-menu-mine-node" @click="onClick">
    <div :class="'ammn__icon-' + index"></div>
    <div class="ammn__title">{{title}}</div>
    <div class="ammn__icon-arrow"></div>
  </div>
</template>

<script>
import basis from 'utils/basis'
import navigate from 'utils/navigate'
import maidian from 'utils/maidian'
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
    title: {
      type: String,
      default: ''
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onClick() {
      basis.clickThrottle(this.clickProcess)
    },
    clickProcess() {
      // 0收货地址管理 1账号切换
      switch (this.index) {
        case 0:
          // 进入地址管理
          maidian.my(maidian.spm.my_address)
          navigate.push({ url: '/pages/common/address', isNeedLogin: true })
          break
        case 1:
          // 进入登录页
          maidian.my(maidian.spm.my_changgelogin)
          basis.toLogin()
          break
        case 2:
          // 进入账单页
          maidian.click('miniprogram_my_bill')
          navigate.push({ url: '/prepay/pages/bill/billAll', isNeedLogin: true })
          break
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@icon-size: 30px;
.ala-menu-mine-node {
  position: relative;

  .flex-hor-center();
  width: 100%;
  height: 50px;
  color: @color-txt;
  box-sizing: border-box;

  .ammn-icon(@name) {
    .icon(@name, @icon-size, @icon-size);
  }

  @list: 'icon_address', 'icon_change', 'icon_mine_bill';
  .generate-icon(@length, @i:0) when (@i < @length) {
    .ammn__icon-@{i} {
      @iconName: extract(@list, @i + 1);
      .ammn-icon(@iconName);
    }
    .generate-icon(@length, @i + 1);
  }
  .generate-icon(length(@list));

  .ammn__title {
    .flex-n();
    margin-left: 4.5px;
    font-size: @font-size-txt;
  }
  .ammn__icon-arrow {
    .icon-arrow();
  }
}
</style>