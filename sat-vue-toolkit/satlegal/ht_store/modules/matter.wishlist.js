import api from "../../api/matter.wishlist";

const state = {
  dataWishList: [],
  totals: 0
};
const getters = {
  dataWishList: state => state.dataWishList,
  totals: state => state.totals
};

const actions = {
  async getDataWishListRequest({ commit }, data) {
    const result = await api.getDataWishList(data);
    commit("getDataWishList", result);
    return result;
  },
  async addWishListRequest({ commit }, data) {
    const result = await api.addWishList(data);
    commit("addWishList", result);
    return result;
  },
  async updateWishListRequest({ commit }, data) {
    api.updateWishList(data);
    commit("updateWishList", {
      id: data.idParams.wishlistId,
      ...data.body
    });
  },
  async removeWishListRequest({ commit }, data) {
    api.removeWishList(data);
    commit("removeWishList", data.wishlistId);
  }
};

const mutations = {
  getDataWishList(state, {results, count}) {
    state.dataWishList = results;
    state.totals = count;
  },
  addWishList(state, data) {
    state.dataWishList.unshift(data);
    state.totals++;
  },
  updateWishList(state, data) {
    state.dataWishList = state.dataWishList.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data };
      }
      return x;
    });
  },
  removeWishList(state, id) {
    state.dataWishList = state.dataWishList.filter(x => x.id !== id);
    state.totals--;
  },
  cleanUpPageData(state) {
    state.dataWishList = [];
    state.totals = 0;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
