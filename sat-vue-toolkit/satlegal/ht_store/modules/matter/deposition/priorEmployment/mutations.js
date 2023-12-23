import _ from "lodash";
import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataPriorEmployment(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataPriorEmployment = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataPriorEmployment[key] || {}).results || []
        ).concat(data[key].results);
        const results = _.uniqBy(mergeTasks, "pk"); //remove duplicates
        state.dataPriorEmployment[key] = {
          ...data[key],
          results
        };
      }
      state.dataPriorEmployment = { ...state.dataPriorEmployment };
    }
  },
  setAllDataPriorEmployment(state, data) {
    state.dataAllPriorEmployment = data;
  },
  addDataPriorEmployment(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataPriorEmployment[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataPriorEmployment(state, result) {
    for (const key in state.dataPriorEmployment) {
      state.dataPriorEmployment[key].results = state.dataPriorEmployment[
        key
      ].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  updateData(state, { result }) {
    for (const key in state.dataPriorEmployment) {
      state.dataPriorEmployment[key].results = state.dataPriorEmployment[
        key
      ].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataPriorEmployment(state, { name, priorEmploymentId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataPriorEmployment) {
        state.dataPriorEmployment[key].results = state.dataPriorEmployment[
          key
        ].results.filter(x => x.pk !== priorEmploymentId);
        state.dataPriorEmployment[key].totals--;
      }
    } else {
      state.dataPriorEmployment[name].results = state.dataPriorEmployment[
        name
      ].results.filter(x => x.pk !== priorEmploymentId);
      state.dataPriorEmployment[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  //notes
  getDataNotePriorEmployment(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },

  //comments
  getDataCommentPriorEmployment(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackPriorEmployment(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentPriorEmployment(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackPriorEmployment(state, data) {
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

  updateCommentPriorEmployment(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedbackPriorEmployment(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountCommentPriorEmployment(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeCommentPriorEmployment(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackPriorEmployment(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  },
  //Detail
  setDataPriorEmploymentDetail(state, data) {
    state.dataPriorEmploymentDetail = data
  },
  updateDataPriorEmploymentDetail(state, data) {
    state.dataPriorEmploymentDetail = { ...state.dataPriorEmploymentDetail, ...data }
  }
};
