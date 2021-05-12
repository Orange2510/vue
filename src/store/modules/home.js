import * as API from '../../api'

const state = {
  categoryList: [],
}
const actions = {
  async getBaseCategoryList({ commit }) {
    const categoryList = await API.home.reqGetBaseCategoryList()
    commit('GET_BASE_CATEGORY_LIST', categoryList)
  },
}
const mutations = {
  GET_BASE_CATEGORY_LIST(state, categoryList) {
    state.categoryList = categoryList
  },
}
const getters = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
