import Vuex from "vuex";
import Vue from "vue";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    name: "",
    answers: [],
    currentAnswers: ["2", "1", "3", "2", "1", "3", "2", "2", "2", "2", "2", "2", "1", "2", "2", "3", "1", "2", "3", "1"],
    points: ""
  },
  getters: {
    name: state => {
      return (state.name) ? state.name.trim() : "";
    },
    answers: state => {
      return (state.answers);
    },
    points: state => {
      return (state.points);
    }
  },
  mutations: {
    setName: (state, name) => {
      state.name = name;
    },
    setAnswers: (state, answers) => {
      state.answers = answers;
    },
    setPoints: (state, points) => {
      state.points = points;
    }
  },
  actions: {
    setAnswersUser: ({ commit }, { answers }) => {
      commit("setAnswers", answers);
    },
    setPoints: ({ commit }, { points }) => {
      commit("setPoints", points);
    }
  }
});
