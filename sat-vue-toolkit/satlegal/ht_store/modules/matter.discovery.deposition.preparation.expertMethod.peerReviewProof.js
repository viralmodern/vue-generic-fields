import api from "../../api/matter.discovery.deposition.preparation.expertMethod.peerReviewProof";

function array_move(arr, old_index, new_index) {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
}

const state = {
  dataPeerReviewProof: {}
};
const getters = {
  dataPeerReviewProof: state => state.dataPeerReviewProof
};

const actions = {
  async getDataPeerReviewProofRequest({ commit }, data = {}) {
    const result = await api.getDataPeerReviewProof(data);
    commit("getDataPeerReviewProof", { stage: data.stage, ...result });
    return result;
  },
  async addPeerReviewProofRequest({ commit }, data = {}) {
    const result = await api.addPeerReviewProof(data);
    commit("addPeerReviewProof", {name: data.name, result});
    return result;
  },
  async updatePeerReviewProofRequest({ commit }, data) {
    api.updatePeerReviewProof(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.peerReviewProofId, ...data.body }
    };
    commit("updatePeerReviewProof", map);
  },
  async updatePeerReviewProofGroupRequest({ commit }, data) {
    api.updatePeerReviewProof(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.peerReviewProofId, ...data.body }
    };
    commit("updatePeerReviewProofGroup", map);
  },
  async removePeerReviewProofRequest({ commit }, data) {
    api.removePeerReviewProof(data);
    commit("removePeerReviewProof", {
      name: data.name,
      peerReviewProofId: data.peerReviewProofId
    });
  }
};

const mutations = {
  getDataPeerReviewProof(state, { stage, results, count }) {
    state.dataPeerReviewProof = {
      ...state.dataPeerReviewProof,
      [stage.name]: {
        id: stage.value,
        name: stage.name,
        list: results,
        totals: count
      }
    };
  },
  addPeerReviewProof(state, {name, result}) {
    state.dataPeerReviewProof[name].list.push(result);
    state.dataPeerReviewProof[name].totals++;
  },
  updatePeerReviewProof(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataPeerReviewProof[drag.fromListName].list;
      if (drag.toListName) {
        const toStage = state.dataPeerReviewProof[drag.toListName].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataPeerReviewProof[drag.fromListName].totals--;
        state.dataPeerReviewProof[drag.toListName].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataPeerReviewProof[name].list = state.dataPeerReviewProof[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removePeerReviewProof(state, { name, peerReviewProofId }) {
    state.dataPeerReviewProof[name].list = state.dataPeerReviewProof[name].list.filter(
      x => x.id !== peerReviewProofId
    );
    state.dataPeerReviewProof[name].totals--;
  },
  clearData(state) {
    state.dataPeerReviewProof = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

