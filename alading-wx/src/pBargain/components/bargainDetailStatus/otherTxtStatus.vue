/**
* Created by huangyilu on 2018/12/15.
* 好友 砍价详情 文案
*/
<template>
  <div class="hbdv-status">
    <!-- 助力中 -->
    <div v-if=" helpStatus === 0 ">
      <!-- 可帮砍 -->
      <div class="hbdv-bargain-info" v-if="goodsStatus === 1">
        还差
        <span>{{ helpInfo.targetNum - helpInfo.helpNum }}人</span> 即可
        <span>0元</span> 获取
      </div>

      <!-- 已帮砍 -->
      <div class="hbdv-bargain-info" v-if="goodsStatus === 2">
        <span>已帮砍</span>
      </div>

      <!-- 助力未完成 -->
      <div class="hbdv-bargain-info" v-if="goodsStatus === 3">
        <span>请登录爱上街app完成助力</span>
      </div>

      <!-- 老用户 -->
      <div class="hbdv-bargain-info" v-if="goodsStatus === 4">
        <span>您已经是爱上街用户了,仅限新用户帮砍</span>
      </div>

      <!-- 超时未帮砍 -->
      <div class="hbdv-bargain-info" v-if="goodsStatus === 5">砍价结束</div>
    </div>

    <!-- 砍价成功 -->
    <div class="hbdv-bargain-info" v-if="helpStatus === 1">
      <span>好友成功0元领取</span>
    </div>

    <!-- 砍价失败 -->
    <div class="hbdv-bargain-info" v-if="helpStatus === 2">砍价失败</div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  props: {
    helpInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 0:助力中 1:助力完成 2:超时失败
    helpStatus: {
      type: Number,
      default: -1
    },
    // 1:未助力(立即帮砍)  2:助力成功(已帮砍)  3:助力未完成(立即登录app)  4:老用户(仅限新用户)  5:超时未帮砍（砍价已超时）
    goodsStatus: {
      type: Number,
      default: -1
    }
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
</style>
