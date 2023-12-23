import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataRSID(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataRSID = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataRSID[key] || {}).results || []
        ).concat(data[key].results);
        const results = removeObjectDuplicate(mergeTasks, "pk"); //remove duplicates
        state.dataRSID[key] = {
          ...data[key],
          results
        };
      }
      state.dataRSID = { ...state.dataRSID };
    }
  },
  setDataRequestItem(state, data) {
    state.dataRequestItem = data;
  },

  setAllDataRSID(state, data) {
    state.dataAllRSID = data;
  },
  addDataRSID(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataRSID[name];
      data.results.push(result);
      data.totals++;
    });

  },
  updateDataRSID(state, { result }) {

    for (const key in state.dataRSID) {
      state.dataRSID[key].results = state.dataRSID[
        key
      ].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataRSID(state, { name, id, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataRSID) {
        state.dataRSID[key].results = state.dataRSID[
          key
        ].results.filter(x => x.pk !== id);
        state.dataRSID[key].totals--;
      }
    } else {
      state.dataRSID[name].results = state.dataRSID[
        name
      ].results.filter(x => x.pk !== id);
      state.dataRSID[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  //notes
  getDataNoteRSID(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },

  //comments
  getDataCommentRSID(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackRSID(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentRSID(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackRSID(state, data) {
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

  updateCommentRSID(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedbackRSID(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountCommentRSID(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeCommentRSID(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackRSID(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  },
  setDocumentDetail(state, data) {
    state.dataDocumentDetail = data
  },
  updateDataRSIDDetail(state, { result }) {
    state.dataDocumentDetail = { ...state.dataDocumentDetail, ...result }
  },
};
