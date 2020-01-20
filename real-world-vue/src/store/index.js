import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user:{ id: 'abc123', name: 'Adam'},
    categories: ['sustainbility',
      'education',
      'food',
      'community',
      'nature',
      'housing'
    ]
  },
  mutations: {},
  actions: {},
  modules: {},
  getters:{
    catLength: state => {
      return state.categories.length
    }
  }
});
