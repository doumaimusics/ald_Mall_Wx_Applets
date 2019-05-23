/**
* Created by huangyilu on 2018/11/29.
* 未完成帮砍 item
*/
<template>
  <div class="friend-unhelp-item">
    <div class="fhi-user__info">
      <div class="info-avatar">
        <img src="https://img.51fanbei.com/h5/weChat/cj_phone_bitmap.png" alt>
      </div>
      <div class="info-name">
        <div>{{ helpItem.userName }}</div>
        <div>{{ type === 'invalid' ? '违反平台活动规则' : '未登录爱上街' }}</div>
      </div>
    </div>
    <div class="fhi-user__txt">
      <div>{{ type === 'invalid' ? '助力无效' : '未完成助力' }}</div>
      <div>{{ type === 'invalid' ? helpItem.elapsedTime : remindStatus }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {}
  },
  props: {
    helpItem: {
      type: Object,
      default: () => {
        return {}
      }
    },
    type: {
      type: String,
      default: ''
    }
  },
  computed: {
    remindStatus () {
      return this.helpItem.remindStatus === 1 ? '已提醒' : '未提醒'
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less">
@import '../../style/index.less';
.friend-unhelp-item {
  background-color: #ffffff;
  display: flex;
  margin: 15px 0;
  .fhi-user__info {
    .flex-n();
    display: flex;
    align-items: center;
    .info-avatar {
      height: 38px;
      width: 21.5px;
      margin-right: 10px;
      img {
        border-radius: 0;
      }
    }
    .info-name {
      color: @color-txt-666;
      :first-child {
        font-size: 14px;
      }
      :last-child {
        color: @color-txt-999;
        font-size: 12px;
        margin-top: 3.5px;
      }
    }
  }
  .fhi-user__txt {
    :first-child {
      font-size: 15px;
      font-weight: 500;
    }
    :last-child {
      font-size: 13px;
      color: @color-txt-666;
      text-align: right;
    }
  }
}
</style>
