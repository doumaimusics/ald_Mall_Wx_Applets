/**
* Created by xiejun on 2018/11/22.
* 测试vuex module
*/
<template>
  <div class="test">
    <h3>当前count:{{count}}</h3>
    <h3>perCount:{{perCount}}</h3>
    <div @tap="onTapAdd1" class="test-btn">加1</div>
    <div @tap="onTapAdd4" class="test-btn">增加4</div>
    <div @tap="onTapBack" class="test-btn">上个值</div>
    <h3>token:{{token}}</h3>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
export default {
  name: '',
  data() {
    return {}
  },
  props: {},
  computed: {
    ...mapState(['token']),
    ...mapState('test', ['count']),
    ...mapGetters('test', ['perCount'])
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    ...mapMutations('test', ['removeHistory']),
    ...mapActions('test', ['increase', 'addCount', 'backCount']),
    onTapAdd1() {
      this.increase()
    },
    onTapAdd4() {
      this.addCount(4)
    },
    onTapBack() {
      this.backCount()
    }
  },
  components: {}
}
</script>

<style lang="less">
.test {
  .test-btn {
    padding: 10px;
    text-align: center;
    font-size: 14px;
    border: 1px solid #999999;
  }
}
</style>