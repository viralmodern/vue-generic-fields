import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";

import message from "./message";

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  modules: {
    message
  }
};
