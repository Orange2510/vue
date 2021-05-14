import * as API from '../../api'
const state = {
  // 商品品牌列表
  trademarkList: [],
  // 商品属性列表
  attrsList: [],
  // 商品列表
  goodsList: [],
  total: 0,
}
const getters = {}
const actions = {
  async searchGoodList({ commit }, data) {
    const result = await API.search.reqSearchGoodList(data)
    commit('SEARCH_GOOD_LIST', result)
  },
}
const mutations = {
  SEARCH_GOOD_LIST(state, result) {
    state.trademarkList = result.trademarkList
    state.attrsList = result.attrsList
    state.goodsList = result.goodsList
    state.total = result.total
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
