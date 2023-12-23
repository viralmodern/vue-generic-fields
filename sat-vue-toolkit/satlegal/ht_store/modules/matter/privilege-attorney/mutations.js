import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";
import _ from "lodash";

export default {
  setDataPrivilege(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataPrivilegeAttorney = data.results;
      state.totals = data.count;
    } else {
      const mergeTasks = state.dataPrivilegeAttorney.concat(data.results);
      const results = _.uniqBy(mergeTasks, "pk"); //remove duplicates
      state.dataPrivilegeAttorney = results;
      state.totals = data.count;
    }    
  },

  getDataPrivileDetail(state, data) {
    state.dataPrivilegeAttorneyDetail = data
  },

  setDataPrivileDetail(state, data) {
    state.dataPrivilegeAttorneyDetail = {...state.dataPrivilegeAttorneyDetail, ...data}
  },

  addDataPrivilege(state, result) {
    state.dataPrivilegeAttorney.push(result);
    state.totals++;
  },

  updateDataPrivilege(state, { result }) {
    state.dataPrivilegeAttorney = state.dataPrivilegeAttorney.map(x => {
      if (x.pk === result.pk) {
        return { ...x, ...result };
      }
      return x;
    });
  },

  updateDataPrivilegeCheck(state, { pk, body, detail = false }) {
    state.dataPrivilegeAttorney = state.dataPrivilegeAttorney.map(x => {
      if (x.pk === pk) {
        const findPrivilegeCheck = x.privilege_checks.find(p => p.character.pk === body.character.pk);
        if (findPrivilegeCheck) {
          findPrivilegeCheck.is_privilege = body.is_privilege
        } else {
          x.privilege_checks.push(body);
        }
        return x;
      }
      return x;
    });
    if (detail) {
      const findPrivilegeCheck = state.dataPrivilegeAttorneyDetail.privilege_checks.find(p => p.character.pk === body.character.pk);
      if (findPrivilegeCheck) {
        findPrivilegeCheck.is_privilege = body.is_privilege
      } else {
        state.dataPrivilegeAttorneyDetail.privilege_checks.push(body);
      }
      return state.dataPrivilegeAttorneyDetail;
    }
  },

  removeDataPrivilege(state, { id }) {
    state.dataPrivilegeAttorney = state.dataPrivilegeAttorney.filter(x => x.pk !== id);
    state.totals--;
  },
  setLoading(state, status) {
    state.isLoadingGet = status;
  },


  //comments
  getDataCommentPrivilege(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackPrivilege(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentPrivilege(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackPrivilege(state, data) {
    state.dataCommentFeedback.unshift(data);
  },

  setActionComment(state, data) {
    state.actionComment = { ...state.actionComment, ...data };
  },

  setActionCommentFeedback(state, data) {
    state.actionCommentFeedback = { ...state.actionCommentFeedback, ...data };
  },

  updateActionComment(state, data) {
    state.actionComment[data.pk] = { ...state.actionComment[data.pk], ...data.action }
  },

  updateActionCommentFeedback(state, data) {
    state.actionCommentFeedback[data.pk] = { ...state.actionCommentFeedback[data.pk], ...data.action }
  },

  updateCommentPrivilege(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedbackPrivilege(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountCommentPrivilege(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeCommentPrivilege(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackPrivilege(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  },
  // actors
  updatePrivilegeActor(state, data) {
    state.dataPrivilegeAttorney = state.dataPrivilegeAttorney.map(x => {
      if (x.id === data.id) {
        x.actors.push(data.result);
        return x;
      }
      return x;
    });
  },

  updatePrivilegeDetailActor(state, data) {
    state.dataPrivilegeAttorneyDetail.actors.push(data);
  },

  removePrivilegeActor(state, data) {
    state.dataPrivilegeAttorney = state.dataPrivilegeAttorney.map(x => {
      if (x.id === data.id) {
        const actors = x.actors.filter(x => x.pk !== data.actorId);
        x.actors = actors;
        return x;
      }
      return x;
    });
  },

  removePrivilegeDetailActor(state, actorId) {
    const actors = state.dataPrivilegeAttorneyDetail.actors.filter(x => x.pk !== actorId);
    state.dataPrivilegeAttorneyDetail.actors = actors;
  },
};
