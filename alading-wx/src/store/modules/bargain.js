/**
 * Created by huangyilu on 2018/12/02.
 * 砍价store
 */
import api from '@/api/bargain'
import Tips from 'utils/tip'
import _ from 'lodash'
import { normalRequest, mergeTokenHeader } from '../core'
import wx from 'wx'
import storage from 'utils/storage'
import basis from 'utils/basis'

const state = {
  // 我的收货地址列表
  addressList: [],
  // 当前所选收货地址
  selectAddress: null,
  // 当前所选收货地址 index
  selectAddressIndex: -1,
  // 当前所选 省市区
  selectProvinceData: null,
  // 当前所选 需要编辑的地址 index
  selectEditAddressIndex: -1,
  // 控制 -1取消/ 1选择地址 / 2编辑、添加地址 弹窗
  addressTCControl: -1,

  // 是否显示 选择规格 弹窗
  isSpecShow: false,
  // 当前所选 规格数据
  selectGoodsSpec: null,
  // 我的砍价详情 id
  userBargainDetailId: -1,
  // 我的砍价订单列表
  bargainOrderList: [],
  // 当前所选 订单index
  selectBargainOrderIndex: -1,
  // 砍价详情 好友砍价列表
  friendsHelpList: [],
  // 是否显示 注册弹窗
  isRegisteredShow: false,

  // 首页商品列表
  bargainGoodsList: [],
  // 当前所选 商品index
  bargainGoodsIndex: -1,
  // 当前 砍价商品详情
  bargainGoodsDetail: null,
  // 当前 砍价商品详情IDs
  bargainGoodsIds: [],
  // 是否是首页商品 吊起规格弹窗
  isBargainHomeSped: false,

  // 发送手机验证码状态, 0为没发送, 1为发送了
  sendVerifyCodeState: 0,
  // 砍价首页tab控制index
  bargainTabIndex: 1,
  // 砍价首页tab控制list
  bargainTabList: [],

  // 分享数据
  shareData: null,
  shareShow: false,

  // 服务器现在时间
  nowTime: null
}

const getters = {
  // 当前bargainGoodsId
  bargainGoodsId: state => _.last(state.bargainGoodsIds),
  // 当前所编辑的地址
  selectEditAddress: state => state.addressList[state.selectEditAddressIndex],
  // 当前所选 订单 数据
  selectBargainOrder: state => state.bargainOrderList[state.selectBargainOrderIndex],
  // 返回是否已经发送了验证码
  hasSendVerfiyCode: state => state.sendVerifyCodeState === 1
}

