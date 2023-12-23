export default {
  dataRiskAction: state => state.dataRiskAction,
  isLoadingGet: state => state.isLoadingGet,
  totals: state => state.totals,

  matterMembers: (_, __, ___, rootGetters) => rootGetters["ht_store/project/members/members"],
  findUser: (_, getters) => (userId) => {
    const find = getters.matterMembers.find(x => x.id === userId);
    return find || {};
  },
};
