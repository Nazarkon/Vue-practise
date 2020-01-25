import Vue from "vue";
import Vuex from "vuex";

import * as user from "@/store/module/user.js";
import * as event from "@/store/module/event.js";
import * as notification from "@/store/module/notification.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    event,
    notification
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
