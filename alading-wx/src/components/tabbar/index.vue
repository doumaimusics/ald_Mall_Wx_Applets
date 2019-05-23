/**
* Created by xiejun on 2018/10/11.
* tabbar
*/
<template>
  <div :class="['ala-tabbar', {'iphonex-bottom': isIphoneX }]">
    <bar 
    v-for="item in tabbarConfigs"
    :item="item" 
    :key="item"/>
  </div>
</template>

<script>
import bar from './bar'

import { mapGetters } from 'vuex'
import systemInfo from 'utils/systemInfo'
export default {
  name: 'ala-tabbar',
  data() {
    return {
      test: 'ttbal'
    }
  },
  props: {},
  computed: {
    ...mapGetters(['tabbarConfigs']),
    isIphoneX() {
      return systemInfo.isIphoneX
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { bar }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';

.ala-tabbar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: @tabbar-height;
  z-index: 100;

  display: flex;
  background: white;

  .border-1px-top;
}
</style>