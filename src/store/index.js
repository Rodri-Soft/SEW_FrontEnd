import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state: {
    user: null,
  },
  getters: {
    user: (state) => {
      return state.user;
    }
  },
  actions: {
    user(context, user) {
      context.commit('setUser', user);
    },
    // cv(context, cv) {
    //   context.commit('setCV', cv);
    // }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    // setCV(state, cv) {
    //   state.user.cv = cv;
    // }
  },
});
