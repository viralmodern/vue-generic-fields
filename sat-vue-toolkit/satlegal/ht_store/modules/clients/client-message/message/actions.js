import api from '@/sat-vue-toolkit/satlegal/api/clients/topic-message';
export default {
  async getDataTopicMessageRequest({ commit }, data = {}) {
    commit("setLoading", true)
    const result = await api.getDataTopicMessage(data);
    commit("setLoading", false)
    commit("setDataTopicMessage", result);
    return result;
  },
  async getDataTopicMessageAssignRequest({ commit }, data = {}) {
    const result = await api.getDataTopicMessage(data);
    commit("concatDataTopicMessage", result);
    return result;
  },
  async addTopicMessageRequest({ commit }, data = {}) {
    const result = await api.addTopicMessage(data);
    commit("addDataTopicMessage", result);
    return result;
  },
  async removeTopicMessageRequest({ commit }, data) {
    const result = await api.removeTopicMessage(data);
    commit("removeDataTopicMessage", {pk: data.messageId});
    return result;
  },
};
