/**
import { clearTimeout } from 'timers';
* Created by xiejun on 2019/03/15.
* input node 输入块
*/
<template>    
  <div class="input-node">
    <input
    v-model="text"
    :placeholder="placeholder"
    placeholder-class="input-placeholder"/>
    <div class="btn-clear" v-if="hasText" @tap="onClearTap"></div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  data() {
    return {
      text: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    input: {
      type: String,
      default: ''
    }
  },
  computed: {
    hasText() {
      return this.text !== ''
    }
  },
  created() {
    this.text = this.input
  },
  mounted() {},
  watch: {
    input() {
      this.text = this.input
    },
    text() {
      if (this.id) return
      this.id = setTimeout(this.sendChange, 50)
    }
  },
  methods: {
    sendChange() {
      delete this.id
      this.$emit('change', this.text)
    },
    onClearTap() {
      this.text = ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.input-node {
  position: relative;
  .flex-hor-center();
  .border-1px-bottom();
  width: 330px;
  height: 32px;
  margin-bottom: 27px;
  padding-right: 31px;
  box-sizing: border-box;
  .input-placeholder {
    font-size: 15px;
    color: #cccccc;
  }
  input {
    .flex-n();
    font-size: 17px;
    color: @color-txt;
  }
  .btn-clear {
    .icon('icon_cancle', 20px, 20px);
  }
}
</style>