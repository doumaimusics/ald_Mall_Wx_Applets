/**
* Created by huangyilu on 2018/12/20.
* 返回挽留弹窗
*/
<template>
  <div class="ala-retain-panel">
    <div class="arp-goods-icon">
      <image :src="goodsIcon" mode="widthFix" alt></image>
    </div>
    <div class="arp-title">不分享给小伙伴吗，免费超值商品还在等你来拿哦~</div>
    <div class="arp-btn-bg">
      <div class="btn-left" @click="bindGoBackFn">放弃免费机会</div>
      <!-- <div class="btn-right" @click="bindShareFn">去分享</div> -->
      <button class="btn-right" open-type="share">去分享</button>
    </div>
  </div>
</template>

<script>
import navigate from 'utils/navigate'

export default {
  name: '',
  data () {
    return {}
  },
  props: {
    goodsIcon: {
      type: String,
      default: ''
    }
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {
    bindGoBackFn () {
      navigate.back({ delta: 1 })
    },
    bindShareFn () {
      this.$emit('bindShareFn')
    }
  },
  components: {}
}
</script>

<style lang="less">
.ala-retain-panel {
  width: 300px;
  height: 360px;
  background-color: #ffffff;
  margin: 20% auto;
  .arp-goods-icon {
    width: 100%;
    height: 220px;
    image {
      width: 100%;
    }
  }
  .arp-title {
    font-size: 15px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    padding: 15px 30px;
  }
  .arp-btn-bg {
    display: flex;
    padding: 0 10px;
    font-size: 15px;
    div,
    button {
      flex: 1;
      height: 42px;
      line-height: 42px;
      border-radius: 42px;
      text-align: center;
      margin: 0 5px;
      font-size: 15px;
    }
    .btn-left {
      border: 1px solid rgba(46, 46, 46, 1);
    }
    .btn-right {
      border-style: none;
      background: rgba(255, 213, 0, 1);
    }
  }
}
</style>
