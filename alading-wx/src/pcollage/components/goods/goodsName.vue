/**
* Created by xiejun on 2019/02/11.
* goods name
*/
<template>
  <div :class="['collage-goods-name', type]">
    <block v-if="isSecKill">
      <img v-if="hasSecKillIcon" :src="goodsData.iconUrl" class="tag-img" mode="aspectFill">
      <span v-else class="tag">特价团</span>
    </block>
    <span v-else-if="isForNew" class="tag">邀新团</span>
    {{ goodsData.name }}
  </div>
</template>

<script>
import basis from 'pcollagecomp/basis'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    type: {
      type: String,
      default: 'list-goods'
    },
    goodsData: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    // 是否为邀新商品
    isForNew() {
      return this.goodsData.isForNew
    },
    // 是否为秒杀商品
    isSecKill() {
      return basis.isSecKill(this.goodsData)
    },
    // 是否存在秒杀商品标记
    hasSecKillIcon() {
      return this.goodsData.iconUrl
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.collage-goods-name {
  position: relative;

  color: @color-txt;
  .show-two-line();
  width: 100%;

  .tag {
    display: inline-block;
    font-family: PingFangSC-Regular;
    color: @color-txt;

    background: @color-main;
    border-radius: 2px;
  }

  .tag-img {
    display: inline-block;
    vertical-align: middle;
  }

  &.list-goods {
    font-family: PingFangSC-Medium;
    font-size: @font-size-list;
    line-height: 20px;
    height: 42px;
    .tag {
      height: 17px;
      line-height: 17px;
      .padding-h(5px);
      font-size: 10px;
    }
    .tag-img {
      height: 17px;
      width: 40px;
    }
  }

  &.today-buy {
    font-family: PingFangSC-Regular;
    font-size: @font-size-tip;
    line-height: 17px;
    height: 34px;
    .tag {
      height: 14px;
      line-height: 14px;
      .padding-h(3px);

      font-size: 8px;
    }
    .tag-img {
      height: 14px;
      width: 30px;
    }
  }

  &.collage-share {
    font-family: PingFangSC-Regular;
    font-size: 15px;
    line-height: 21px;
    height: 44px;
    .tag {
      height: 17px;
      line-height: 17px;
      .padding-h(5px);
      font-size: 10px;
    }
    .tag-img {
      height: 17px;
      width: 40px;
    }
  }

  &.gn-goods-detail {
    font-family: PingFangSC-Medium;
    font-size: 15px;
    color: @color-txt;
    line-height: 22px;
    .tag {
      height: 17px;
      line-height: 17px;
      .padding-h(12px);
      font-size: 11px;
    }
    .tag-img {
      height: 17px;
      width: 56px;
    }
  }
}
</style>