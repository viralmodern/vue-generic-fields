import api from "../../api/matter.discovery.deposition.preparation.invoice";

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
  dataInvoice: {}
};
const getters = {
  dataInvoice: state => state.dataInvoice
};

const actions = {
  async getDataInvoiceRequest({ commit }, data = {}) {
    const result = await api.getDataInvoice(data);
    commit("getDataInvoice", { stage: data.stage, ...result });
    return result;
  },
  async addInvoiceRequest({ commit }, data = {}) {
    const result = await api.addInvoice(data);
    commit("addInvoice", {name: data.name, result});
    return result;
  },
  async updateInvoiceRequest({ commit }, data) {
    api.updateInvoice(data);
    const map = {
      drag: data.drag,
      name: data.name,
      result: { id: data.idParams.invoiceId, ...data.body }
    };
    commit("updateInvoice", map);
  },
  async updateInvoiceGroupRequest({ commit }, data) {
    api.updateInvoice(data);
    const map = {
      name: data.name,
      result: { id: data.idParams.invoiceId, ...data.body }
    };
    commit("updateInvoiceGroup", map);
  },
  async removeInvoiceRequest({ commit }, data) {
    api.removeInvoice(data);
    commit("removeInvoice", {
      name: data.name,
      invoiceId: data.invoiceId
    });
  }
};

const mutations = {
  getDataInvoice(state, { stage, results, count }) {
    state.dataInvoice = {
      ...state.dataInvoice,
      [stage.name]: {
        id: stage.value,
        name: stage.name,
        list: results,
        totals: count
      }
    };
  },
  addInvoice(state, {name, result}) {
    state.dataInvoice[name].list.push(result);
    state.dataInvoice[name].totals++;
  },
  updateInvoice(state, { drag, name, result }) {
    if (drag) {
      const fromStage = state.dataInvoice[drag.fromListName].list;
      if (drag.toListName) {
        const toStage = state.dataInvoice[drag.toListName].list;
        toStage.splice(drag.newIndex, 0, fromStage.splice(drag.oldIndex, 1)[0]);
        toStage[drag.newIndex] = { ...toStage[drag.newIndex], ...result };
        state.dataInvoice[drag.fromListName].totals--;
        state.dataInvoice[drag.toListName].totals++;
      } else {
        array_move(fromStage, drag.oldIndex, drag.newIndex);
        fromStage[drag.newIndex] = { ...fromStage[drag.newIndex], ...result };
      }
    } else {
      state.dataInvoice[name].list = state.dataInvoice[name].list.map(
        x => {
          if (x.id === result.id) {
            return { ...x, ...result };
          }
          return x;
        }
      );
    }
  },
  removeInvoice(state, { name, invoiceId }) {
    state.dataInvoice[name].list = state.dataInvoice[name].list.filter(
      x => x.id !== invoiceId
    );
    state.dataInvoice[name].totals--;
  },
  clearData(state) {
    state.dataInvoice = {};
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};

