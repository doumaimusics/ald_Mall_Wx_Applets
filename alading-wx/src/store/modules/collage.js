/**
 * Created by xiejun on 2018/11/23.
 * 拼团store
 */
import commonApi from '@/api/common'
import api from '@/api/collage'
import collageOrderStatus from 'utils/collageOrderStatus'
import { normalRequest, mergeTokenHeader } from '../core'

import Tips from 'utils/tip'
import cache from 'utils/cache'
import orderConfirmStatus from 'pcollagecomp/orderConfirmStatus'
import conf from '@/conf'

const state = {
  // 主页索引 1拼团 2我的
  index: 1,
  // 频道索引
  channelIndex: 0,
  // 主页数据
  indexData: [],

  // 我的订单列表索引
  myOrderIndex: 0,
  // 我的订单列表
  myOrderList: [],

  // 商品id列表
  goodsIdList: [],
  // 商品详情数据
  goodsDetailData: null,
  // 商品确认订单数据
  orderComfirmGoodsData: null,

  // 订单确认支付状态， 默认0、立即拼团1
  orderConfirmStatus: 0,

  // 分享页数据参数
  shareParams: null,
  // 分享页数据参数列表
  shareParamsList: [],
  // 分享页数据
  toShareData: null,

  // 订单详情参数
  orderDetailParams: null,
  // 订单详情数据
  orderDetailData: null,

  // process count 拼团假数据
  collageFake: -1,
  collageFakeTime: 0,

  // 站内拼团
  attendFastPinOrderNo: -1
}

const getters = {
  // 返回是否为主页拼团tab
  isIndexCollage: state => state.index === 1,
  categoryList: state => {
    let list = state.indexData.categoryList
    if (!list) list = []
    return list
  },
  hasChannelData: (state, getters) => getters.categoryList.length > 0,
  // 对应频道的name值
  channelList: (state, getters) => {
    if (getters.hasChannelData) return getters.categoryList.map(value => value.name)
    return []
  },
  channelData: (state, getters) => {
    if (getters.hasChannelData) return getters.categoryList[state.channelIndex]
    return null
  },
  bannerList: state => {
    let list = state.indexData.bannerList
    if (!list) list = []
    return list
  },
  featured: state => {
    let list = state.indexData.featured
    if (!list) list = []
    return list
  },
  iconList: state => {
    let list = state.indexData.iconList
    if (!list) list = []
    return list
  },
  // 当前商品id， 若商品不存在，则为-1
  currentGoodsId: state => {
    let len = state.goodsIdList.length
    if (len) {
      return state.goodsIdList[len - 1]
    }
    return -1
  },
  myOrderList: state => {
    let list = state.myOrderList
    list.forEach(value => (value.orderInfo = collageOrderStatus.info(value)))
    return list
  },
  // 当前share pamras， 若不存在，则为null
  currentShareParams: state => {
    let len = state.shareParamsList.length
    if (len) {
      return state.shareParamsList[len - 1]
    }
    return null
  },
  // 确认订单状态信息
  orderConfirmStatusInfo: state => {
    return orderConfirmStatus.statusInfo(state.orderConfirmStatus)
  }
}

