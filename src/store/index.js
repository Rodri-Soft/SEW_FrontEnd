import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state: {
    user: null,
    followers: null,
    amountOffers: null,
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    followers: (state) => {
      return state.followers;
    },
    amountOffers: (state) => {
      return state.amountOffers;
    },
  },
  actions: {
    user(context, user) {
      context.commit('setUser', user);
    },
    cv(context, cv) {
      context.commit('setCV', cv);
    },
    followers(context, followers) {
      context.commit('setFollowers', followers);
    },
    amountOffers(context, amountOffers) {
      context.commit('setAmountOffers', amountOffers);
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setCV(state, cv) {
      state.user.employee.cv = cv;
    },
    setFollowers(state, followers) {
      state.followers = followers;
    },
    setAmountOffers(state, amountOffers) {
      state.amountOffers = amountOffers;
    },
  },
});
