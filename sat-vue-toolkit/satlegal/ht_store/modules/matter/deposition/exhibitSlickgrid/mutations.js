import _ from "lodash";
import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataKeyExhibit(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataExhibitSlickgrid = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataExhibitSlickgrid[key] || {}).results || []
        ).concat(data[key].results);
        const results = _.uniqBy(mergeTasks, "id"); //remove duplicates
        state.dataExhibitSlickgrid[key] = {
          ...data[key],
          results
        };
      }
      state.dataExhibitSlickgrid = { ...state.dataExhibitSlickgrid };
    }
  },
  setAllDataKeyExhibit(state, data) {
    state.dataAllKeyExhibit = data;
  },
  addDataKeyExhibit(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataExhibitSlickgrid[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataKeyExhibit(state, { result }) {
    for (const key in state.dataExhibitSlickgrid) {
      state.dataExhibitSlickgrid[key].results = state.dataExhibitSlickgrid[
        key
      ].results.map(x => {
        if (x.id === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataKeyExhibit(state, { name, keyExhibitId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataExhibitSlickgrid) {
        state.dataExhibitSlickgrid[key].results = state.dataExhibitSlickgrid[
          key
        ].results.filter(x => x.id !== keyExhibitId);
        state.dataExhibitSlickgrid[key].totals--;
      }
    } else {
      state.dataExhibitSlickgrid[name].results = state.dataExhibitSlickgrid[
        name
      ].results.filter(x => x.id !== keyExhibitId);
      state.dataExhibitSlickgrid[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
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
  setDataKeyExhibitDetail(state, data) {
    state.dataExhibitDetail = data
  },
  updateDataKeyExhibitDetail(state, { result }) {
    state.dataExhibitDetail = { ...state.dataExhibitDetail, ...result }
  },
  updateDataExhibitDetail(state, result) {
    state.dataExhibitDetail = { ...state.dataExhibitDetail, ...result }
  },
};
