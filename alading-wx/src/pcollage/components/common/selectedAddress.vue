/**
* Created by xiejun on 2018/11/29.
* 选中的地址
*/
<template>
  <div :class="['collage-selected-address', {'add': selectedAddressData }]" @tap="onTap">
    <div class="title" v-if="!selectedAddressData" @click="goAddAddressFn" >请添加收货地址</div>
    <block v-else>
      <div class="icon"></div>
      <div class="base">
        <div>{{ selectedAddressData.consignee }} <span>{{ selectedAddressData.mobile }}</span> </div>
        <div>{{ addressDetail }}</div>
      </div>
    </block>
    <div class="arrow"></div>
    <div class="bgicon"></div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {}
  },
  props: {
    selectedAddressData: {
      type: Object,
      default: null
    }
  },
  computed: {
    addressDetail() {
      if (!this.selectedAddressData) return ''
      let result = ''
      let data = this.selectedAddressData
      let keys = ['province', 'city', 'county', 'address']
      keys.forEach(value => (result = result + data[value]))
      return result
    }
  },
  created() {},
  mounted() {},
  watch: {},
  methods: {
    onTap() {
      this.$emit('tap')
    }
  },
  components: {}
}
</script>

<style lang="less">
@import '~@/styles/base/fn.less';
.collage-selected-address {
  background-color: #ffffff;
  padding: 20px 10px 20px 15px;
  position: relative;
  display: flex;
  align-items: center;

  &.add {
    padding: 15px;
  }
  .title {
    .flex-n();
    color: @color-txt;
    font-size: @font-size-list;
  }
  .icon {
    .icon('icon_adress_black', 20px, 20px);
  }
  .base {
    .padding-h(10px);
    .flex-n();
    color: @color-txt;
    font-size: @font-size-txt;

    div:first-child {
      margin-bottom: 7px;
      font-family: PingFangSC-Medium;
      font-size: @font-size-list;
      span {
        margin-left: 15px;
      }
    }
  }
  .bgicon {
    position: absolute;
    bottom: 0;
    left: 0;
    .icon('icon_adress_line', 100%, 4px);
  }
  .arrow {
    .icon-arrow();
  }
}
</style>