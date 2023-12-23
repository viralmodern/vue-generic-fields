import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import state from "./state";

import task from "./task";
import expense from "./expense";
import element from "./element";

export default {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  modules: {
    task,
    expense,
    element,
  }
};
