const state = {
  user: null
}

const getters = {

}

const mutations = {
  storeUser (state, user) {
    state.user = user
  },
  deleteUser (state) {
    state.user = null
  }

}

const actions = {

}

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
