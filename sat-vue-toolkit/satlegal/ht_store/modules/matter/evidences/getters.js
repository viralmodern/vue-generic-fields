export default {
  dataEvidences: state => state.dataEvidences,
  dataChainCustody: state => state.dataChainCustody,
  totals: state => state.totals,
  isLoading: state => state.isLoading,
  evidencesDetail: state => state.evidencesDetail,
  // comments
  matterMembers: (_, __, ___, rootGetters) =>
    rootGetters["ht_store/project/members/members"],
  findUser: (_, getters) => userId => {
    const find = getters.matterMembers.find(x => x.id === userId);
    return find || {};
  },
  dataComment: (state, getters) => {
    const joinCommentFeedback = state.dataComment.map(x => {
      return {
        ...x,
        user: getters.findUser(x.creator),
        feedback: getters.dataCommentFeedback.filter(
          x1 => +x1.parent === +x.pk
        ),
        action: getters.actionComment[x.pk] || {}
      };
    });
    return joinCommentFeedback;
  },
  dataCommentFeedback: (state, getters) => {
    const joinActionCommentFeedback = state.dataCommentFeedback.map(x => {
      return {
        ...x,
        user: getters.findUser(x.creator),
        action: getters.actionCommentFeedback[x.pk] || {}
      };
    });
    return joinActionCommentFeedback;
  },
  actionComment: state => state.actionComment,
  actionCommentFeedback: state => state.actionCommentFeedback,
  countComment: state => state.countComment,
  totalsPageComment: state => Math.ceil(state.countComment / 20),
  isShowPaginationComment: (_, getters) => (getters.totalsPageComment || 0) > 1
}
