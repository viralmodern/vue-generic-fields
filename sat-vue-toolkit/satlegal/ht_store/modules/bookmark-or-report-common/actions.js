import api from "@/sat-vue-toolkit/satlegal/api/bookmark-or-report/";

export default {
  async updateRequest({ commit }, data) {
    const result = await api.update(data);
    const map = {
      result: {
        id: data.pk,
        pk: data.pk,
        [data.name]: result ? (data.name === "bookmarked_pk" ? result.pk : result) : null
      }
    }
    if (data.detail) {
      commit(data.routerMutationDetail, map.result, { root: true })
    }
    commit(data.routerMutation, map, { root: true });
    return result;
  },
};
