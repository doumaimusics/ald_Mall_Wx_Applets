// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

import tabbarConfig from './tabbarConfig'
import wx from 'wx'
import api from '@/api/common'
import storage from 'utils/storage'
import Tips from 'utils/tip'
import basis from 'utils/basis'
import cache from 'utils/cache'
import lcUtil from 'utils/lcUtil'
import conf from '@/conf'
import _ from 'lodash'
import { Base64 } from 'js-base64'

import { commonResult, commonResultProcess } from '@/api/core'
import { normalRequest, mergeTokenHeader, mergeOrderIdParam, mergeUserIdHeader, mergeOldTokenHeader } from './core'
import test from './modules/test'
import invite from './modules/invite'
import bargain from './modules/bargain'
import collage from './modules/collage'
import repay from './modules/repay'
import shoppingCart from './modules/shoppingCart'
import coupon from './modules/coupon'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    test,
    invite,
    bargain,
    collage,
    repay,
    shoppingCart,
    coupon
  },
  state: {
    // token
    token: '',
    // old token
    oldToken: '',
    // token api
    tokenApi: '',
    // 是否绑定手机, true为绑定
    isBoundMobile: false,
    // 是否登录
    isLogin: false,
    // 发送手机验证码状态, 0为没发送, 1为发送了
    sendVerifyCodeState: 0,
    // 标记是否存在去登录的操作
    isToLogin: false,

    // 设置用户信息
    userInfo: {},

    // tabbar配置
    tabbarConfigs: [],
    // 当前选中的tabbar
    currentTabbarIndex: 0,
    // tabbar info信息
    tabbarInfor: {},

    // 当前选中的频道
    currentChannelIndex: 0,
    // 首页数据
    homePageInfo: {},

    // 搜索页数据
    searchData: {},

    // 当前选中的分类
    currentCategoryIndex: 0,
    // 分类列表
    categoryList: [],

    // 我的面面数据
    minePageInfo: {},

    // 当前显示的订单状态索引
    currentOrderStatusIndex: 0,
    // 当前订单id
    currentOrderId: -1,
    // 订单详情数据
    orderDetailData: {},

    // 标记是否为去选择地址
    isSelectAddress: false,
    // 用户选择的地址数据
    userSelectAddress: null,
    // 当前编辑的地址
    currentEditAddressIndex: -1,
    // 用户地址列表
    addressList: [],

    // 当前选中的优惠券，默认状态为-2, 不选择券为-1
    availableCouponIndex: -2,
    // 可用优惠券列表
    availableCouponList: [],

    // 当前所 预下单商品
    confirmGoodsData: {},
    // 当前商品详情ID
    goodsIds: [],
    // 商品详情数据
    goodsDetailData: null,

    // webviews
    webviewUrls: [],
    // 支付完成页的运营位
    paysuceOperate: [],
    // 表单id列表
    formIdList: [],
    // location code 来源 用于标记用户下单的来源
    lc: '',
    // 是否要开启引导页
    guideShow: false
  },
  getters: {
    // 返回是否已经发送了验证码
    hasSendVerfiyCode: state => state.sendVerifyCodeState === 1,
    // openid
    openId: state => state.userInfo.openId,
    // 用户名
    userName: state => state.userInfo.username,
    // 是否登录
    isLogin: state => state.isLogin,
    // 用户id
    // userId: state => 980186,
    userId: state => state.userInfo.rid,
    // tabbar配置
    tabbarConfigs: state => {
      return tabbarConfig.getTabbarConfigs(state.tabbarConfigs, state.tabbarInfor)
    },
    // 存在首页数据
    hasHomePageInfo: state => basis.isObjNotNull(state.homePageInfo),
    // 频道列表
    channelList: (state, getters) => {
      if (getters.hasHomePageInfo) return [{ tabName: '推荐' }].concat(state.homePageInfo.tabList)
      return []
    },
    // 头部广告
    bannerList: (state, getters) => {
      if (getters.hasHomePageInfo) return state.homePageInfo.bannerList || []
      return []
    },
    // 快捷导航列表
    navigationList: (state, getters) => {
      if (getters.hasHomePageInfo) return state.homePageInfo.navigationList || []
      return []
    },
    // 运营位
    specialField: (state, getters) => {
      if (getters.hasHomePageInfo) return state.homePageInfo.specialField || {}
      return {}
    },
    // 当前频道id
    channelId: (state, getters) => getters.channelList[state.currentChannelIndex].tabId,

    // 存在我的页数据
    hasMinePageInfo: state => basis.isObjNotNull(state.minePageInfo),
    // 当前编辑的地址数据
    editAddressData: state => state.addressList[state.currentEditAddressIndex],
    // 确认订单 可选优惠券数据
    availableCouponData: state => state.availableCouponList,
    // 确认订单 所选优惠券数据
    comSelectedCoupon: state => state.availableCouponList[state.availableCouponIndex],
    // 当前选择 下单的商品 数据
    confirmGoodsData: state => state.confirmGoodsData,

    // 当前所选 地址
    comSelectedAddress: state => state.addressList[state.selectAddressIndex],
    // 当前选中的优惠券ID
    availableCouponIndex: state => state.availableCouponIndex,
    // 当前goodsId
    goodsId: state => _.last(state.goodsIds),
    // 取当前webviewURL 并转码
    webviewUrl: state => {
      let url = _.last(state.webviewUrls)
      if (url) {
        let decodeUrl = Base64.decode(url)
        if (decodeUrl.indexOf('visualization') > -1) {
          let queryData = basis.urldecoded(decodeUrl)
          if (queryData.spread) queryData.spread = 'wechat'
          decodeUrl = decodeUrl.split('?')[0] + '?' + basis.urlencoded(queryData)
          // 为可视化增加lc
          state.lc = lcUtil.visualization(queryData.id)
        }
        decodeUrl = decodeUrl + '&isLogin=' + state.isLogin + '&t=' + state.token + '&appVersion=' + conf.VERSION_APP
        return encodeURI(decodeUrl)
      }
      return ''
    },
    encodeWebviewUrl: state => {
      return _.last(state.webviewUrls)
    }
  },
  mutations: {
    // 设置Tabbar数据
    setTabbarInfor(state, data) {
      state.tabbarInfor = data
    },
    // 设置token
    setToken(state, token) {
      state.token = token
    },
    // 设置old token
    setOldToken(state, token) {
      state.oldToken = token
    },
    // 设置token api
    setTokenApi(state, token) {
      state.tokenApi = token
    },
    // 设置是否绑定
    setIsBoundMobile(state, value) {
      state.isBoundMobile = value
    },
    // 设置是否登录
    setIsLogin(state, value) {
      state.isLogin = value
    },
    // 设置手机验证码发送状态
    setSendVerifyCodeState(state, value) {
      state.sendVerifyCodeState = value
    },
    // 标记是否存在去登录的操作
    setIsToLogin(state, value) {
      state.isToLogin = value
    },
    // 设置用户信息、
    setUserInfo(state, data) {
      state.userInfo = data
      storage.props.loginMobile = data.mobile
    },
    // 设置当前选中的tabbar
    setCurrentTabbarIndex(state, index) {
      state.currentTabbarIndex = index
    },
    // 设置当前选中的频道
    setCurrentChannelIndex(state, index) {
      state.currentChannelIndex = index
    },
    // 设置首页数据
    setHomePageInfo(state, data) {
      state.homePageInfo = data
    },
    // 设置搜索数据
    setSearchData(state, data) {
      state.searchData = data
    },
    // 清空搜索数据中的历史搜索数据
    clearSearchHistoryData(state) {
      state.searchData.historyList = []
    },
    // 设置分类列表索引
    setCurrentCategoryIndex(state, index) {
      state.currentCategoryIndex = index
    },
    // 设置分类列表
    setCategoryList(state, data) {
      state.categoryList = data.oneLevelList
    },
    // 设置我的页面数据
    setMinePageInfo(state, data) {
      state.minePageInfo = data
    },
    // 当前显示的订单状态索引
    setCurrentOrderStatusIndex(state, index) {
      state.currentOrderStatusIndex = index
    },
    // 设置当前的订单id
    setCurrentOrderId(state, id) {
      state.currentOrderId = id
    },
    // 设置订单详情数据
    setOrderDetailData(state, data) {
      state.orderDetailData = data
    },
    // 更新订单详情数据
    updateOrderDetailData(state, data) {
      let orderData = state.orderDetailData
      basis.setObjProp(orderData, data)
    },
    // 设置编辑的地址
    setIsSelectAddress(state, value) {
      state.isSelectAddress = value
    },
    // 设置编辑的地址
    setCurrentEditAddressIndex(state, index) {
      state.currentEditAddressIndex = index
    },
    // 设置用户地址列表
    setUserAddressList(state, data) {
      state.addressList = data
    },
    // 设置用户选中的地址
    setUserSelectAddressIndex(state, index) {
      state.selectAddressIndex = index
    },
    // 设置用户选中的地址数据
    setUserSelectAddress(state, data) {
      if (data) {
        state.userSelectAddress = { ...data }
      } else {
        state.userSelectAddress = null
      }
    },
    // 设置对应索引的用户收货地址
    setUserAddressByIndex(state, { data, index }) {
      let addressData = state.addressList[index]
      let keys = Object.keys(data)
      keys.forEach(key => {
        if (addressData[key]) addressData[key] = data[key]
      })
    },
    // 根据对应的索引删除用户地址列表项
    deleteUserAddressListByIndex(state, index) {
      state.addressList.splice(index)
    },
    // 确认订单 选择的优惠券
    setAvailableCouponList(state, data) {
      state.availableCouponList = data
    },
    // 确认订单 选择的优惠券 index
    setAvailableCouponIndex(state, index) {
      state.availableCouponIndex = index
    },
    // 当前选择 下单的商品 数据
    setConfirmGoodsData(state, data) {
      state.confirmGoodsData = data
    },
    // 设置商品详情 数据
    setGoodsDetailData(state, data) {
      state.goodsDetailData = data
    },
    // 设置goodsIds
    setGoodsIdsData(state, ids) {
      state.goodsIds.push(+ids)
    },
    // 当在goodsDetail goback 时 要删除
    deleteGoodsIdInIds(state) {
      state.goodsIds = _.dropRight(state.goodsIds)
    },
    // 设置webview url s
    setWebviewUrlsData(state, url) {
      state.webviewUrls.push(url)
    },
    // 当在webview goback 时 要删除
    deleteWebviewUrlInUrls(state) {
      state.webviewUrls = _.dropRight(state.webviewUrls)
    },
    // 设置支付完成页的运营位
    setPaysuceOperate(state, data) {
      state.paysuceOperate = data
    },
    // form id list push
    formIdListPush(state, id) {
      state.formIdList.push(id)
    },
    // form id list pop
    formIdListClear(state) {
      state.formIdList = []
    },
    // 设置lc
    setLocationCode(state, lc) {
      state.lc = lc
      console.log('set location code', state.lc)
    },
    // 设置是否开启引导页（一次性功能）
    setGuideShow(state, data) {
      state.guideShow = data.showGuideSwitch === 1
      if (state.guideShow && storage.props.guideStatus === '') {
        storage.props.guideStatus = { home: true, mine: true }
      }
    }
  },
  actions: {
    // 取得底部tabbar
    async getTabbarInfo({ commit }) {
      normalRequest(api.getTabbarInfo, {}, data => commit('setTabbarInfor', data))
    },

    // 根据微信code取得用户的token
    async getToken({ state, dispatch, commit }) {
      let tokenData = storage.props.tokenData

      let isNeedGetToken = !tokenData || basis.checkTimeoutD(conf.TIMEOUT_TOKEN, tokenData.timeout)
      if (isNeedGetToken) {
        // 取得微信code
        let res = await new Promise((resolve, reject) => {
          wx.login({ success: resolve, fail: reject })
        })

        let params = { code: res.code }
        tokenData = await normalRequest(api.getToken, params)
        // 加入时效
        if (tokenData) tokenData.timeout = basis.getTimer()
      }

      if (tokenData) {
        storage.props.tokenData = tokenData

        commit('setToken', tokenData.token)

        let isBoundMobile = tokenData.boundMobile === 1
        commit('setIsBoundMobile', isBoundMobile)
        commit('setIsLogin', isBoundMobile)

        // has bound Mobile
        if (isBoundMobile) {
          // 设置用户信息
          commit('setUserInfo', tokenData)
        }
      }
      return tokenData
    },

    // 根据微信code取得用户的老token
    async getOldToken({ state, getters, commit }) {
      if (state.oldToken) return true

      let params = {}
      params = mergeTokenHeader(state, params)
      let response = await api.getOldToken(params)
      let data = commonResultProcess(null, response)
      if (data) {
        commit('setOldToken', data)
      }
      return data !== null
    },
    // 发送验证码
    async sendVerifyCode({ state, commit }, params) {
      Tips.loading()

      params.smsType = 'Q'
      await normalRequest(api.getSms, params, data => {
        commit('setSendVerifyCodeState', 1)
        Tips.loaded()
        Tips.success('验证码已发送')
      })

      Tips.loaded()
    },

    // 绑定手机
    async boundMobile({ state, commit }, params) {
      let data = await normalRequest(api.boundMobile, params, data => {
        commit('setToken', data.token)
        commit('setIsLogin', true)
      })
      return data !== null
    },

    // 手机快捷登录
    async quickLogin({ state, commit, dispatch }, params) {
      Tips.loading()
      params = mergeTokenHeader(state, params)
      let data = await normalRequest(api.quickLogin, params, async data => {
        let tokenData = {
          ...data.userDo,
          boundMobile: 1,
          token: data.token,
          timeout: basis.getTimer()
        }
        storage.props.tokenData = tokenData

        commit('setToken', data.token)
        commit('setIsLogin', true)
        // 设置用户信息
        commit('setUserInfo', data.userDo)
        // 登录成功后，需要更新下用户的信息
        await dispatch('getMineInfo', false)

        Tips.success('登录成功')
      })
      Tips.loaded()
      return data !== null
    },
    // 设置当前频道
    setCurrentChannelIndex({ getters, commit }, index) {
      // 更新频道
      commit('setCurrentChannelIndex', index)
      // 更新频道对应的lc
      let channelData = getters.channelList[index]
      let lc = lcUtil.channel(channelData)
      commit('setLocationCode', lc)
    },
    // 取得首页数据
    async getHomePageInfo({ getters, commit, dispatch }, refresh = false) {
      // 缓存处理
      if (!refresh && getters.hasHomePageInfo) return

      Tips.loading()
      let params = {}
      let data = await normalRequest(api.getHomePageInfo, params, data => {
        commit('setHomePageInfo', data)
      })
      Tips.loaded()

      return data
    },
    // 取得搜索页数据
    async getSearchData({ state, commit }) {
      let params = mergeTokenHeader(state, {})
      let data = await normalRequest(api.getSearchHome, params, data => {
        commit('setSearchData', data)
      })
      return data !== null
    },
    // 删除搜索历史记录
    async deletHistorySearch({ state, commit }) {
      let params = mergeTokenHeader(state, {})
      let data = await normalRequest(api.deletHistorySearch, params)
      if (data) {
        // 删除成功
        commit('clearSearchHistoryData')
      }
      return data !== null
    },
    // 取得底部更多商品信息
    async getBottomMoreGoods({ state, commit }, params) {
      let data = await normalRequest(api.getBottomMoreGoods, params)
      return data
    },

    // 取得频道页更多商品详情
    async getChannelMoreGoods({ state, commit }, params) {
      let data = await normalRequest(api.getChannelMoreGoods, params)
      return data
    },
    // 取得分类列表
    async getCategoryList({ state, commit }, refresh = false) {
      // 缓存处理
      if (!refresh && state.categoryList.length) return

      Tips.loading()
      await normalRequest(api.getAllGoodsCategory, {}, data => {
        commit('setCategoryList', data)
      })
      Tips.loaded()
    },
    // 取得三级分类商品列表
    async getGoodsList({ state, commit }, params) {
      // desc  asc
      // params.priceSort = 'asc'
      let data = await normalRequest(api.getGoodsList, params)
      return data
    },
    // 取得我的页面数据
    async getMineInfo({ state, getters, commit }, isCheck) {
      let userId = getters.userId
      if (userId) {
        Tips.loading()

        let params = mergeTokenHeader(state, {})
        await normalRequest(api.getMineInfo, params, data => {
          commit('setMinePageInfo', data)
        })
        Tips.loaded()
      }
    },
    // 取得用户订单列表
    async getOrderList({ state, getters, commit }, params) {
      params = mergeTokenHeader(state, params)
      let data = await normalRequest(api.getOrderList, params)
      return data
    },
    // 订单确认收货
    async confirmReceipt({ state, getters, dispatch }, params) {
      Tips.loading()
      params = mergeOldTokenHeader(state, params)
      params = mergeUserIdHeader(getters, params)
      let data = await normalRequest(api.confirmReceipt, params, () => dispatch('getMineInfo', false))
      Tips.loaded()
      return data !== null
    },
    // 取得用户的地址列表
    async getUserAddressList({ state, getters, commit }) {
      let params = mergeTokenHeader(state, {})
      let data = await normalRequest(api.getUserAddressList, params, data => {
        // data = []
        commit('setUserAddressList', data)
      })
      return data !== null
    },
    // 更改用户默认地址
    async changeUserDefaultAddress({ state, dispatch, commit }, index) {
      let addressList = state.addressList
      // 取得当前默认的地址
      let currentDefaultIndex = -1
      addressList.some((x, index) => {
        let isDefault = x.isDefault === 'Y'
        if (isDefault) currentDefaultIndex = index
        return isDefault
      })

      let addressData = addressList[index]
      let params = {
        addressId: addressData.rid,
        consignee: addressData.consignee,
        mobile: addressData.mobile,
        province: addressData.province,
        city: addressData.city,
        county: addressData.county,
        address: addressData.address,
        isDefault: 'Y'
      }
      let success = await dispatch('changeUserAddress', { params, index })
      if (success) {
        // 更新当前默认地址为空
        if (currentDefaultIndex >= 0) {
          // commit('setUserAddressByIndex', { data: { isDefault: 'N' }, index: currentDefaultIndex })
        }
      }
      return success
    },
    // 更改用户收货地址
    async changeUserAddress({ state, getters, dispatch, commit }, { params, index }) {
      // 保存
      Tips.loading()
      params = mergeTokenHeader(state, params)
      let response = await api.changeUserAddress(params)
      let data = commonResult(response)
      if (data) {
        // 更新用户对应收货地址
        let addressData = { ...params }
        addressData.rid = params.addressId
        commit('setUserAddressByIndex', { data: addressData, index })

        // 更新用户地址列表
        await dispatch('getUserAddressList')
      }
      Tips.loaded()
      return data !== null
    },
    // 保存用户新增地址
    async addUserAddress({ state, getters, dispatch }, params) {
      // 保存
      Tips.loading()
      params = mergeTokenHeader(state, params)

      let response = await api.addUserAddress(params)
      let data = commonResult(response)
      if (data) {
        // 更新用户地址列表
        await dispatch('getUserAddressList')
        Tips.toast('添加地址成功')
      }
      Tips.loaded()
      return data !== null
    },
    // 删除用户地址
    async deleteUserAddress({ state, getters, dispatch, commit }, { params, index }) {
      params = mergeTokenHeader(state, params)
      Tips.loading()
      let data = await normalRequest(api.deleteUserAddress, params, async data => {
        // 删除列表对应项
        commit('deleteUserAddressListByIndex', index)
        Tips.loaded()
        Tips.toast('删除成功')
        // 更新用户地址列表
        await dispatch('getUserAddressList')
      })
      return data !== null
    },
    // 获取 可领取优惠券列表
    async getCollectCouponListData({ state, getters, commit }, params) {
      let goodsId = getters.goodsId
      params = mergeTokenHeader(state, { goodsId })
      let data = await normalRequest(api.getCollectCouponList, params)
      return data
    },
    // 领取 优惠券
    async collectCoupon({ state, getters, commit }, params) {
      params = mergeTokenHeader(state, params)
      let data = await normalRequest(api.collectCoupon, params)
      return data
    },
    // 获取 订单详情
    async getOrderDetailData({ state, getters, commit }) {
      let orderId = state.currentOrderId
      // 缓存处理
      let cacheKey = 'orderDetailData'
      let cacheOrderData = cache.mapGet(cacheKey, orderId)
      if (cacheOrderData) {
        commit('setOrderDetailData', cacheOrderData)
      } else {
        commit('setOrderDetailData', {})
      }

      let params = mergeTokenHeader(state, { orderId })
      let data = await normalRequest(api.getOrderDetail, params, data => {
        cache.mapPush(cacheKey, orderId, data, cache.TIME_LONG)
        commit('setOrderDetailData', data)
      })
      return data !== null
    },
    // 获取 订单物流
    async getOrderLogisticsData({ state, getters, commit }, params) {
      params = mergeOrderIdParam(state, params)
      params = mergeTokenHeader(state, params)
      let data = await normalRequest(api.getOrderLogistics, params)
      return data
    },
    // 获取 商品详情
    async getGoodsDetailData({ state, getters, commit }, initData) {
      if (state.goodsIds.length <= 0) {
        return
      }
      Tips.loading()
      let goodsId = getters.goodsId
      let params = mergeTokenHeader(state, { goodsId })
      params.appVersion = conf.VERSION_APP
      // 缓存处理
      // let cacheKey = 'goodsDetailData'
      // let cacheGoodsData = cache.mapGet(cacheKey, goodsId)
      // if (cacheGoodsData) {
      //   commit('setGoodsDetailData', cacheGoodsData)
      // }
      commit('setGoodsDetailData', initData)
      // let params = mergeTokenHeader(state, { goodsId })
      let data = await normalRequest(api.getGoodsDetail, params, data => {
        // cache.mapPush(cacheKey, goodsId, data, cache.TIME_LONG)
        commit('setGoodsDetailData', data)
      })
      // let data = await normalRequest(api.getGoodsDetail, params)
      Tips.loaded()
      return data
    },
    // 获取 商品规格 信息
    async getGoodsSpecData({ state, getters, commit }, params) {
      if (state.goodsIds.length <= 0) {
        return
      }
      params.goodsId = getters.goodsId
      params = mergeTokenHeader(state, params)
      let data = await normalRequest(api.getGoodsSpec, params)
      return data
    },
    // 提交 formId
    async submitFormId({ state, getters, commit }, params) {
      params = mergeTokenHeader(state, params)
      let data = await normalRequest(api.submitFormId, params)
      return data
    },
    // 确认订单 选择优惠券列表
    async getAvailableCouponListData({ state, commit }, params) {
      params = mergeTokenHeader(state, params)
      let response = await api.getAvailableCouponList(params)
      let data = commonResult(response)
      if (data.couponList !== null) {
        commit('setAvailableCouponList', data.couponList)
      }
      return data
    },
    // 所选 优惠券 index
    async setAvailableCouponIndex({ state, commit }, params) {
      commit('setAvailableCouponIndex', params)
    },
    // 获取 我的优惠券 列表
    async getMyCouponListData({ state, commit }, params) {
      params = mergeTokenHeader(state, params)
      params.appVersion = conf.VERSION_APP
      let data = await normalRequest(api.getMyCouponList, params)
      return data
    },
    // 设置 当前选择下单的商品 数据
    async setConfirmGoodsData({ state, commit }, params) {
      commit('setConfirmGoodsData', params)
    },
    // 获取 默认收货地址
    async getUserDefaultAddressData({ state, getters, commit }, params) {
      params = mergeTokenHeader(state, params)

      let data = await normalRequest(api.getUserDefaultAddress, params, data => {
        // 判断是否为空
        if (!data.rid) data = null
        commit('setUserSelectAddress', data)
      })
      return data
    },

    // 获取 我的余额
    async getUserBalanceData({ state, commit }, params) {
      params = mergeTokenHeader(state, params)
      let data = await normalRequest(api.getUserBalance, params)
      return data
    },
    // 支付接口
    async requestToPayOrder({ state, dispatch }, params) {
      Tips.loading()
      params = mergeTokenHeader(state, params)
      params.appVersion = conf.VERSION_APP
      let data = await normalRequest(api.requestToPayOrder, params, data => {
        if (params.addOrder === 1) {
          // 下单成功，更新一下个人数据
          dispatch('getMineInfo', false)
        }
      })
      Tips.loaded()
      return data
    },
    // 获取商品活动优惠
    async getGoodsDiscountData({ state, commit }, params) {
      params = mergeTokenHeader(state, params)
      let data = await normalRequest(api.getGoodsDiscount, params)
      return data
    },
    // 支付完成后运营位
    async getPaysuceOperate({ state, getters, commit }, getParams) {
      let params = {}
      let data = await normalRequest(api.payResultBanner, params, data => {
        commit('setPaysuceOperate', data)
      })
      return data
    },
    // 根据orderId取得拼团订单对应的相关参数
    async judgeCollageOrder({ state, commit }) {
      let orderId = state.currentOrderId
      let params = mergeTokenHeader(state, { orderId })
      let data = await normalRequest(api.judgePayResultPage, params)
      return data
    },
    // from id list submit
    async formIdListSubmit({ state, commit }) {
      let list = state.formIdList
      console.log('form id list submit', list)
      if (list.length) {
        let params = { formId: list.join(',') }
        params = mergeTokenHeader(state, params)
        commit('formIdListClear')
        await normalRequest(api.submitFormId, params)
      }
    },
    // 是否需要开启引导页
    async getGuideShow({ state, commit }, params = {}) {
      params = mergeTokenHeader(state, params)
      let data = await normalRequest(api.showGuideSwitch, params)
      commit('setGuideShow', data)
    }
  }
})

export default store
