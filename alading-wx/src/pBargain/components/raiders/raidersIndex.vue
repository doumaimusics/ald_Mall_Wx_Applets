/**
* Created by huangyilu on 2018/11/15.
* 砍价攻略
*/
<template>
  <div class="ala-raiders-view">
    <div class="bg-one"></div>
    <div class="bg-two"></div>
    <div class="bg-three">
      <div class="txt-bg">
        <div class="title">活动规则</div>
        <div class="content" v-for="(item, i) in ruleList" :key="i">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: '',
  data () {
    return {
      ruleList: []
    }
  },
  props: {},
  computed: {},
  created () { },
  mounted () {
    this.getBargainRuleData()
  },
  watch: {},
  methods: {
    ...mapActions('bargain', ['getBargainRule']),
    async getBargainRuleData () {
      let data = await this.getBargainRule()
      this.ruleList = data.ruleList
    }
  },
  components: {}
}
</script>

<style lang="less">
@import "../../style/index.less";
.ala-raiders-view {
  padding-bottom: 48px;
  .bg-one {
    .icon("cj_gl_1", 375px, 364px);
  }
  .bg-two {
    .icon("cj_gl_2", 375px, 236.5px);
  }
  .bg-three {
    // .icon("cj_gl_3", 375px, 150.5px);
    background-color: rgb(255, 246, 239);
    width: 100%;
    padding-top: 20px;
    .txt-bg {
      margin: 0 15px;
      padding: 10px 22.5px;
      color: #975f00;
      font-size: 14px;
      background-color: #ffffff;
      .title {
        font-size: 15px;
        color: #975f00;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        text-align: center;
        padding: 5px 0;
        border-radius: 4px;
      }
      .content {
        padding: 10px 0;
      }
    }
  }
  img {
    display: block;
  }
}
</style>
