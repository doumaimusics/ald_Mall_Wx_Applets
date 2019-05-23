/**
* Created by huangyilu on 2018/12/16.
* 好友 砍价详情 按钮
*/
<template>
  <div class="hbdv-status">
    <!-- 砍价中 -->
    <div v-if=" helpStatus === 0 ">
      <!-- 可帮砍 -->
      <div v-if="goodsStatus === 1" class="hbdv-help-btn" @click="bindRegisteredShowFn">立即帮TA助力砍价</div>

      <!-- 已帮砍 -->
      <div v-if="goodsStatus === 2" class="hbdv-help-btn three-btn">已帮砍</div>
      <div v-if="goodsStatus === 2" class="hbdv-help-btn secondary-btn" @click="bindGoHomeFn">我也要免费领</div>

      <!-- 助力未完成 -->
      <div v-if="goodsStatus === 3" class="hbdv-help-btn" @click="bindGoHomeFn">我也要免费领</div>

      <!-- 老用户 -->
      <div v-if="goodsStatus === 4" class="hbdv-help-btn" @click="bindGoHomeFn">发起0元砍价</div>
      <div class="bdr-model" v-if="oldUserShow">
        <div class="hbdv-help-tc">
          <div class="cancel" @click="oldUserShow=false"></div>
          <img class="icon" src="https://img.51fanbei.com/h5/weChat/cj_fail_tc_icon.png" alt>
          <div class="txt">助力砍价失败</div>
          <div class="txt">您已经是爱上街用户了</div>
          <div class="btn" @click="bindGoHomeFn">我也要砍价赢免单</div>
        </div>
      </div>

      <!-- 超时未帮砍 -->
      <div v-if="goodsStatus === 5" class="hbdv-help-btn" @click="bindGoHomeFn">我也要免费领</div>
    </div>

    <!-- 砍价成功 -->
    <div v-if="helpStatus === 1" class="hbdv-help-btn" @click="bindGoHomeFn">我也要免费领</div>

    <!-- 砍价失败 -->
    <div v-if="helpStatus === 2" class="hbdv-help-btn" @click="bindGoHomeFn">发起0元砍价</div>
  </div>
</template>

<script>
import navigate from 'utils/navigate'
import { mapMutations } from 'vuex'
import maidian from 'utils/maidian'

export default {
  name: '',
  data () {
    return {
      oldUserShow: false
    }
  },
  props: {
    // 0:助力中 1:助力完成 2:超时失败
    helpStatus: {
      type: Number,
      default: -1
    },
    // 1:未助力(立即帮砍)  2:助力成功(已帮砍)  3:助力未完成(立即登录app)  4:老用户(仅限新用户)  5:超时未帮砍（砍价已超时）
    goodsStatus: {
      type: Number,
      default: -1
    },
    orderInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {},
  created () { },
  mounted () {
    if (this.goodsStatus === 4) {
      this.oldUserShow = true
    }
  },
  watch: {},
  methods: {
    ...mapMutations('bargain', ['setBargainTabIndex', 'setIsRegisteredShow']),
    // 前往砍价主页
    bindGoHomeFn () {
      maidian.click('kanjia_miniprogram_take', this.orderInfo.goosName, this.orderInfo.freeOrderId)
      maidian.click('kanjia_miniprogram_launch', this.orderInfo.goosName, this.orderInfo.freeOrderId)
      navigate.reLaunch({ url: '/pBargain/pages/index' })
      this.setBargainTabIndex(1)
    },
    // 注册弹窗
    bindRegisteredShowFn () {
      maidian.click('kanjia_miniprogram_help', this.orderInfo.goosName, this.orderInfo.freeOrderId)
      this.setIsRegisteredShow(true)
    }
  },
  components: {}
}
</script>

<style lang="less">
</style>
