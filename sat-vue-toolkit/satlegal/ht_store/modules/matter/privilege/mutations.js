import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataPrivilege(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataPrivilege = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataPrivilege[key] || {}).results || []
        ).concat(data[key].results);
        const results = removeObjectDuplicate(mergeTasks, "pk"); //remove duplicates
        state.dataPrivilege[key] = {
          ...data[key],
          results
        };
      }
      state.dataPrivilege = { ...state.dataPrivilege };
    }
  },

  getDataPrivileDetail(state, data) {
    state.dataPrivilegeDetail = data
  },

  setDataPrivileDetail(state, data) {    
    state.dataPrivilegeDetail = {...state.dataPrivilegeDetail, ...data}
  },


  addDataPrivilege(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataPrivilege[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataPrivilege(state, { result }) {
    for (const key in state.dataPrivilege) {
      state.dataPrivilege[key].results = state.dataPrivilege[
        key
      ].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataPrivilege(state, { name, id, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataPrivilege) {
        state.dataPrivilege[key].results = state.dataPrivilege[
          key
        ].results.filter(x => x.pk !== id);
        state.dataPrivilege[key].totals--;
      }
    } else {
      state.dataPrivilege[name].results = state.dataPrivilege[
        name
      ].results.filter(x => x.pk !== id);
      state.dataPrivilege[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
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
    for (const key in state.dataPrivilege) {
      state.dataPrivilege[key].results = state.dataPrivilege[key].results.map(x => {
        if (x.id === data.id) {
          x.actors.push(data.result);
          return x;
        }
        return x;
      });
    }
  },

  updatePrivilegeDetailActor(state, data) {
    state.dataPrivilegeDetail.actors.push(data);
  },

  removePrivilegeActor(state, data) {
    for (const key in state.dataPrivilege) {
      state.dataPrivilege[key].results = state.dataPrivilege[key].results.map(x => {
        if (x.id === data.id) {
          const actors = x.actors.filter(x => x.pk !== data.actorId);
          x.actors = actors;
          return x;
        }
        return x;
      });
    }
  },

  removePrivilegeDetailActor(state, actorId) {
    const actors = state.dataPrivilegeDetail.actors.filter(x => x.pk !== actorId);
    state.dataPrivilegeDetail.actors = actors;
  },

};
