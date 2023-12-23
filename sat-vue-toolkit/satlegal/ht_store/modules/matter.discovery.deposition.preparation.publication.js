import api from "../../api/matter.discovery.deposition.preparation.publication";

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
  dataPublication: {}
};
const getters = {
  dataPublication: state => state.dataPublication
};

const actions = {
  async getDataPublicationRequest({ commit }, data = {}) {
    const result = await api.getDataPublication(data);
    commit("getDataPublication", { stage: data.stage, ...result });
    return result;
  },
  async addPublicationRequest({ commit }, data = {}) {
    const result = await api.addPublication(data);
    commit("addPublication", {name: data.name, result});
    return result;
  },
  async updatePublicationRequest({ commit }, data) {
    api.updatePublication(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.publicationId, ...data.body }
    };
    commit("updatePublication", map);
  },
  async updatePublicationGroupRequest({ commit }, data) {
    api.updatePublication(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.publicationId, ...data.body }
    };
    commit("updatePublicationGroup", map);
  },
  async removePublicationRequest({ commit }, data) {
    api.removePublication(data);
    commit("removePublication", {
      name: data.name,
      publicationId: data.publicationId
    });
  }
};

const mutations = {
  getDataPublication(state, { stage, results, count }) {
    state.dataPublication = {
      ...state.dataPublication,
      [stage.name]: {
        id: stage.value,
        name: stage.name,
        list: results,
        totals: count
      }
    };
  },
  addPublication(state, {name, result}) {
    state.dataPublication[name].list.push(result);
    state.dataPublication[name].totals++;
  },
  updatePublication(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataPublication[drag.fromListName].list;
      if (drag.toListName) {
        const toStage = state.dataPublication[drag.toListName].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataPublication[drag.fromListName].totals--;
        state.dataPublication[drag.toListName].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataPublication[name].list = state.dataPublication[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removePublication(state, { name, publicationId }) {
    state.dataPublication[name].list = state.dataPublication[name].list.filter(
      x => x.id !== publicationId
    );
    state.dataPublication[name].totals--;
  },
  clearData(state) {
    state.dataPublication = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

