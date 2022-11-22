import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  plugins: [createPersistedState()],
  state: {
    user: null,    
    lenguages: [],
    works: [],
    academics: [],
    certifications: [],
    skills: [],
    description: null,
  },
  getters: {
    user: (state) => {
      return state.user;
    },
    lenguages: (state) => {
      return state.lenguages;
    },
    works: (state) => {
      return state.works;
    },
    academics: (state) => {
      return state.academics;
    },
    certifications: (state) => {
      return state.certifications;
    },
    skills: (state) => {
      return state.skills;
    },
    description: (state) => {
      return state.description;
    }
  },
  actions: {
    user(context, user) {
      context.commit('setUser', user);
    },
    add_lenguage(context, lenguage) {
      context.commit('addLenguage', lenguage);      
    },
    remove_lenguage(context, lenguage) {
      context.commit('removeLenguage', lenguage);
    },
    add_work(context, work) {
      context.commit('addWork', work);
    },
    remove_work(context, work) {
      context.commit('removeWork', work);
    },
    add_academic(context, academic) {
      context.commit('addAcademic', academic);
    },
    remove_academic(context, academic) {
      context.commit('removeAcademic', academic);
    },
    add_certification(context, certification) {
      context.commit('addCertification', certification);
    },
    remove_certification(context, certification) {
      context.commit('removeCertification', certification);
    },
    add_skill(context, skill) {
      context.commit('addSkill', skill);
    },
    remove_skill(context, skill) {
      context.commit('removeSkill', skill);
    },
    description(context, description) {
      context.commit('setDescription', description);
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },   
    addLenguage(state, lenguage) {
      state.lenguages.push(lenguage);
    },
    removeLenguage(state, lenguage) {
      state.lenguages.splice(state.lenguages.indexOf(lenguage), 1);
    },
    addWork(state, work) {
      state.works.push(work);
    },
    removeWork(state, work) {
      state.works.splice(state.works.indexOf(work), 1);
    },
    addAcademic(state, academic) {
      state.academics.push(academic);
    },
    removeAcademic(state, academic) {
      state.academics.splice(state.academics.indexOf(academic), 1);
    },
    addCertification(state, certification) {
      state.certifications.push(certification);
    },
    removeCertification(state, certification) {
      state.certifications.splice(state.certifications.indexOf(certification), 1);
    },
    addSkill(state, skill) {
      state.skills.push(skill);
    },
    removeSkill(state, skill) {
      state.skills.splice(state.skills.indexOf(skill), 1);
    },
    setDescription(state, description) {
      state.description = description;
    }
  },
});
