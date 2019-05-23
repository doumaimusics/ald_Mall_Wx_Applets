/**
* Created by huangyilu on 2018/11/29.
* 好友帮砍 item
*/
<template>
  <div class="friend-help-item">
    <div class="fhi-user__info">
      <div class="info-avatar">
        <img
          :src="(helpItem.avatar === '' || helpItem.avatar === null) ? 'https://img.51fanbei.com/h5/weChat/cj_default_ava.png' : helpItem.avatar "
          alt
        >
      </div>
      <div class="info-name">
        <div>{{ helpItem.userName }}</div>
        <div>帮忙砍一刀</div>
      </div>
    </div>
    <div class="fhi-user__help-price">
      <div class="help-icon"></div>
      <div class="help-price">
        砍掉
        <span>{{ helpItem.userHelpAmount }}</span>元
      </div>
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
@import '../../style/index.less';
.friend-help-item {
  background-color: #ffffff;
  display: flex;
  margin: 15px 0;
  .fhi-user__info {
    .flex-n();
    display: flex;
    align-items: center;
    .info-avatar {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      img {
        border-radius: 50%;
      }
    }
    .info-name {
      :first-child {
        font-size: 14px;
      }
      :last-child {
        font-size: 12px;
        color: @color-txt-666;
        margin-top: 3.5px;
      }
    }
  }
  .fhi-user__help-price {
    display: flex;
    align-items: center;
    .help-icon {
      .icon('cj_bargain_icon', 22.5px, 22.5px);
      margin-right: 10px;
    }
    .help-price {
      font-size: 12px;
      color: @color-txt-666;
    }
  }
}
</style>
