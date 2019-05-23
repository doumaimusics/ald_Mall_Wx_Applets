/**
* Created by xiejun on 2019/03/19.
* goods menu
*/
<template>
  <div class="menu-goods" :class="{'iphonex' : isIphoneX}">
    <div class="more">
      <menu-icon-node type="2" title="返回首页" @tap="onBack"/>
      <menu-icon-node type="3" title="购物车" @tap="onToShoppingCart" :amount="goodsNumber"/>
    </div>
    <div v-if="tipVisible" class="menu-box">
      <menu-tip :title="menuTipTitle"/>
      <menu-node type="4" title="加入购物车" radiusType="left"></menu-node>
      <menu-node type="3" :title="btnBuyTxt" radiusType="right"></menu-node>
    </div>
    <div v-else class="menu-box">
      <menu-node type="1" title="加入购物车" @tap="onAdd" radiusType="left"></menu-node>
      <menu-node type="2" :title="btnBuyTxt" @tap="onBuy" radiusType="right"></menu-node>
    </div>
  </div>
</template>

<script>
import menuIconNode from './menuIconNode'
import menuTip from './menuTip'
import menuNode from './menuNode'

import { mapMutations, mapState } from 'vuex'
import systemInfo from 'utils/systemInfo'
import navigate from 'utils/navigate'
export default {
  name: '',
  components: { menuIconNode, menuTip, menuNode },
  data() {
    return {}
  },
  props: {
    btnBuyTxt: {
      type: String,
      default: '立即购买'
    },
    isGoodsCancel: {
      type: Boolean,
      default: false
    },
    isGoodsEmpty: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('shoppingCart', ['goodsNumber']),
    isIphoneX() {
      return systemInfo.isIphoneX
    },
    tipVisible() {
      return this.isGoodsCancel || this.isGoodsEmpty
    },
    menuTipTitle() {
      let tip = ''
      if (this.isGoodsCancel) {
        tip = '商品已下架，可以看看别的商品哦'
      } else if (this.isGoodsEmpty) {
        tip = '来晚一步，商品已抢完，去看看别的吧'
      }
      return tip
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations(['setCurrentTabbarIndex']),
    onBack() {
      // 返回首页
      this.setCurrentTabbarIndex(0)
      navigate.reLaunch({ url: '/pages/index/index' })
    },
    onToShoppingCart() {
      this.$emit('toShoppingCart')
    },
    onAdd() {
      if (this.tipVisible) return
      // 加入购物车
      this.$emit('add')
    },
    onBuy() {
      if (this.tipVisible) return
      // 立即购买
      this.$emit('buy')
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';

@menu-height: 50px;
.menu-goods {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 11;
  width: 100%;
  height: @menu-height;
  .flex-hor-center();
  .adapt-iphonex();
  background: white;
  box-shadow: 0px 0px 8px 0px rgba(228, 228, 228, 1);
  .more {
    .flex-n();
    .flex-hor-center();
    padding:0 10px 0 @padding-h;
    justify-content: center;

    /deep/.menu-icon-node {
      .flex-n();
    }
  }
  .menu-box {
    .flex-hor-center();
    padding-right: @padding-h;
  }
}
</style>