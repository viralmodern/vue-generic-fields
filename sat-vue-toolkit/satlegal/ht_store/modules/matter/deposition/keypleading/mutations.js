import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataKeyPleading(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataKeyPleading = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataKeyPleading[key] || {}).results || []
        ).concat(data[key].results);
        const results = removeObjectDuplicate(mergeTasks, "pk"); //remove duplicates
        state.dataKeyPleading[key] = {
          ...data[key],
          results
        };
      }
      state.dataKeyPleading = { ...state.dataKeyPleading };
    }
  },
  setAllDataKeyPleading(state, data) {
    state.dataAllKeyPleading = data;
  },
  addDataKeyPleading(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataKeyPleading[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataKeyPleading(state, { result }) {
    for (const key in state.dataKeyPleading) {
      state.dataKeyPleading[key].results = state.dataKeyPleading[
        key
      ].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataKeyPleading(state, { name, keyPleadingId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataKeyPleading) {
        state.dataKeyPleading[key].results = state.dataKeyPleading[
          key
        ].results.filter(x => x.pk !== keyPleadingId);
        state.dataKeyPleading[key].totals--;
      }
    } else {
      state.dataKeyPleading[name].results = state.dataKeyPleading[
        name
      ].results.filter(x => x.pk !== keyPleadingId);
      state.dataKeyPleading[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  //notes
  getDataNoteKeyPleading(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },

  //comments
  getDataCommentKeyPleading(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackKeyPleading(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentKeyPleading(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackKeyPleading(state, data) {
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

  updateCommentKeyPleading(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedbackKeyPleading(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountCommentKeyPleading(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeCommentKeyPleading(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackKeyPleading(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  },
  getKeyPleadingDetail(state, data) {
    state.dataKeyPleadingDetail = data
  },
  updateDataKeyPleadingDetail(state, { result }) {
    state.dataKeyPleadingDetail = { ...state.dataKeyPleadingDetail, ...result }
  },
  updateDetail(state, result) {
    state.dataKeyPleadingDetail = { ...state.dataKeyPleadingDetail, ...result }
  }
};
