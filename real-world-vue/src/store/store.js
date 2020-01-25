import Vue from "vue";
import Vuex from "vuex";

import * as user from "@/store/module/user.js";
import * as event from "@/store/module/event.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event
  },
  state: {
    categories: [
      "sustainability",
      "nature",
      "animal welfare",
      "housing",
      "education",
      "food",
      "community"
    ]
  }
});
