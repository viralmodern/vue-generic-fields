import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataSubpoena(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataSubpoenas = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataSubpoenas[key] || {}).results || []
        ).concat(data[key].results);
        const results = removeObjectDuplicate(mergeTasks, "id"); //remove duplicates
        state.dataSubpoenas[key] = {
          ...data[key],
          results
        };
      }
      state.dataSubpoenas = { ...state.dataSubpoenas };
    }
  },
  addDataSubpoena(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataSubpoenas[name];
      data.results.push(result);
      data.totals++;
    });
  },

  updateDataSubpoena(state, { result }) {
    if (result.color) {
      result.color = '#' + result.color
    }
    for (const key in state.dataSubpoenas) {
      state.dataSubpoenas[key].results = state.dataSubpoenas[key].results.map(x => {
        if (x.id === result.id || x.pk === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataSubpoena(state, { name, meetingId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataSubpoenas) {
        state.dataSubpoenas[key].results = state.dataSubpoenas[key].results.filter(
          x => x.id !== meetingId
        );
        state.dataSubpoenas[key].totals--;
      }
    } else {
      state.dataSubpoenas[name].results = state.dataSubpoenas[name].results.filter(
        x => x.id !== meetingId
      );
      state.dataSubpoenas[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  //notes
  getDataNote(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },
  updateNotes(state, data) {
    for (const key in state.dataSubpoenas) {
      state.dataSubpoenas[key].results = state.dataSubpoenas[
        key
      ].results.map(x => {
        if (x.pk === data.id) {
          const total_notes = x.total_notes + 1;
          return { ...x, total_notes };
        }
        return x;
      });
    }
  },
  removeNotes(state, data) {
    for (const key in state.dataSubpoenas) {
      state.dataSubpoenas[key].results = state.dataSubpoenas[
        key
      ].results.map(x => {
        if (x.pk === data.id) {
          return { ...x, total_notes: x.total_notes - 1 };
        }
        return x;
      });
    }
  },

  //comments
  getDataCommentSubpoenaSet(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackSubpoenaSet(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentSubpoenaSet(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackSubpoenaSet(state, data) {
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

  updateCommentSubpoenaSet(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedbackSubpoenaSet(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountCommentSubpoenaSet(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeCommentSubpoenaSet(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackSubpoenaSet(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  },

  // Detail
  getSupoenaDetail(state, data) {
    state.dataSubpoenasDetail = data
  },
  updateDataSubpoenaDetail(state, { result }) {
    state.dataSubpoenasDetail = { ...state.dataSubpoenasDetail, ...result }
  }
};
