import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";
import _ from "lodash";

export default {
  getEvidencesFromApi(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataEvidences = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataEvidences[key] || {}).results || []
        ).concat(data[key].results);
        const results = _.uniqBy(mergeTasks, "pk"); //remove duplicates
        state.dataEvidences[key] = {
          ...data[key],
          results
        };
      }
      state.dataEvidences = { ...state.dataEvidences };
    }
  },
  postEvidences(state, result) {
    state.dataEvidences = [...state.dataEvidences, result];
  },
  patchEvidences(state, { evidencesId, body }) {
    for (const key in state.dataEvidences) {
      state.dataEvidences[key].results = state.dataEvidences[
        key
      ].results.map(x => {
        if (x.pk === evidencesId) {
          return { ...x, ...body };
        }
        return x;
      });
    }
  },
  updateEvidences(state, { result }) {
    for (const key in state.dataEvidences) {
      state.dataEvidences[key].results = state.dataEvidences[
        key
      ].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeEvidences(state, { name, evidencesId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataEvidences) {
        state.dataEvidences[key].results = state.dataEvidences[
          key
        ].results.filter(x => x.pk !== evidencesId);
        state.dataEvidences[key].totals--;
      }
    } else {
      state.dataEvidences[name].results = state.dataEvidences[
        name
      ].results.filter(x => x.pk !== evidencesId);
      state.dataEvidences[name].totals--;
    }
  },
  getEvidencesDetail(state, data) {
    state.evidencesDetail = data;
  },
  patchEvidencesDetail(state, { body }) {
    state.evidencesDetail = { ...state.evidencesDetail, ...body }
  },
  updateEvidencesDetail(state, body) {
    state.evidencesDetail = { ...state.evidencesDetail, ...body }
  },
  setLoading(state, isLoading) {
    state.setLoading = isLoading;
  },
  //
  getDataChainCustodyFromApi(state, response) {
    state.dataChainCustody =
      response.type === "paging"
        ? state.dataChainCustody.concat(response.results)
        : response.results;
    state.totals = response.count;
  },
  postChainCustody(state, result) {
    state.dataChainCustody = [...state.dataChainCustody, result];
  },
  patchChainCustody(state, response) {
    state.dataChainCustody = state.dataChainCustody.map(x => {
      if (x.pk === response.chainCustodyId) {
        return { ...x, ...response.body };
      }
      return x;
    });
  },
  deleteChainCustody(state, result) {
    state.dataChainCustody = state.dataChainCustody.filter(
      x => x.pk !== result.chainCustodyId
    );
  },
  updateDataEvidences(state, { drag, result }) {
    if (drag) {
      return drag;
    } else {
      state.dataEvidences = state.dataEvidences.map(x => {
        if (x.pk === result.pk) {
          return result;
        }
        return x;
      });
    }
  },
  // relations
  updateRelationEvidence(state, { id, result, detail = false }) {
    for (const key in state.dataEvidences) {
      state.dataEvidences[key].results = state.dataEvidences[
        key
      ].results.map(x => {
        if (x.pk === id) {
          x.relations_info.first_class_relations.push(result);
          return x;
        }
        return x;
      });
    }
    if (detail) {
      state.evidencesDetail.relations_info.first_class_relations = [...state.evidencesDetail.relations_info.first_class_relations, result]
    }
  },

  removeRelationEvidence(state, { id, result, detail }) {
    for (const key in state.dataEvidences) {
      state.dataEvidences[key].results = state.dataEvidences[
        key
      ].results.map(x => {
        if (x.pk === id) {
          let relations = x.relations_info.first_class_relations.filter(x => {
            const checkContentTypeId = result.contentTypeId !== x.content_type_id;
            if (checkContentTypeId) {
              return true;
            } else {
              return +x.pk !== +result.objectId;
            }
          });
          x.relations_info.first_class_relations = relations;
          return x;
        }
        return x;
      });
    }
    if (detail) {
      state.evidencesDetail.relations_info.first_class_relations = state.evidencesDetail.relations_info.first_class_relations.filter(x => {
        const checkContentTypeId = result.contentTypeId !== x.content_type_id;
        if (checkContentTypeId) {
          return true;
        } else {
          return +x.pk !== +result.objectId;
        }
      });
    }
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
  }
};
