/**
 * Created by xiejun on 2019/02/28.
 *
 */
import api from '@/api/repay'
import { normalRequest, mergeTokenHeader } from '../core'
import utils from 'utils/index'

const state = {
  // 还款列表
  myRepaymentList: [],
  myRepaymentList_detail: [],
  // 银行卡列表
  bankCardList: {},
  // 输入支付密码
  submitRepaymentByYiBao: {},
  // 还款成功
  payTypeStatus: {},
  limitDetailInfo: {},

  // 选中的bill
  selectBill: 'outBill',
  // 全部账单
  billAllData: {},
  // 未出账单
  notOutBillData: {},
  // // 当前账单列表
  // nowBillData: {},
  // 账单详情
  billDetail: {},
  // 还款记录列表
  recordListData: [],
  // 用户当前退还款记录id
  recordAmountId: -1,
  // 还款记录详情
  recordDetailData: null
}
const getters = {
  nowBillData: state => {
    let nowData = state.billAllData
    if (state.selectBill === 'notOutBill') nowData = state.notOutBillData
    return nowData
  }
}
const actions = {
  // 还款页面
  async getMyRepaymentV1({ commit, rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    await normalRequest(api.getMyRepaymentV1, params, data => {
      commit('setMyRepaymentList', data)
    })
  },
  async getPayTypeStatus({ commit, rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    await normalRequest(api.getPayTypeStatus, params, data => {
      commit('setPayTypeStatus', data)
    })
  },
  // 还款详情页面弹层
  async getMyRepaymentDetailV1({ commit, rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    await normalRequest(api.getMyRepaymentDetailV1, params, data => {
      data.billList.forEach(item => {
        item.payDateFix = utils.formatDate(item.gmtPayTime, 'YYYY/MM/DD HH:mm:ss')
      })
      commit('setMyRepaymentList_detail', data)
    })
  },
  // 取银行卡列表
  async getBankCardList({ commit, rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    await normalRequest(api.getBankCardList, params, data => {
      data.bankCardList.forEach(item => {
        item.cardNumberFix = item.cardNumber.slice(-4)
      })
      commit('setBankCardList', data)
    })
  },
  // 输入支付密码
  async submitRepaymentByYiBao({ commit, rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    let data = await normalRequest(api.submitRepaymentByYiBao, params, data => {
      commit('setSubmitRepaymentByYiBao', data)
    })
    return data
  },
  // 还款成功页面
  async getLimitDetailInfo({ commit, rootState }) {
    let params = { refId: state.refids, type: 'REPAYMENT' }
    params = mergeTokenHeader(rootState, params)
    await normalRequest(api.getLimitDetailInfo, params, data => {
      data.gmtCreateYear = utils.formatDate(data.gmtCreate, 'YYYY/MM/DD HH:mm')
      data.gmtCreateNoYear = utils.formatDate(data.gmtCreate, 'MM/DD HH:mm')
      commit('setLimitDetailInfo', data)
    })
  },
  // 获取账单全部数据
  async getMyBorrowListV1({ commit, rootState }, params = {}) {
    params = mergeTokenHeader(rootState, params)
    await normalRequest(api.getMyBorrowListV1, params, data => {
      if (params.status === 'notOutBill') {
        commit('setNotOutBillData', data)
      } else {
        commit('setBillAllData', data)
        // commit('setNowBillData', data)
      }
    })
  },
  // 获取账单详情
  async getBillListByMonthAndYear({ commit, rootState }, params = {}) {
    params = mergeTokenHeader(rootState, params)
    commit('setBillDetailData', {})
    await normalRequest(api.getBillListByMonthAndYear, params, data => {
      commit('setBillDetailData', data)
    })
  },
  // 获取退还款记录列表数据
  async getRecordListData({ commit, rootState }, params) {
    params = mergeTokenHeader(rootState, params)
    await normalRequest(api.getMyRepaymentHistoryV1, params, data => {
      let list = []
      if (data.list) list = data.list
      commit('setRecordListData', list)
    })
  },
  // 获取退还款记录详情数据
  async getRecordDetailData({ commit, state, rootState }) {
    let params = { amountId: state.recordAmountId }
    params = mergeTokenHeader(rootState, params)
    await normalRequest(api.getRepaymentDetailV1, params, data => {
      commit('setRecordDetailData', data)
    })
  }
}
const mutations = {
  setBankCardList(state, data) {
    state.bankCardList = data
  },
  setMyRepaymentList(state, data) {
    state.myRepaymentList = data
  },
  setMyRepaymentList_detail(state, data) {
    state.myRepaymentList_detail = data
  },
  setSubmitRepaymentByYiBao(state, data) {
    state.submitRepaymentByYiBao = data
  },
  setRefidsFun(state, data) {
    state.refids = data
  },
  setPayTypeStatus(state, data) {
    state.payTypeStatus = data
  },
  setLimitDetailInfo(state, data) {
    state.limitDetailInfo = data
  },
  setSelectBill(state, data) {
    state.selectBill = data
  },
  setBillAllData(state, data) {
    state.billAllData = data
  },
  setNotOutBillData(state, data) {
    state.notOutBillData = data
  },
  setRecordListData(state, data) {
    state.recordListData = data
  },
  setRecordDetailData(state, data) {
    state.recordDetailData = data
  },
  setRecordAmountId(state, data) {
    state.recordAmountId = data
  },
  // setNowBillData(state, data) {
  //   state.nowBillData = data
  // },
  setBillDetailData(state, data) {
    state.billDetail = data
  }
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
