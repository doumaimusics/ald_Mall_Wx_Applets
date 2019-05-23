/**
* Created by xiejun on 2018/12/29.
* 对话框弹窗提示
*/
<template>
  <div class="ala-dialog-toast">
    <div class="title">{{ title }}</div>
    <div class="content" v-html="content"></div>
    <div class="btn-list">
      <div
      class="btn"
      v-for="(info, index) in btnList" 
      @tap="onTap(index)"
      :class="info.type"
      :key="index">{{ info.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    dialogData: {
      type: Object,
      default: {}
    }
  },
  computed: {
    title() {
      return this.dialogData.title
    },
    content() {
      return this.dialogData.content
    },
    btnList() {
      let list = []
      let titles = this.dialogData.btnTitles
      if (titles.length === 1) {
        list.push({ title: titles[0], type: 't1' })
      } else {
        list.push({ title: titles[0], type: 't3' })
        list.push({ title: titles[1], type: 't2' })
      }
      return list
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap(index) {
      this.$emit('tap', this.dialogData.btnActions[index])
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.ala-dialog-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 20;

  width: 300px;
  padding-bottom: 15px;
  border-radius: 5px;
  background: white;

  text-align: center;
  color: @color-txt;

  .title {
    margin-top: 18px;
    margin-bottom: 20px;
    font-family: PingFangSC-Medium;
    font-size: 17px;
  }
  .content {
    font-size: 15px;
    line-height: 21px;
  }
  .btn-list {
    margin: auto;
    margin-top: 25px;
    .flex-hor-center();
    justify-content: center;
    .btn {
      height: 40px;
      line-height: 40px;
      border-radius: 40px;
      background: @color-btn;

      font-family: PingFangSC-Medium;
      font-size: 15px;

      &.t1 {
        width: 226px;
      }
      &.t2 {
        margin-left: 19px;
        width: 121px;
      }
      &.t3 {
        height: 38px;
        line-height: 38px;
        width: 121px;
        background: white;
        border: 1px solid @color-btn;
        box-sizing: border-box;

        color: @color-btn;
      }
    }
  }
}
</style>