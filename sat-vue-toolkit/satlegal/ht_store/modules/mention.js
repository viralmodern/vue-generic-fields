import mentions from "../../mock-data/mention";

// initial state
// shape: [{ id, quantity }]
const state = {
  mentions: mentions
};

// getters
const getters = {
  mentions: state => state.mentions
};

export default {
  namespaced: true,
  state,
  getters
};
