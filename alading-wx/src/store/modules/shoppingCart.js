/**
 * Created by xiejun on 2019/03/25.
 *
 */
import api from '@/api/shoppingCart'
import conf from '@/conf'
import { normalRequest, mergeTokenHeader } from '../core'

const state = {
  goodsNumber: 0
}
const getters = {}
const actions = {
  async getUserGoodsNumber({ commit, rootState }) {
    let params = mergeTokenHeader(rootState, {})
    params.appVersion = conf.VERSION_APP
    await normalRequest(api.userGoodsNumber, params, data => {
      commit('setUserGoodsNumer', data)
    })
  },
  async addGoods({ rootState, dispatch }, params) {
    params = mergeTokenHeader(rootState, params)
    params.appVersion = conf.VERSION_APP
    let data = await normalRequest(api.addGoods, params)
    let success = data !== null
    if (success) {
      dispatch('getUserGoodsNumber')
    }
    return success
  },
  async getGoodsList({ rootState }) {
    let params = mergeTokenHeader(rootState, {})
    params.appVersion = conf.VERSION_APP
    let data = await normalRequest(api.goodsList, params)
    return data
  },
  async getExpressFeeV2({ rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    params.appVersion = conf.VERSION_APP
    let data = await normalRequest(api.getExpressFeeV2, params)
    return data
  },
  async getPre({ rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    params.appVersion = conf.VERSION_APP
    let data = await normalRequest(api.pre, params)
    return data
  },
  async checkCountBeforeBuy({ rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    params.appVersion = conf.VERSION_APP
    let data = await normalRequest(api.checkCountBeforeBuy, params)
    return data
  },
  async getGoodsSpec({ rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    params.appVersion = conf.VERSION_APP
    let data = await normalRequest(api.getGoodsSpec, params)
    return data
  }
}
const mutations = {
  setUserGoodsNumer(state, value) {
    state.goodsNumber = value.goodsNumber
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