const mutations = {
  // 设置服务器现在时间
  setNowTime(state, data) {
    state.nowTime = data
  },
  // 设置分享数据
  setShareData(state, data) {
    state.shareData = data
    console.log(' setShareData = ', state.shareData)
  },
  setShareShow(state, data) {
    state.shareShow = data
    console.log(' setShareShow = ', state.ShareShow)
  },
  // 设置 是否是首页商品 吊起规格弹窗
  setIsBargainHomeSped(state, data) {
    state.isBargainHomeSped = data
    console.log(' setIsBargainHomeSped ==  ', state.isBargainHomeSped)
  },
  // 设置 bargainGoodsIds
  setBargainGoodsIdsData(state, ids) {
    state.bargainGoodsIds.push(+ids)
    state.bargainGoodsDetail = _.find(state.bargainGoodsList, item => {
      return +item.freeOrderGoodsId === +ids
    })
    console.log(' set BargainGoodsIdsDat ==  ', state.bargainGoodsIds)
    console.log(' set bargainGoodsDetail ==  ', state.bargainGoodsDetail)
  },
  // 当在goodsDetail goback 时 要删除
  deleteBargainGoodsIdInIds(state) {
    state.bargainGoodsIds = _.dropRight(state.bargainGoodsIds)
  },
  // 设置砍价首页tab
  setBargainTabIndex(state, index) {
    state.bargainTabIndex = index
    if (state.bargainTabList.length > 0) {
      state.bargainTabList.forEach(item => {
        item.selected = false
      })
      state.bargainTabList[index - 1].selected = true
    }
  },
  setBargainTabList(state, data) {
    state.bargainTabList = data
  },
  // 更新 tab是否需要登录
  setBargainTabMine(state, data) {
    if (state.bargainTabList.length > 0) {
      state.bargainTabList[2].isNeedLogin = data !== 1
      console.log(' setBargainTabMine = ', state.bargainTabList)
    }
  },
  // 设置 弹窗 index
  setAddressTCControl(state, index) {
    state.addressTCControl = index
    console.log(' addressTCControl = ', state.addressTCControl)
  },
  // 设置用户地址
  setUserAddressList(state, data) {
    data.forEach(item => {
      _.set(item, 'isSelect', false)
      if (item.isDefault === 'Y') {
        _.set(item, 'isSelect', true)
        state.selectAddress = item
      }
    })
    state.addressList = data
    console.log(' setUserAddressList ', state.addressList)
  },
  // 设置用户选中的 省市区
  setUserSelectProvince(state, address) {
    state.selectProvinceData = address
  },
  // 设置用户选中 编辑的地址index
  setUserSelectEditAddressIndex(state, index) {
    state.selectEditAddressIndex = index
    console.log(' selectEditAddressIndex = ', state.selectEditAddressIndex)
  },
  // 设置用户选中的 完整地址
  setUserSelectAddress(state, data) {
    state.selectAddress = data
    console.log(' setUserSelectAddress = ', data)
  },
  // 设置用户选中的地址 index
  setUserSelectAddressIndex(state, index) {
    state.selectAddressIndex = index
  },
  // 设置首页 砍价商品 列表
  setBargainGoodsList(state, data) {
    state.bargainGoodsList = data
    console.log(' setBargainGoodsList = ', state.bargainGoodsList)
  },
  // 设置用户选中的 砍价商品 index
  setBargainGoodsIndex(state, index) {
    state.bargainGoodsIndex = index
  },
  // 设置用户选中的 砍价商品
  setBargainGoodsDetail(state, data) {
    state.bargainGoodsDetail = data
  },
  // 设置用户选中的 商品规格
  setSelectGoodsSpec(state, data) {
    state.selectGoodsSpec = data
  },
  // 设置 规格弹窗
  setIsSpecShow(state, data) {
    state.isSpecShow = data
    // 如果是首页的
    if (state.isBargainHomeSped && !state.isSpecShow) {
      state.bargainGoodsIds = _.dropRight(state.bargainGoodsIds)
      console.log(' setIsSpecShow bargainGoodsIds == ', state.bargainGoodsIds)
    }
    console.log(' isBargainHomeSped == ', state.isBargainHomeSped)
    console.log(' isSpecShow == ', state.isSpecShow)
  },
  // 设置 我的砍价详情 ID
  setUserBargainDetailId(state, id) {
    state.userBargainDetailId = id
  },
  // 设置 我的砍价 订单列表
  setBargainOrderList(state, data) {
    state.bargainOrderList = data
    console.log(' set state.bargainOrderList = ', state.bargainOrderList)
  },
  // 设置 我的砍价 订单 index
  setSelectBargainOrderIndex(state, index) {
    state.selectBargainOrderIndex = index
    console.log(' set state.selectBargainOrderIndex = ', state.selectBargainOrderIndex)
  },
  // 设置 砍价详情 好友砍价列表
  setFriendsHelpList(state, data) {
    state.friendsHelpList = data
    console.log(' setFriendsHelpList ', state.friendsHelpList)
  },
  // 设置 砍价详情 好友砍价列表
  setIsRegisteredShow(state, data) {
    state.isRegisteredShow = data
    console.log(' setIsRegisteredShow ', state.isRegisteredShow)
  },
  // 设置手机验证码发送状态
  setSendVerifyCodeState(state, value) {
    state.sendVerifyCodeState = value
    console.log(' setSendVerifyCodeState ', state.sendVerifyCodeState)
  }
}

