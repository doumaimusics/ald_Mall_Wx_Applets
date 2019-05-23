/**
* Created by huangyilu on 2018/10/12.
* 商品列表 ( 为你推荐 / 同类排行 )
*/
<template>
  <div class="goods-simview">
    <div class="gs__witem" v-for="(witem, wi) in newList" :key="wi" >
      <div class="item" v-for="(item, i) in witem" :key="i" @click="goodsFn(item)">
        <img class="image" :src="item.goodsIcon" />
        <div class="label show_two_line">{{ item.goodsName }}</div>
        <div class="price" >¥{{ item.activityAmount ? item.activityAmount : item.saleAmount }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import basis from 'utils/basis'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {}
  },
  props: {
    list: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  computed: {
    newList() {
      let newList = []
      for (var i = 0, len = this.list.length; i < len; i += 3) {
        newList.push(this.list.slice(i, i + 3))
      }
      return newList
    }
  },
  created() {},
  mounted() {},
  methods: {
    ...mapMutations(['setGoodsIdsData']),
    goodsFn(item) {
      this.setGoodsIdsData(item.goodsId)
      basis.toGoodsDetail()
    }
  }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

.goods-simview {
  .gs__witem {
    display: flex;
    .item {
      flex: 1;
      background-color: #ffffff;
      border-right: 0px #404040 solid;
      border-bottom: 0px #404040 solid;
      padding: 14px 17px;
      box-sizing: border-box;
    }
  }
  .image {
    width: 1.84rem;
    height: 1.84rem;
    margin: 0 auto;
  }
  .label {
    font-family: PingFangSC-Regular;
    font-size: 0.24rem;
    color: #404040;
    letter-spacing: -0.5px;
    margin-top: 5px;
    margin-bottom: 5px;
    min-height: 34px;
    line-height: 16.5px;
  }
  .price {
    font-size: 0.28rem;
    color: @color-price;
  }
}
</style>
