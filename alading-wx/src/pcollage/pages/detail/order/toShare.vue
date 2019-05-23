/**
* Created by xiejun on 2018/12/10.
* 订单详情——邀请好友
*/
<template>
  <div v-if="shareData" class="collage-detail-order-to-share">
    <div class="to-share-title">
      <span class="to-share-title__icon"></span>
      <span class="to-share-title__content">{{shareData.title}}</span>
    </div>
    <user-list :userInfoList="userInfoList"/>
    <div v-if="shareData.toShare" class="to-share-btn" @tap="onTap">邀请好友</div>
  </div>
</template>

<script>
import userList from 'pcollagecomp/common/userList'
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    shareData: {
      type: Object,
      default: null
    },
    userInfoList: {
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
    onTap() {
      this.$emit('tap')
    }
  },
  components: { userList }
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
@import '~pcollagecomp/common/userList.less';

.collage-detail-order-to-share {
  margin-top: 10px;
  padding-top: 16px;
  padding-bottom: 20px;

  background: white;

  .to-share-title {
    font-size: @font-size-list;
    font-family: PingFangSC-Medium;
    color: @color-txt;
    padding-left: 13px;

    .flex-hor-center();

    .to-share-title__icon {
      .icon('icon_partner', 15px, 15px);
    }
    .to-share-title__content {
      margin-left: 7.5px;
    }
  }
  .to-share-btn {
    margin: auto;
    margin-top: 8px;

    width: 274px;
    height: 40px;
    line-height: 40px;
    background: @color-btn;
    border-radius: 20px;

    font-size: @font-size-list;
    font-family: PingFangSC-Medium;
    color: @color-txt;
    text-align: center;
  }

  .collage-user-list {
    margin-top: 18px;
    .padding-h(35px);
    .list-node {
      .user-list-node(20px, 12px, 42px);
    }
  }
}
</style>