const actions = {
  // 获取 活动规则
  async getBargainRule() {
    let data = await normalRequest(api.getBargainRule, {})
    return data
  },
  // 获取 商品限购 信息
  async getBargainGoodsLimitInfo({ rootState }, params) {
    Tips.loading()
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.getBargainGoodsLimitInfo, params)
    Tips.loaded()
    return data
  },
  // 获取 砍价商品 列表
  async getBargainIndexGoodsList({ rootState, commit }) {
    let params = mergeTokenHeader(rootState, {})
    let data = await normalRequest(api.getBargainIndexGoods, params)
    console.log(' getBargainIndexGoodsList ')
    commit('setIsLogin', data.loginStatus, { root: true })
    commit('setBargainGoodsList', data.todayGoodss)
    commit('setBargainTabMine', data.loginStatus)
    return data
  },
  // 获取 砍价商品 详情
  async getBargainIndexGoodsDetail({ state, rootState, getters, commit }) {
    if (state.bargainGoodsIds.length <= 0) {
      return
    }
    let params = mergeTokenHeader(rootState, { freeOrderGoodsId: getters.bargainGoodsId })
    let data = await normalRequest(api.getBargainIndexGoodsDetail, params)
    commit('setBargainGoodsDetail', data.freeOrderGoodsDetail)
    commit('setIsLogin', data.loginStatus, { root: true })
    return data.freeOrderGoodsDetail
  },
  // 获取 收货地址 列表
  async getUserAddressList({ rootState, commit }) {
    Tips.loading()
    let params = mergeTokenHeader(rootState, {})
    let data = await normalRequest(api.getUserAddressList, params)
    if (data !== null) {
      commit('setAddressTCControl', 1)
      commit('setUserAddressList', data)
    } else {
      commit('setAddressTCControl', 2)
    }
    Tips.loaded()
    return data
  },
  // 添加 收货地址
  async addUserAddress({ rootState, commit, dispatch }, params) {
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.addUserAddress, params)
    commit('setUserSelectAddress', data.addressInfo)
    dispatch('getUserAddressList')
    return data
  },
  // 编辑 更改 地址
  async changeUserAddress({ rootState, commit, dispatch }, params) {
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.changeUserAddress, params)
    commit('setUserSelectAddress', params)
    dispatch('getUserAddressList')
    if (data) {
      return params.addressId
    }
    return data
  },
  // 发起助力砍价
  async createBargain({ state, rootState, commit, dispatch }, params) {
    Tips.loading()
    let mergeParams = {}
    if (params) {
      mergeParams = mergeTokenHeader(rootState, {
        freeOrderGoodsId: params.freeOrderGoodsId,
        addressId: params.addressId,
        goodsPriceId: params.goodsPriceId
      })
    } else {
      console.log(' freeOrderGoodsId == ', state.bargainGoodsDetail.freeOrderGoodsId)
      console.log(' addressId == ', state.selectAddress.rid ? state.selectAddress.rid : state.selectAddress.addressId)
      console.log(' goodsPriceId == ', state.selectGoodsSpec.goodsSpecId)
      mergeParams = mergeTokenHeader(rootState, {
        freeOrderGoodsId: state.bargainGoodsDetail.freeOrderGoodsId,
        addressId: state.selectAddress.rid ? state.selectAddress.rid : state.selectAddress.addressId,
        goodsPriceId: state.selectGoodsSpec.goodsSpecId
      })
    }
    console.log(' createBargain mergeParams == ', mergeParams)

    let data = await normalRequest(api.createBargain, mergeParams)
    console.log(' normalRequest createBargain == ', data)
    commit('setUserBargainDetailId', data.userFreeOrderDo.freeOrderId)
    commit('setAddressTCControl', -1)
    dispatch('getFriendsHelpList', {
      freeOrderId: data.userFreeOrderDo.freeOrderId
    })
    Tips.loaded()
    return data.userFreeOrderDo
  },
  // 我的砍价 详情
  async getBargainOrderDetail({ rootState, commit }, params) {
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.getBargainOrderDetail, params)
    return data
  },
  // 我的砍价 订单列表
  async getUserBargainOrderList({ rootState, commit }) {
    let params = mergeTokenHeader(rootState, {})
    let data = await normalRequest(api.getUserBargainOrderList, params)
    if (data.userGoodsList != null) {
      commit('setBargainOrderList', data.userGoodsList)
      commit('setNowTime', data.now)
    } else {
      commit('setBargainOrderList', [])
    }
    return data
  },
  // 删除我的订单
  async delectUserBargainOrder({ rootState, getters, dispatch }) {
    Tips.loading()
    console.log(' delectUserBargainOrder getters.selectBargainOrder == ', getters.selectBargainOrder)
    let value = {
      freeOrderId: getters.selectBargainOrder.freeOrderId
    }
    let params = mergeTokenHeader(rootState, value)
    console.log(' delectUserBargainOrder == ', params)
    let data = await normalRequest(api.delectUserBargainOrder, params)
    if (data) {
      Tips.toast('删除成功')
      await dispatch('getUserBargainOrderList')
    }
    return data
  },
  // 获取好友帮砍列表
  async getFriendsHelpList({ commit, rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.getFriendsHelpList, params)
    commit('setFriendsHelpList', data)
    return data
  },
  // 获取 短信验证码
  async sendVerifyCode({ rootState, commit }, params) {
    Tips.loading()
    params.smsType = 'M'
    params.deviceType = 3
    params.loginSource = 5
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.sendVerifyCode, params, async data => {
      commit('setSendVerifyCodeState', 1)
      Tips.loaded()
      Tips.toast('验证码发送成功')
    })
    return data
  },
  // 注册
  async registered({ rootState, commit }, params) {
    // 取得微信code
    let res = await new Promise((resolve, reject) => {
      wx.login({ success: resolve, fail: reject })
    })
    params.code = res.code
    params.registerType = 'FREE_ORDER'
    params.wechatType = 2
    params.smsType = 'M'
    // 注册来源渠道ID
    params.registerChannelId = 728
    // 注册来源渠道位置ID
    params.registerChannelPointId = 1280
    params = mergeTokenHeader(rootState, params)

    let data = await normalRequest(api.registered, params, async data => {
      // 更新用户信息
      let tokenData = {
        ...data.userDo,
        boundMobile: 1,
        token: data.token,
        timeout: basis.getTimer()
      }
      storage.props.tokenData = tokenData

      commit('setToken', data.token, { root: true })
      commit('setIsLogin', true, { root: true })
      commit('setUserInfo', data.userDo, { root: true })
      commit('setIsBoundMobile', true, { root: true })
    })
    return data
  },
  // 一键提醒好友userInviteHelpRemind
  async sendRemindFriends({ dispatch, rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    await normalRequest(api.userInviteHelpRemind, params, async data => {
      dispatch('getFriendsHelpList', {
        freeOrderId: params.freeOrderId
      })
      Tips.toast('提醒成功')
      return data
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
