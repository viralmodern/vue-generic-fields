import api from "@/sat-vue-toolkit/satlegal/api/clients/address-book";

export default {
  async getAdressBookRequest({ commit }, data = {}) {
    commit("setLoading", true);
    const result = await api.getDataAddressBook(data);
    result.isFirstCall = data.isFirstCall;
    commit("getDataAddressBook", result);
    commit("setLoading", false);
    return result;
  },
  async postAddressBookRequest({ commit }, data) {
    const result = await api.postAddressBook(data);
    commit("postAddressBook", result);
    return result;
  },
  async updateAddressBookRequest({ commit }, data) {
    const result = api.updateAddressBook(data);
    commit("updateAddressBook", {
      pk: data.idParams.pk,
      body: data.body
    });
    return result;
  },
  async removeAddressBookRequest({ commit }, data) {
    const result = await api.removeAddressBook(data);
    commit("removeAddressBook", data.pk);
    return result;
  },
};
