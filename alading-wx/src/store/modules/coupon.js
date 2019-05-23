/**
 * Created by xiejun on 2019/03/28.
 * 优惠券
 */

import api from '@/api/coupon'
import util from 'utils/index'
import conf from '@/conf'
import couponUtil from 'utils/couponUtil'
import { normalRequest, mergeTokenHeader } from '../core'

const state = {
  // 平台优惠券相关数据
  platformCouponData: {},
  // 商城店铺优惠券相关数据
  shopCouponData: {},
  chooseCouponList: []
}
const getters = {
  hasPlatformCouponData: state => state.platformCouponData,
  chooseCouponIndex: state => state.shopCouponData.chooseIndex,
  chooseCouponList: state => {
    let list = state.chooseCouponList.map((value, index) => {
      let date = util.formatDate(value.gmtEnd)
      let isGot = state.shopCouponData.chooseIndex === index

      let discount = (value.discount * 10).toFixed(1)
      let isAmountSamall = value.amount > 99 || toString(value.amount).length >= 3
      let collapse = false
      return { ...value, isGot, date, discount, isAmountSamall, collapse }
    })
    return list
  }
}
const actions = {
  async getChooseAgencyCouponList({ commit, dispatch }, { params, shopCouponData, platformCouponData }) {
    commit('setChooseCouponList', shopCouponData.couponList)
    commit('setShopCouponData', shopCouponData)
    commit('setPlatformCouponData', platformCouponData)

    params.appVersion = conf.VERSION_APP
    let data = await dispatch('getAgencyCouponList', params)
    shopCouponData.couponList = data.couponList
    commit('setChooseCouponList', data.couponList)
  },
  async getAgencyCouponList({ rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    params.appVersion = conf.VERSION_APP
    let data = await normalRequest(api.getAgencyCouponList, params)
    return data
  },
  async setChooseCouponIndex({ getters, commit }, index) {
    commit('setShopCouponIndex', index)
    if (getters.hasPlatformCouponData) {
      commit('setPlatformCouponIndex', -1)
    }
  },
  async getDetailCouponList({ rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    params.appVersion = conf.VERSION_APP
    let data = await normalRequest(api.getDetailCouponList, params)
    return data
  }
}
const mutations = {
  setChooseCouponList(state, value) {
    state.chooseCouponList = value
  },
  setPlatformCouponData(state, value) {
    state.platformCouponData = value
  },
  setPlatformCouponIndex(state, value) {
    state.platformCouponData.chooseIndex = value
    state.platformCouponData.useCouponAmount = couponUtil.getUseCouponAmount(state.platformCouponData)
  },
  setShopCouponData(state, value) {
    state.shopCouponData = value
  },
  setShopCouponIndex(state, value) {
    state.shopCouponData.chooseIndex = value
    state.shopCouponData.useCouponAmount = couponUtil.getUseCouponAmount(state.shopCouponData)
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
