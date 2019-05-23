/**
* Created by xiejun on 2018/10/16.
* operation position 运营位
*/
<template>
  <div v-if="hasSpecialField" class="ala-operation-position" @click="onClick">
    <img :src="specialField.imageUrl" mode="aspectFill">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import basis from 'utils/basis'
import webview from 'utils/webview'
import maidian from 'utils/maidian'

export default {
  name: '',
  data () {
    return {}
  },
  props: {},
  computed: {
    ...mapGetters(['specialField']),
    hasSpecialField () {
      return basis.isObjNotNull(this.specialField)
    }
  },
  created () { },
  mounted () { },
  watch: {},
  methods: {
    onClick () {
      maidian.index(maidian.spm.position)
      webview.openOpeNav(this.specialField.content)
    }
  },
  components: {}
}
</script>

<style lang="less">
.ala-operation-position {
  width: 100%;
  height: 118.5px;
}
</style>
