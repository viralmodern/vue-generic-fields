export default {
  dataPrivilegeAttorney: state => {
    const dataMap = state.dataPrivilegeAttorney.map(x => {
      const listPrivilegeChecks = [];
      const satifiedElements = [{
        is_communication: x.is_communication,
        is_confidential: x.is_confidential,
        is_legal_related: x.is_legal_related,
      }];
      const listCharacterFilter = x.actors.filter(a => a.character);
      listCharacterFilter.forEach(c => {
        if (listPrivilegeChecks.some(c1 => c1.pk === c.character.pk)) {
          return;
        }
        const characterName = c.character.first_name + " " + c.character.last_name;
        const findPrivilegeCheck = x.privilege_checks.find(p => p.character.pk === c.character.pk);
        const isPrivileged = findPrivilegeCheck ? findPrivilegeCheck.is_privilege : null;
        listPrivilegeChecks.push({ pk: c.character.pk, character_avatar: c.character.avatar, character_name: characterName, is_privilege: isPrivileged });
      })
      return {
        ...x,
        list_privilege_checks: listPrivilegeChecks,
        satified_elements: satifiedElements
      }
    })
    return dataMap;
  },
  dataPrivilegeAttorneyDetail: state => {
    const listPrivilegeChecks = [];
    const listCharacterFilter = state.dataPrivilegeAttorneyDetail.actors.filter(a => a.character);
    listCharacterFilter.forEach(c => {
      if (listPrivilegeChecks.some(c1 => c1.pk === c.character.pk)) {
        return;
      }
      const characterName = c.character.first_name + " " + c.character.last_name;
      const findPrivilegeCheck = state.dataPrivilegeAttorneyDetail.privilege_checks.find(p => p.character.pk === c.character.pk);
      const isPrivileged = findPrivilegeCheck ? findPrivilegeCheck.is_privilege : null;
      listPrivilegeChecks.push({ pk: c.character.pk, character_avatar: c.character.avatar, character_name: characterName, is_privilege: isPrivileged });
    })
    return {
      ...state.dataPrivilegeAttorneyDetail,
      list_privilege_checks: listPrivilegeChecks,
    }
  },
  isLoadingGet: state => state.isLoadingGet,
  totals: state => state.totals,
  matterMembers: (_, __, ___, rootGetters) => rootGetters["ht_store/project/members/members"],
  findUser: (_, getters) => (userId) => {
    const find = getters.matterMembers.find(x => x.id === userId);
    return find || {};
  },

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
  dataRequestItem: state => state.dataRequestItem,
};
