/**
* Created by huangyilu on 2018/11/27.
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
  data () {
    return {
      switchTap: false
    }
  },
  props: {
    switchTapData: {
      type: Boolean,
      default: null
    }
  },
  computed: {},
  created () { },
  mounted () {
    console.log(' switchTapData == ', this.switchTapData)
    this.switchTap = this.switchTapData
  },
  methods: {
    switchTapFn () {
      this.switchTap = !this.switchTap
      this.$emit('getSwitchDataFn', this.switchTap)
    }
  }
}
</script>

<style leng="less">
.ala-switch {
  width: 82px;
  height: 50px;
  position: relative;
  border: 1px solid #dfdfdf;
  background-color: #fdfdfd;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border-radius: 25px;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  background-clip: content-box;
  display: inline-block;
  -webkit-appearance: none;
  user-select: none;
  outline: none;
}
.ala-switch:before {
  content: "";
  width: 45px;
  height: 45px;
  position: absolute;
  top: 2px;
  left: 0;
  border-radius: 30px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: #fff;
  box-shadow: 0px 5px 2px 0px rgba(0, 0, 0, 0.1),
    0px 2px 2px 0px rgba(0, 0, 0, 0.16), 0px 5px 13px 0px rgba(0, 0, 0, 0.15);
}
.ala-switch.checked {
  border-color: #4cd964;
  box-shadow: #4cd964 0 0 0 16px inset;
  background-color: #4cd964;
}
.ala-switch.checked:before {
  left: 36px;
}
.ala-switch.ala-switch__animbg {
  transition: background-color ease 0.4s;
}
.ala-switch.ala-switch__animbg:before {
  transition: left 0.3s;
}
.ala-switch.ala-switch__animbg.checked {
  box-shadow: #dfdfdf 0 0 0 0 inset;
  background-color: #4cd964;
  transition: border-color 0.4s, background-color ease 0.4s;
}
.ala-switch.ala-switch__animbg.checked:before {
  transition: left 0.3s;
}
</style>
