import api from "../../api/matter.discovery.deposition.index";

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
  dataIndex: {}
};
const getters = {
  dataIndex: state => state.dataIndex
};

const actions = {
  async getDataIndexRequest({ commit }, data = {}) {
    const result = await api.getDataIndex(data);
    commit("getDataIndex", { stage: data.stage, ...result });
    return result;
  },
  async addIndexRequest({ commit }, data = {}) {
    const result = await api.addIndex(data);
    commit("addIndex", {name: data.name, result});
    return result;
  },
  async updateIndexRequest({ commit }, data) {
    api.updateIndex(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.indexId, ...data.body }
    };
    commit("updateIndex", map);
  },
  async updateIndexGroupRequest({ commit }, data) {
    api.updateIndex(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.indexId, ...data.body }
    };
    commit("updateIndexGroup", map);
  },
  async removeIndexRequest({ commit }, data) {
    api.removeIndex(data);
    commit("removeIndex", {
      name: data.name,
      indexId: data.indexId
    });
  }
};

const mutations = {
  getDataIndex(state, { stage, results, count }) {
    state.dataIndex = {
      ...state.dataIndex,
      [stage.name]: {
        id: stage.value,
        name: stage.name,
        list: results,
        totals: count
      }
    };
  },
  addIndex(state, {name, result}) {
    state.dataIndex[name].list.push(result);
    state.dataIndex[name].totals++;
  },
  updateIndex(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataIndex[drag.fromListName].list;
      if (drag.toListName) {
        const toStage = state.dataIndex[drag.toListName].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataIndex[drag.fromListName].totals--;
        state.dataIndex[drag.toListName].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataIndex[name].list = state.dataIndex[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removeIndex(state, { name, indexId }) {
    state.dataIndex[name].list = state.dataIndex[name].list.filter(
      x => x.id !== indexId
    );
    state.dataIndex[name].totals--;
  },
  clearData(state) {
    state.dataIndex = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

