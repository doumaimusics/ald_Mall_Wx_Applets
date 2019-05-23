/**
* Created by xiejun on 2019/03/15.
* qrcode menu 
*/
<template>
  <div class="qrcode-menu">
    <qrcode-menu-node
    v-for="(menu, index) in menus"
    @tap="onTap"
    :title="menu"
    :index="index"
    :select="select"
    :data-index="index"
    :key="index"/>
  </div>
</template>

<script>
import qrcodeMenuNode from './qrcodeMenuNode'
export default {
  name: '',
  components: { qrcodeMenuNode },
  data() {
    return {}
  },
  props: {
    menus: {
      type: Array,
      default: function() {
        return []
      }
    },
    select: {
      type: Number,
      default: 0
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap(index) {
      this.$emit('selectChange', index)
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.qrcode-menu {
  width: 100%;
  margin-bottom: 10px;
  padding-bottom: 10px;
  position: relative;
  .border-1px-bottom();
  .flex-hor-ver-center();
}
</style>