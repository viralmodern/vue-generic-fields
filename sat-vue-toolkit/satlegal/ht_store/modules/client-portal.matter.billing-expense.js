import api from "../../api/client-portal.matter.billing-expense";
import receipt from "./matter.briefcase.billing.expense.receipt";
const state = {
  expense: [],
  filterExpense: {}
};
const getters = {
  expense: state => {
    const filter = Object.keys(state.filterExpense);
    let cloneExpense = state.expense.slice();
    const { filterExpense } = state;
    if (filter.length > 0) {
      filter.forEach(key => {
        if (key === "status") {
          cloneExpense = cloneExpense.filter(
            x => x.status === filterExpense[key]
          );
        }
        if (key === "createdBy") {
          cloneExpense = cloneExpense.filter(
            x => x.createBy === filterExpense[key]
          );
        }
        if (key === "date") {
          cloneExpense = cloneExpense.filter(
            x =>
              new Date(filterExpense[key]).toDateString() ===
              new Date(x[key]).toDateString()
          );
          return;
        }
        if (key === "createDate") {
          cloneExpense = cloneExpense.filter(
            x =>
              new Date(filterExpense[key]).toDateString() ===
              new Date(x[key]).toDateString()
          );
          return;
        }
      });
      return cloneExpense;
    }
    return state.expense;
  },
  hasFilter() {
    return Object.keys(state.filterExpense).length > 0;
  }
};

const actions = {
  async getDataExpenseRequest({ commit }) {
    commit("getDataExpense", await api.getExpense());
  },
  async updateExpenseRequest({ commit }, data) {
    commit("updateExpense", await api.updateExpense(data));
  },
  async deleteExpenseRequest({ commit }, data) {
    commit("deleteExpense", await api.deleteExpense(data));
  },
  async addExpenseRequest({ commit }, data) {
    commit("addExpense", await api.addExpense(data));
  },
  async filterExpenseRequest({ commit }, filter) {
    commit("filterExpense", filter);
  },
  async addAtachmentRequest({ commit }, data) {
    commit("addAtachment", data);
  }
};

const mutations = {
  getDataExpense(state, data) {
    state.expense = data;
  },
  updateExpense(state, data) {
    const item = state.expense.find(x => x.id === data.parentId);
    item[data.column] = data.value;
  },
  deleteExpense(state, id) {
    state.expense = state.expense.filter(x => x.id !== id);
  },
  addExpense(state, data) {
    state.expense.unshift(data);
  },
  filterExpense(state, { name, value }) {
    state.filterExpense = JSON.parse(
      JSON.stringify({ ...state.filterExpense, [name]: value })
    );
  },
  addAtachment(state, data) {
    const item = state.expense.find(x => x.id === data.taskId);
    item.receipt.push(data.value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
  modules: {
    receipt
  }
};
