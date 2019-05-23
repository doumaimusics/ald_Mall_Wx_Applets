/**
* Created by xiejun on 2018/10/11.
* bar
*/
<template>
  <div v-if="item.visible" class="ala-tabbar__bar" @tap="onClick">
    <div :class="iconClass">
      <img v-if="hasTabConfig" :src="barConfigData.imageUrl" mode="aspectFill">
    </div>
    <div :class="descClass" :style="{color: titleColor}">{{itemDesc}}</div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import maidian from 'utils/maidian'
import webview from 'utils/webview'
import tabConf from '@/store/tabbarConfig'

export default {
  name: 'ala-bar',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    ...mapState(['currentTabbarIndex']),
    // 是否选中
    isActive() {
      return this.item.index === this.currentTabbarIndex
    },
    // 取得配置数据
    barConfigData() {
      return this.item[this.getConfigKey()] ? this.item[this.getConfigKey()] : null
    },
    // 是否存在配置
    hasTabConfig() {
      return this.barConfigData
    },
    //
    itemDesc() {
      let title = this.item.desc
      if (this.barConfigData) {
        title = this.barConfigData.title
      }
      return title
    },
    iconClass() {
      if (this.hasTabConfig) return 'icon-tabbar'
      let cls = 'icon-' + this.item.index
      if (this.isActive) {
        cls += '-active'
      }
      return cls
    },
    descClass() {
      let cls = 'desc'
      if (this.isActive) cls += '-active'
      return cls
    },
    titleColor() {
      if (this.hasTabConfig) return this.barConfigData.titleColor
      return ''
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations(['setCurrentTabbarIndex']),
    // 取得配置
    getConfigKey() {
      return this.isActive ? 'selected' : 'nomal'
    },

    onClick() {
      // 单击跳转
      if (!this.isActive) {
        if (tabConf.isShoppingCart(this.item.key)) {
          webview.openShoppingCart()
        } else {
          this.setCurrentTabbarIndex(this.item.index)
        }
        let types = [
          maidian.spm.button_home,
          maidian.spm.button_activity,
          maidian.spm.button_classify,
          maidian.spm.button_my,
          maidian.spm.button_shopping_cart
        ]
        maidian.index(types[this.item.index])
      }
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

// variable
@bar-width: 48px;
@bar-height: 34px;
@font-size: 10px;
@color-txt-normal: #c6c6c6;

.ala-tabbar__bar {
  .flex-ver-center();
  .flex-n();

  .icon-bar(@url) {
    .icon(@url, @bar-width, @bar-height);
    img {
      margin-top: 4px;
    }
  }

  @list: '01', '01', '02', '05', '04';
  .generate-icon(@length, @i:0) when (@i < @length) {
    .icon-@{i} {
      @iconName: extract(@list, @i + 1);
      .icon-bar('icon_tabbar_@{iconName}');
    }
    .icon-@{i}-active {
      @iconName: extract(@list, @i + 1);
      .icon-bar('icon_tabbar_@{iconName}_active');
    }
    .generate-icon(@length, @i + 1);
  }
  .generate-icon(length(@list));

  .desc {
    font-size: @font-size;
    color: @color-txt-normal;
    transform: translateY(-2px);
  }

  .desc-active {
    .desc;
    color: @color-txt;
  }

  .icon-tabbar {
    width: @bar-width;
    height: @bar-height;
  }
}
</style>
