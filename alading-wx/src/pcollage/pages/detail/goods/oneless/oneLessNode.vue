/**
* Created by xiejun on 2019/01/28.
* one less node
*/
<template>
  <div class="one-less-node">
    <one-less-order-node
    v-for="(data, index) in list"
    @tap="onOrderNodeTap"
    @timeout="onTimeout"
    :orderData="data"
    :key="index"/>
  </div>
</template>

<script>
import oneLessOrderNode from './oneLessOrderNode'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onOrderNodeTap(data) {
      this.$emit('tap', data)
    },
    onTimeout() {
      this.$emit('timeout')
    }
  },
  components: { oneLessOrderNode }
}
</script>

<style lang="less" scoped>
</style>