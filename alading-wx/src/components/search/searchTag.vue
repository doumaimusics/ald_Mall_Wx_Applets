/**
* Created by xiejun on 2018/10/12.
* 搜索tag
*/
<template>
  <div
  class="ala-search-tag"
  @click="onClick">
    <div class="ala-search-tag__input">
      <div v-if="showSearchIcon" class="icon-search"></div>
      <input
      v-if="isSearch"
      class="input-search"
      type="search"
      v-model="inputValue"
      :placeholder="placeholder"
      @confirm="onSearchClick">
      <span
      v-else
      class="input-placeholder"
      :class="{ 'input-placeholder__only':!showSearchIcon} ">{{placeholder}}</span>
      <div class="btn-clear" v-if="inputValue" @click="onClearClick"></div>
    </div>
    <div v-if="isSearch" class="ala-search-tag__btn" @click="onSearchClick">搜索</div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

import Tips from 'utils/tip'
import basis from 'utils/basis'
import webview from 'utils/webview'
import lcUtil from 'utils/lcUtil'
import navigate from 'utils/navigate'
export default {
  name: 'ala-search-tag',
  data() {
    return {
      inputValue: ''
    }
  },
  props: {
    isSearch: {
      type: Boolean,
      default: false
    },
    // 设置是否显示搜索图标
    showSearchIcon: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '搜索你想要的商品'
    }
  },
  computed: {},
  created() {},
  mounted() {},
  onShow() {
    this.inputValue = ''
  },
  watch: {},
  methods: {
    ...mapMutations(['setLocationCode']),
    onClick() {
      // 单击
      if (!this.isSearch) {
        this.$emit('navigateClick')
        // 跳转到搜索页
        navigate.push({ url: '/pages/common/search' })
      }
    },
    // click 清空
    onClearClick() {
      this.inputValue = ''
    },
    onSearchClick() {
      if (basis.isBlank(this.inputValue)) {
        Tips.toast('请输入你想要搜索的商品')
        return
      }
      // 添加来源
      this.setLocationCode(lcUtil.search)

      webview.openSearch(this.inputValue)
    },
    // 手机号输入及失去焦点
    onInputChange(event) {
      let value = basis.getInputValue(event)
      this.inputValue = value
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

@input-height-bg: 32px;
@input-font-size: @font-size-tip;

.ala-search-tag {
  position: fixed;
  top: 0;
  z-index: 10;

  .flex-hor-center();
  .padding-h(@padding-h);
  width: 100%;
  height: @search-height;
  background: white;
  box-sizing: border-box;
  transition: all 1s ease 0s;

  .ala-search-tag__input {
    .flex-hor-center();
    .flex-n();
    height: @input-height-bg;
    background: @color-btn-2;
    border-radius: 50px;
    padding: 0 10px;

    .icon-search {
      .icon('icon_search', 20px, 20px);
      margin-right: 2.5px;
    }

    .input-search {
      .flex-n();
      font-size: @input-font-size;
      color: @color-txt;
    }

    .input-placeholder {
      font-size: @input-font-size;
      color: @color-txt-2;
    }

    .input-placeholder__only {
      color: @color-txt;
      margin-left: 5px;
    }

    .btn-clear {
      .icon('icon_cancle', 20px, 20px);
    }
  }

  .ala-search-tag__btn {
    padding: 6px 5px;
    padding-left: 15px;

    font-size: 15px;
    color: @color-txt;

    box-sizing: border-box;
  }
}
</style>
