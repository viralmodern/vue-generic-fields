import api from "../../api/matter.discovery.deposition.preparation.expertOpinion";

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
  dataExpertOpinion: {}
};
const getters = {
  dataExpertOpinion: state => state.dataExpertOpinion
};

const actions = {
  async getDataExpertOpinionRequest({ commit }, data = {}) {
    const result = await api.getDataExpertOpinion(data);
    commit("getDataExpertOpinion", { stage: data.stage, ...result });
    return result;
  },
  async addExpertOpinionRequest({ commit }, data = {}) {
    const result = await api.addExpertOpinion(data);
    commit("addExpertOpinion", {name: data.name, result});
    return result;
  },
  async updateExpertOpinionRequest({ commit }, data) {
    api.updateExpertOpinion(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.expertOpinionId, ...data.body }
    };
    commit("updateExpertOpinion", map);
  },
  async updateExpertOpinionGroupRequest({ commit }, data) {
    api.updateExpertOpinion(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.expertOpinionId, ...data.body }
    };
    commit("updateExpertOpinionGroup", map);
  },
  async removeExpertOpinionRequest({ commit }, data) {
    api.removeExpertOpinion(data);
    commit("removeExpertOpinion", {
      name: data.name,
      expertOpinionId: data.expertOpinionId
    });
  }
};

const mutations = {
  getDataExpertOpinion(state, { stage, results, count }) {
    state.dataExpertOpinion = {
      ...state.dataExpertOpinion,
      [stage.name]: {
        id: stage.value,
        name: stage.name,
        list: results,
        totals: count
      }
    };
  },
  addExpertOpinion(state, {name, result}) {
    state.dataExpertOpinion[name].list.push(result);
    state.dataExpertOpinion[name].totals++;
  },
  updateExpertOpinion(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataExpertOpinion[drag.fromListName].list;
      if (drag.toListName) {
        const toStage = state.dataExpertOpinion[drag.toListName].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataExpertOpinion[drag.fromListName].totals--;
        state.dataExpertOpinion[drag.toListName].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataExpertOpinion[name].list = state.dataExpertOpinion[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removeExpertOpinion(state, { name, expertOpinionId }) {
    state.dataExpertOpinion[name].list = state.dataExpertOpinion[name].list.filter(
      x => x.id !== expertOpinionId
    );
    state.dataExpertOpinion[name].totals--;
  },
  clearData(state) {
    state.dataExpertOpinion = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

