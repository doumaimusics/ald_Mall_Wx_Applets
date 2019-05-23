/**
* Created by xiejun on 2018/12/05.
* 去分享弹窗
*/
<template>
  <div class="collage-to-share-toast">
    <div class="to-share-word">还差<span class="count">{{needCollageCount}}</span>人，赶快邀请好友来拼团吧</div>
    <div class="to-share-des">人满后立即发货</div>
    <div class="to-share-menu">
      <!-- <div class="to-share-node" @tap="onGroupTap">
        <span class="to-share-node-icon-1"></span>
        <span class="to-share-node-title">朋友圈</span>
      </div> -->
      <div class="to-share-node">
        <span class="to-share-node-icon-2"></span>
        <span class="to-share-node-title">微信好友</span>
        <button class="to-share-node-button" open-type="share"></button>
      </div>
    </div>   
    <div class="to-share-close" @tap="onCloseTap"></div>  
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    needCollageCount: {
      type: Number,
      default: 1
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onCloseTap() {
      this.$emit('close')
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-to-share-toast {
  position: fixed;
  left: 50%;
  top: 95px;
  transform: translateX(-50%);
  z-index: 20;

  .icon('image_toast_rule', 300px, 204px);
  background-size: 100%;
  border-radius: 8px;
  text-align: center;
  overflow: hidden;

  .to-share-word {
    margin-top: 43px;
    font-family: PingFangSC-Medium;
    font-size: 17px;
    color: @color-txt;
    .count {
      font-size: 19px;
      color: @color-warn;
    }
  }
  .to-share-des {
    margin-top: 6px;
    font-size: @font-size-list;
    color: @color-txt-1;
  }

  .to-share-menu {
    margin-top: 22px;
    .flex-hor-center();
    .to-share-node {
      position: relative;
      margin: auto;
      .flex-ver-center();
      width: 40px;

      .node-icon(@name) {
        .icon(@name, 40px, 40px);
      }
      .to-share-node-icon-1 {
        .node-icon('icon_share_wxgroup');
      }
      .to-share-node-icon-2 {
        .node-icon('icon_share_wxfriend');
      }
      .to-share-node-title {
        margin-top: 5px;
        font-size: @font-size-list;
        color: @color-txt;
        .show-one-line();
      }
      .to-share-node-button {
        position: absolute;
        top: 0;
        left: -10px;
        opacity: 0;
        width: 60px;
        height: 64px;
      }
    }
  }
}
</style>