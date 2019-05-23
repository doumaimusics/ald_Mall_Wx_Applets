import Vue from 'vue'
import App from '@/App'
import store from '@/store'
import MpvueRouterPatch from 'mpvue-router-patch'

import './styles/alading.less'

Vue.config.productionTip = false
Vue.use(MpvueRouterPatch)
App.store = store
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
