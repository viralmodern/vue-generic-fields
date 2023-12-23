import profile from "./matter.partient.profile";
import negligence from "./matter.partient.negligence";
import tag from "./matter.partient.tag";
import damage from "./matter.partient.damage";
import injury from "./matter.partient.injury";
import practice from "./matter.partient.practice";
const state = {};

// getters
const getters = {};

const actions = {};

const mutations = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    profile,
    negligence,
    tag,
    damage,
    injury,
    practice
  }
};
