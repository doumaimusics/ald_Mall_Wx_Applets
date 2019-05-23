/**
* Created by huangyilu on 2018/11/22.
* 砍价商品详情 详细规则
*/
<template>
  <div class="bar-detail-rule">
    <!-- 砍价攻略 -->
    <div class="bdr-rule">
      <div class="bdr-rule__model" @click="bindRuleClick">
        <div>爱上街砍价玩法</div>
        <div>详细规则</div>
        <div class="right-icon"></div>
      </div>
      <div class="bdr-rule__exp">
        <div class="exp-item">
          <div class="exp-icon__start"></div>
          <div>发起砍价</div>
          <div class="exp-icon__right"></div>
        </div>
        <div class="exp-item">
          <div class="exp-icon__center"></div>
          <div>邀请好友</div>
          <div class="exp-icon__right"></div>
        </div>
        <div class="exp-item">
          <div class="exp-icon__end"></div>
          <div>满员发货</div>
        </div>
      </div>
    </div>
    <!-- 砍价攻略弹窗 -->
    <div class="bdr-model" v-if="ruleShow" @click.stop="bindCancelClick">
      <div class="model-title" @click.stop>
        <div>活动攻略</div>
        <div class="model-delete-icon" @click="bindCancelClick"></div>
      </div>
      <div class="model-txt" @click.stop>
        <ala-raiders/>
      </div>
    </div>
  </div>
</template>

<script>
import alaRaiders from '../raiders/raidersIndex'

export default {
  name: '',
  data () {
    return {
      ruleShow: false
    }
  },
  props: {},
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {
    bindRuleClick () {
      this.ruleShow = true
      this.$emit('sendRuleShowFn', this.ruleShow)
    },
    bindCancelClick () {
      this.ruleShow = false
      this.$emit('sendRuleShowFn', this.ruleShow)
    }
  },
  components: { alaRaiders }
}
</script>

<style lang="less">
@import "../../style/index.less";
.bar-detail-rule {
  .bdr-rule {
    background-color: #ffffff;
    .bdr-rule__model {
      font-size: 13px;
      display: flex;
      color: #cbcbcb;
      padding: 22 / @px 10 / @px 22 / @px 28 / @px;
      .border-bottom(#eeeeee);
      :first-child {
        .flex-n();
        color: @color-txt-222;
      }
      .right-icon {
        .icon-arrow();
      }
    }
    .bdr-rule__exp {
      display: flex;
      padding: 45 / @px 28 / @px;
      color: @color-txt-222;
      font-size: 26 / @px;
      line-height: 48 / @px;
      .exp-item {
        display: flex;
        align-items: center;
      }
      div {
        margin-right: 10 / @px;
      }
      .exp-icon__right {
        .flex-n();
        .icon-arrow(25 / @px);
        margin-left: 35 / @px;
      }
      .exp-icon__start {
        .icon("cj_rule_start", 48 / @px, 48 / @px);
      }
      .exp-icon__center {
        .icon("cj_rule_center", 48 / @px, 48 / @px);
      }
      .exp-icon__end {
        .icon("cj_rule_end", 48 / @px, 48 / @px);
      }
    }
  }
  .bdr-model {
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 1001;
    .model-title {
      height: 80 / @px;
      line-height: 80 / @px;
      width: 100%;
      background-color: #ffffff;
      position: absolute;
      bottom: 700 / @px;
      display: flex;
      align-items: center;
      div {
        margin: 0 30 / @px;
      }
      :first-child {
        .flex-n();
      }
      .model-delete-icon {
        .icon-cancel();
      }
    }
    .model-txt {
      bottom: 0;
      overflow-y: scroll;
      height: 700 / @px;
      position: absolute;
      .ala-raiders-view {
        padding-bottom: 0;
      }
    }
  }
}
</style>
