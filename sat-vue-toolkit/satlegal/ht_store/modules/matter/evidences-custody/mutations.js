import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  getDataEvidencesCustody(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataEvidencesCustody = data.results;
      state.totals = data.count;
    } else {
      const mergeTasks = state.dataEvidencesCustody.concat(data.results);
      const results = removeObjectDuplicate(mergeTasks, "pk"); //remove duplicates
      state.dataEvidencesCustody = results;
      state.totals = data.count;
    }
  },

  updateEvidencesCustody(state, { result }) {
    state.dataEvidencesCustody = state.dataEvidencesCustody.map(x => {
      if (x.pk === result.evidenceId || x.pk === result.pk) {
        return { ...x, ...result };
      }
      return x;
    });
  },

  addEvidencesCustody(state, data) {
    state.dataEvidencesCustody.push(data);
    state.totals++;
  },

  removeEvidencesCustody(state, evidenceId) {
    state.dataEvidencesCustody = state.dataEvidencesCustody.filter(
      x => x.pk !== evidenceId
    );
  },

  setLoading(state, status) {
    state.isLoadingGet = status;
  },

  // custody items
  addDataCustodyItemInEvidence(state, result) {
    state.dataEvidencesCustody = state.dataEvidencesCustody.map(x => {
      if (x.pk === result.evidenceId) {
        x.chain_custody_items.unshift(result.body);
        return x;
      }
      return x;
    });
  },

  updateDataCustodyItemInEvidence(state, result) {
    state.dataEvidencesCustody = state.dataEvidencesCustody.map(x => {
      if (x.pk === result.evidenceId) {
        x.chain_custody_items = x.chain_custody_items.map(custodyItem => {
          if (custodyItem.pk === result.custodyItemId) {
            return {
              ...custodyItem,
              ...result.body
            }
          }
          return custodyItem;
        })
        return x;
      }
      return x;
    });
  },

  removeDataCustodyItemInEvidence(state, result) {
    state.dataEvidencesCustody = state.dataEvidencesCustody.map(x => {
      if (x.pk === result.evidenceId) {
        x.chain_custody_items = x.chain_custody_items.filter(custodyItem => custodyItem.pk !== result.custodyItemId)
        return x;
      }
      return x;
    });
  },

  //comments
  getDataCommentEvidencesCustody(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackEvidencesCustody(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentEvidencesCustody(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackEvidencesCustody(state, data) {
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

  updateCommentEvidencesCustody(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedbackEvidencesCustody(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountCommentEvidencesCustody(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeCommentEvidencesCustody(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackEvidencesCustody(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  },

};
