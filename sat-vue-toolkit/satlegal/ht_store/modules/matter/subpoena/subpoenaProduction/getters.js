export default {
  dataList: state => state.dataList,
  dataListNoGroup: state => {
    if (state.dataList.all) {
      const results = state.dataList.all.results;
      return results ? results : [];
    }
    return [];
  },
  dataProductionNoGroup: state => state.dataProductionNoGroup,
  countDataProductionNoGroup: state => state.countDataProductionNoGroup,
  isLoading: state => state.isLoading,
  dataAttachments: state => state.dataAttachments,
  totalsPageAttachment: state => Math.ceil(state.countAttachments / 20),
  isShowPagination: (state, getters) => (getters.totalsPageAttachment || 0) > 1,
  dataNotes: (state, _, __, rootGetters) => {
    const matterMembers = rootGetters['ht_store/project/members/members'];
    const dataMap = state.dataNotes.map(x => {
      const findMembers = matterMembers.find(member => member.id === x.creator) || {};
      let member = {};
      if (findMembers.avatar) {
        member = {
          avatar: findMembers.avatar.imageUrl,
          peopleWrite: findMembers.avatar.name,
        };
      }
      return {
        ...x,
        ...member,
      };
    })
    return dataMap;
  },
  totalsPageNote: state => Math.ceil(state.countNotes / 20),
  isShowPaginationNotes: (state, getters) => (getters.totalsPageNote || 0) > 1,
};
