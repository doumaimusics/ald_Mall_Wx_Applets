const state = {
  history: [],
  count: 0
}
const getters = {
  perCount: state => {
    if (state.count < 0) return 0
    return state.count * 10
  },
  lastHistory: state => {
    let len = state.history.length
    if (len) {
      return state.history[len - 1]
    }
    return -1
  }
}
const actions = {
  increase({ dispatch }) {
    dispatch('addCount', 1)
  },
  addCount({ state, commit }, value) {
    let count = value
    if (state.count >= 0) count += state.count
    commit('setCount', count)
    commit('addHistory', count)
  },
  backCount({ getters, commit }) {
    commit('removeHistory')
    commit('setCount', getters.lastHistory)
  }
}
const mutations = {
  setCount(state, value) {
    state.count = value
  },
  addHistory(state, value) {
    state.history.push(value)
  },
  removeHistory(state) {
    state.history.pop()
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
