/**
* Created by xiejun on 2019/03/21.
* 商品安全信息
*/
<template>
  <div class="info-safe-goods">
    <info-safe-goods-node v-for="(info, index) in infos" :info="info" :key="index"/>
  </div>
</template>

<script>
import infoSafeGoodsNode from './infoSafeGoodsNode'
export default {
  name: '',
  components: { infoSafeGoodsNode },
  data() {
    return {
      infos: ['官方直采', '极速物流', '售后无忧']
    }
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.info-safe-goods {
  height: 34px;
  .flex-hor-center();
}
</style>