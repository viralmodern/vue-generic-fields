export default {
  dataPriorEmployment: state => state.dataPriorEmployment,
  isLoadingGet: state => state.isLoadingGet,

  matterMembers: (_, __, ___, rootGetters) => rootGetters["ht_store/project/members/members"],
  findUser: (_, getters) => (userId) => {
    const find = getters.matterMembers.find(x => x.id === userId);
    return find || {};
  },

  //notes
  dataNotes: (state, getters) => {
    const dataMap = state.dataNotes.map(x => {
      const findMembers =
        getters.matterMembers.find(member => member.id === x.creator) || {};
      let member = {};
      if (findMembers.avatar) {
        member = {
          avatar: findMembers.avatar.imageUrl,
          peopleWrite: findMembers.avatar.name
        };
      }
      return {
        ...x,
        ...member
      };
    });
    return dataMap;
  },
  totalsPageNote: state => Math.ceil(state.countNotes / 20),
  isShowPaginationNotes: (_, getters) => (getters.totalsPageNote || 0) > 1,

  //comments
  dataComment: (state, getters) => {
    const joinCommentFeedback = state.dataComment.map(x => {
      return {
        ...x,
        user: getters.findUser(x.creator),
        feedback: getters.dataCommentFeedback.filter(x1 => +x1.parent === +x.pk),
        action: getters.actionComment[x.pk] || {}
      }
    })
    return joinCommentFeedback;
  },
  dataCommentFeedback: (state, getters) => {
    const joinActionCommentFeedback = state.dataCommentFeedback.map(x => {
      return {
        ...x,
        user: getters.findUser(x.creator),
        action: getters.actionCommentFeedback[x.pk] || {}
      }
    })
    return joinActionCommentFeedback;
  },
  actionComment: state => state.actionComment,
  actionCommentFeedback: state => state.actionCommentFeedback,
  countComment: state => state.countComment,
  totalsPageComment: state => Math.ceil(state.countComment / 20),
  isShowPaginationComment: (_, getters) => (getters.totalsPageComment || 0) > 1,
  dataPriorEmploymentDetail: state => state.dataPriorEmploymentDetail
};
