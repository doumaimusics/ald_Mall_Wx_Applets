/**
* Created by xiejun on 2019/04/09.
* 商品详情里的店铺信息
*/
<template>
  <div v-if="hasShopData" class="info-shop-goods">
    <div class="icon">
      <img v-if="hasIcon" :src="shopIcon" mode="aspectFill">
      <span v-else class="icon-default"></span>
    </div>
    <div class="shop-info">
      <div class="title">{{ shopName }}</div>
      <div class="msg">{{ msg }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  props: {
    shopData: {
      type: Object,
      default: null
    }
  },
  computed: {
    hasShopData() {
      return this.shopData
    },
    hasIcon() {
      return this.shopIcon
    },
    shopIcon() {
      let icon = ''
      if (this.hasShopData) icon = this.shopData.icon
      if (!icon) icon = ''
      return icon
    },
    shopName() {
      if (this.hasShopData) return this.shopData.shopName
      return ''
    },
    msg() {
      if (this.hasShopData) return `在售商品${this.shopData.goodsCount}件`
      return ''
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.info-shop-goods {
  position: relative;
  .border-1px-bottom();
  .padding-h(@padding-h);
  .flex-hor-center();
  height: 68px;
  background: white;
  .icon {
    @icon-size: 48px;
    width: @icon-size;
    height: @icon-size;
    margin-right: 10px;
    border: 1px solid @color-border;
    flex-shrink: 0;
    .icon-default {
      .icon('icon_label_morendianpu', @icon-size, @icon-size);
    }
  }
  .shop-info {
    .title {
      font-size: 14px;
      color: @color-txt;
      margin-bottom: 3px;
      .show-line();
    }
    .msg {
      font-size: 12px;
      color: @color-txt-2;
    }
  }
}
</style>