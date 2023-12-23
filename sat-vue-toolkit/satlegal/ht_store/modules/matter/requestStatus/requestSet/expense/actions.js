import api from "@/sat-vue-toolkit/satlegal/api/matter/requestStatus/request-set/expense";
import { getLoadingSlickTable } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  async getDataRequestSetExpenseRequest({ commit }, data = {}) {
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, true)
    );
    const result = await api.getDataRequestSetExpense(data);
    result.isFirstCall = data.isFirstCall;
    commit("setDataRequestSetExpense", result);
    commit(
      "setLoading",
      getLoadingSlickTable(data.searchObject.group_items, false)
    );
    return result;
  },
  async getRequestExpenseDetailRequest({ commit }, data = {}) {
    const result = await api.getDataRequestSetExpenseDetail(data);
    commit("setDataRequestSetExpenseDetail", result);
    return result;
  },
  async addRequestSetExpenseRequest({ commit }, data = {}) {
    const result = await api.addRequestSetExpense(data);
    commit("addDataRequestSetExpense", {
      listIdGroup: data.listIdGroup,
      result
    });
    return result;
  },
  async updateRequestSetExpenseRequest({ commit }, { idParams, body, detail = false }) {
    api.updateRequestSetExpense({ idParams, body });
    const map = {
      result: { pk: idParams.requestSetExpenseId, ...body }
    };
    if (detail) {
      commit("updateExpenseDetail", map)
    }
    commit("updateDataRequestSetExpense", map);

  },
  async removeRequestSetExpenseRequest({ commit }, data) {
    const result = await api.removeRequestSetExpense(data);
    commit("removeDataRequestSetExpense", data);
    return result;
  },

  // relations
  async updateRelationRequestSetExpenseRequest({ commit }, { idParams, body, detail = false }) {
    api.updateRelationRequestSetExpense({ idParams, body });
    if (detail) {
      commit("updateDataRelationRequestSetExpense", {
        pk: idParams.requestSetExpenseId,
        result: body
      });
      commit("updateDataRelationRequestSetExpenseDetail", body)
    } else {
      commit("updateDataRelationRequestSetExpense", {
        pk: idParams.requestSetExpenseId,
        result: body
      });
    }

  },

  async removeRelationRequestSetExpenseRequest({ commit }, data) {
    api.removeRelationRequestSetExpense(data);
    if (data.detail) {
      commit("removeDataRelationRequestSetExpense", {
        pk: data.requestSetExpenseId,
        result: {
          objectId: data.objectId,
          contentTypeId: data.contentTypeId
        }
      });
      commit("removeDataRelationRequestSetExpenseDetail", {
        objectId: data.objectId,
        contentTypeId: data.contentTypeId
      });
    } else {
      commit("removeDataRelationRequestSetExpense", {
        pk: data.requestSetExpenseId,
        result: {
          objectId: data.objectId,
          contentTypeId: data.contentTypeId
        }
      });
    }

  },
};
