/**
* Created by huangyilu on 2018/10/17.
* switch开关
*/
<template>
  <div class="ala-switch-view">
    <div :class="['ala-switch ala-switch__animbg ', {'checked': switchTap }]" @click="switchTapFn"></div>
  </div>
</template>

<script>
export default {
  name: 'ala-switch',
  data() {
    return {}
  },
  props: {
    switchTap: {
      type: Boolean,
      default: true
    },
    isCanTap: {
      type: Boolean,
      default: true
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    switchTapFn() {
      if (this.isCanTap) {
        this.switchTap = !this.switchTap
        this.$emit('getSwitchDataFn', this.switchTap)
      }
    }
  }
}
</script>

<style leng="less">
.ala-switch {
  width: 41px;
  height: 25px;
  position: relative;
  border: 1px solid #dfdfdf;
  background-color: #fdfdfd;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border-radius: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-clip: content-box;
  display: inline-block;
  -webkit-appearance: none;
  user-select: none;
  outline: none;
}
.ala-switch:before {
  content: '';
  width: 25px;
  height: 25px;
  position: absolute;
  top: 0px;
  left: 0;
  border-radius: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
.ala-switch.checked {
  border-color: #4CD964;
  box-shadow: #4CD964 0 0 0 16px inset;
  background-color: #4CD964;
}
.ala-switch.checked:before {
  left: 21px;
}
.ala-switch.ala-switch__animbg {
  transition: background-color ease 0.4s;
}
.ala-switch.ala-switch__animbg:before {
  transition: left 0.3s;
}
.ala-switch.ala-switch__animbg.checked {
  box-shadow: #dfdfdf 0 0 0 0 inset;
  background-color: #4CD964;
  transition: border-color 0.4s, background-color ease 0.4s;
}
.ala-switch.ala-switch__animbg.checked:before {
  transition: left 0.3s;
}
</style>
