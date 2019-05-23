/**
* Created by jinzhouping on 2018/10/17.
* menu 我的账单
*
*/
<template>
  <div class="ala-menu-mine">
    <ala-menu-mine-node :index="2" title="我的账单"></ala-menu-mine-node>
  </div>
</template>

<script>
import alaMenuMineNode from './menuMineNode'
export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { alaMenuMineNode }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.ala-menu-mine {
  margin: 10px @padding-h-mine 0;
  .padding-h(9px);
  border-radius: 5px;
  background: white;

  .amm__sep-line {
    position: relative;
    .border-1px-top();
  }
}
</style>