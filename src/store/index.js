import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState({
    storage: window.sessionStorage,
  })],
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {},
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    }
  },
});
