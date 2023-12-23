import _ from "lodash";
import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataTestimony(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataSustainability = data;
    } else {
      for (let key in data) {
        const mergeTasks = ((state.dataSustainability[key] || {}).results || []).concat(
          data[key].results
        );
        const results = _.uniqBy(mergeTasks, 'pk'); //remove duplicates
        state.dataSustainability[key] = {
          ...data[key],
          results
        };
      }
      state.dataSustainability = { ...state.dataSustainability };
    }
  },
  addDataTestimony(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataSustainability[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataTestimony(state, { result }) {
    for (const key in state.dataSustainability) {
      state.dataSustainability[key].results = state.dataSustainability[key].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataTestimony(state, { name, depositionId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataSustainability) {
        state.dataSustainability[key].results = state.dataSustainability[key].results.filter(
          x => x.pk !== depositionId
        );
        state.dataSustainability[key].totals--;
      }
    } else {
      state.dataSustainability[name].results = state.dataSustainability[name].results.filter(
        x => x.pk !== depositionId
      );
      state.dataSustainability[name].totals--;
    }
  },

  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  setLoadingGetDetail(state, loading) {
    state.isLoadingGetDetail = loading;
  },
  //notes
  getNotes(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },
  //comments
  getDataComment(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedback(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addComment(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedback(state, data) {
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

  updateComment(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedback(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountComment(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeComment(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedback(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  },
};