const actions = {
  // 重置拼团主页
  resetIndex({ commit }) {
    commit('setIndex', 1)
    commit('setChannelIndex', 0)
    commit('clearShareParams')
    commit('clearGoodsId')
  },
  // 取拼团主页数据
  async getIndexData({ commit, getters }) {
    let params = { tag: 'PT' }
    await normalRequest(api.getIndex, params, data => {
      commit('setIndexData', data)
    })
  },
  // 取商品详情数据
  async getGoodsDetail({ commit, getters, rootState }, params) {
    Tips.loading()

    let goodsId = getters.currentGoodsId
    if (goodsId < 0) {
      commit('setGoodsDetailData', null)
      return
    }

    params.goodsId = goodsId
    // 缓存处理
    let cacheKey = 'goodsDetailDataCollage'
    let cacheGoodsData = cache.mapGet(cacheKey, goodsId)
    if (cacheGoodsData) {
      commit('setGoodsDetailData', cacheGoodsData)
    } else {
      commit('setGoodsDetailData', null)
    }

    params = mergeTokenHeader(rootState, params)
    await normalRequest(api.getGoodsDetail, params, data => {
      commit('setGoodsDetailData', data)
      cache.mapPush(cacheKey, goodsId, data, cache.TIME_LONG)
    })
    Tips.loaded()
  },
  // 取得立即购买商品的规格
  async getBuyGoodsSpec({ getters, rootState }, params) {
    let goodsId = getters.currentGoodsId
    if (goodsId < 0) {
      return null
    }
    params.goodsId = goodsId
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(commonApi.getGoodsSpec, params)
    return data
  },
  // 取得差一个拼团订单列表
  async getOneLessOrderList({ commit, rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.getOrderListWithOneLess, params)
    return data
  },
  // 取得我的列表
  async getMyOrderList({ commit, rootState }) {
    let params = {}
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.myOrderList, params, data => {
      let list = data.listOrderDetail
      if (!list) list = []
      commit('setMyOrderList', list)
    })
    return data
  },
  // 确认订单 ---支付
  async attendGroup({ rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.attendGroup, params)
    return data
  },

  // 取得订单详情数据
  async getOrderDetail({ state, commit, rootState }) {
    let params = state.orderDetailParams

    // 缓存处理
    let cacheKey = 'orderDetailDataCollage'
    let cacheOrderData = cache.mapGet(cacheKey, params.orderId)
    if (cacheOrderData) {
      commit('setOrderDetailData', cacheOrderData)
    } else {
      commit('setOrderDetailData', null)
    }

    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.orderDetail, params, data => {
      commit('setOrderDetailData', data)
      // 临时处理一下订单详情头部不变化的问题，先注掉
      // cache.mapPush(cacheKey, params.orderId, data, cache.TIME_LONG)
    })
    return data
  },
  // 取得去分享页数据
  async getSharePage({ state, getters, commit, dispatch, rootState }) {
    let params = getters.currentShareParams ? getters.currentShareParams : {}
    params = mergeTokenHeader(rootState, params)
    if (params.goodsId) {
      // 存在goodsId
      await normalRequest(api.sharePage, params, data => {
        commit('setToShareData', data)
      })
    } else {
      await normalRequest(commonApi.judgePayResultPage, params, data => {
        let { goodsId, goodsPriceId, pinOrderNo } = data
        let orderId = params.orderId
        commit('popShareParams')
        commit('pushShareParams', { orderId, goodsId, goodsPriceId, pinOrderNo })
        dispatch('getSharePage')
      })
    }
  },
  // 取消订单详情数据
  async cancelOrder({ rootState }, params) {
    Tips.loading()
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.cancelOrder, params)
    Tips.loaded()
    return data !== null
  },
  // 删除订单详情数据
  async deleteOrder({ rootState }, params) {
    Tips.loading()
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.deleteOrder, params)
    Tips.loaded()
    let success = data !== null
    if (success) {
      Tips.toast('删除成功')
    }
    return success
  }
}

const mutations = {
  setIndex(state, data) {
    state.index = data
  },
  setChannelIndex(state, data) {
    state.channelIndex = data
  },
  setIndexData(state, data) {
    let categoryList = data.categoryList
    if (!categoryList) {
      // 兼容老接口数据
      categoryList = data
      data.categoryList = categoryList
      let featured = []
      categoryList.map(value => {
        let f = value.featured
        delete value.featured
        if (f && f.length) {
          featured.push(...f)
        }
      })
      data.featured = featured
    }
    data.categoryList = categoryList.filter(value => value.ordinary && value.ordinary.length)
    state.indexData = data
  },
  setMyOrderIndex(state, data) {
    state.myOrderIndex = data
  },
  setMyOrderList(state, data) {
    state.myOrderList = data
  },
  pushGoodsId(state, data) {
    state.goodsIdList.push(data)
  },
  popGoodsId(state) {
    state.goodsIdList.pop()
  },
  clearGoodsId(state) {
    state.goodsIdList = []
  },
  setGoodsDetailData(state, data) {
    state.goodsDetailData = data
  },
  setOrderComfirmGoodsData(state, data) {
    state.orderComfirmGoodsData = data
  },
  setOrderComfirmStatus(state, data) {
    state.orderConfirmStatus = data
  },
  resetOrderConfirmStatus(state) {
    state.orderConfirmStatus = orderConfirmStatus.NORMAL
  },
  pushShareParams(state, data) {
    state.shareParamsList.push(data)
  },
  popShareParams(state) {
    state.shareParamsList.pop()
  },
  clearShareParams(state) {
    state.shareParamsList = []
  },
  setToShareData(state, data) {
    state.toShareData = data
  },
  setOrderDetailParams(state, data) {
    state.orderDetailParams = data
  },
  setOrderDetailData(state, data) {
    state.orderDetailData = data
  },
  // 更新次数
  updateCollageFakeTime(state) {
    let time = state.collageFakeTime
    if (time < conf.COLLAGE_FAKE_MAX_COUNT) {
      time++
    } else {
      state.collageFake = state.goodsDetailData.processingCount
      time = 0
    }
    if (state.collageFake < 0) {
      state.collageFake = state.goodsDetailData.processingCount
    }
    state.collageFakeTime = time
  },
  setAttendFastPinOrderNo(state, value) {
    state.attendFastPinOrderNo = value
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
