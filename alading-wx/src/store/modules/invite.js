/**
 * Created by liuguangqing on 20181204.
 * 邀请有礼
 */
// import commonApi from '@/api/common'
import api from '@/api/invite'
// import Tips from 'utils/tip'

import {
  normalRequest,
  mergeTokenHeader
} from '../core'

const state = {
  // 首页列表
  inviteData: {},
  QRcodeData: {},
  reveData: {},
  detailData: {}
}
const getters = {

}
const actions = {
  // 邀请有礼
  async getIndexData({
    commit,
    getters,
    rootState
  }) {
    let params = {}
    params = mergeTokenHeader(rootState, params)
    await normalRequest(api.getinvite, params, data => {
      commit('getInviteData', data)
    })
  },
  // 收益
  async getreveData({
    commit,
    getters,
    rootState
  }, getParams) {
    let params = {
      pageNum: getParams.pageNo,
      pageSize: getParams.pageSize
    }
    params = mergeTokenHeader(rootState, params)
    console.log(getParams)
    await normalRequest(api.invitereve, params, data => {
      commit('getinvitereveData', data)
    })
  },
  // 明细
  async getDetailDataFn({
    commit,
    getters,
    rootState
  }, getParams) {
    let params = {
      pageNum: getParams.pageNo,
      pageSize: getParams.pageSize
    }
    if (getParams.userId) {
      params.inviteUserId = getParams.userId
    }
    params = mergeTokenHeader(rootState, params)
    console.log(getParams)
    await normalRequest(api.invitedetail, params, data => {
      commit('getinviteDetailData', data)
    })
  },
  // 获取二维码
  async getQRcode({
    commit,
    getters,
    rootState
  }, getParams) {
    let params = {
      scene: getParams.scene
    }
    if (getParams.page) {
      params.page = getParams.page
    }
    params = mergeTokenHeader(rootState, params)
    console.log(params)
    await normalRequest(api.qrcode, params, data => {
      commit('getQRcodeData', data)
    })
  }
}
const mutations = {
  getInviteData(state, data) {
    state.inviteData = data
  },
  getQRcodeData(state, data) {
    state.QRcodeData = data
  },
  getinvitereveData(state, data) {
    state.reveData = data
  },
  getinviteDetailData(state, data) {
    state.detailData = data
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
