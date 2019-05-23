import systemInfo from 'utils/systemInfo'
export default {
  computed: {
    isIphoneX() {
      return systemInfo.isIphoneX
    }
  }
}
