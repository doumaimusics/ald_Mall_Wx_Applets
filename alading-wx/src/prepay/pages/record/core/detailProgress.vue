/**
* Created by xiejun on 2019/02/28.
* 详情进度
*/
<template>
  <div class="detail-progess">
    <div class="title">处理进度</div>
    <block v-for="(data, index) in parseLogList" :key="index">
      <detail-progress-info :progressData="data"/>
    </block>
  </div>
</template>

<script>
import detailProgressInfo from './detailProgressInfo'
import detailProgressLine from './detailProgressLine'

const titleList = ['提交成功', '银行处理中', '到账成功', '还款失败']
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    logList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  computed: {
    parseLogList() {
      let list = [...this.logList]
      // let list = [{ status: 0 }, { status: 1 }, { status: 3 }]
      let len = list.length
      list.forEach((value, index) => {
        let status = value.status
        value.title = titleList[status]
        value.hasLine = status < 2
        value.percent = index + 1 === len ? '40%' : '100%'
      })
      for (let i = len; i < 3; i++) {
        list.push({
          status: i,
          title: titleList[i],
          hasLine: i < 2,
          percent: 0
        })
      }
      return list
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: { detailProgressInfo, detailProgressLine }
}
</script>

<style lang="less" scoped>
@import '~@/styles/base/fn.less';
.detail-progess {
  position: relative;
  height: 230px;
  .border-1px-bottom();
  &::after {
    margin: 0 16px;
  }

  .title {
    padding: 16px;

    color: @color-txt;
    font-size: 15px;
  }
}
</style>