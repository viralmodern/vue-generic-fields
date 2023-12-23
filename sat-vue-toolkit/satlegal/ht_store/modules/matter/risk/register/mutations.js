import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataRisk(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataRisk = data;
    } else {
      for (let key in data) {
        const mergeTasks = ((state.dataRisk[key] || {}).results || []).concat(
          data[key].results
        );
        const results = removeObjectDuplicate(mergeTasks, 'id'); //remove duplicates
        state.dataRisk[key] = {
          ...data[key],
          results
        };
      }
      state.dataRisk = { ...state.dataRisk };
    }
  },
  setAllDataRisk(state, data) {
    state.dataAllRisk = data;
  },
  setAllDataRiskNoGroup(state, data) {
    state.dataAllRiskNoGroup = data
  },
  getDataNoteRisk(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },
  addDataRisk(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataRisk[name];
      data.results.push(result);
      data.totals++;
    });
  },
  addRiskNoGroupBy(state, result) {
    state.dataAllRisk.unshift(result);
  },
  updateDataRisk(state, { result }) {
    for (const key in state.dataRisk) {
      state.dataRisk[key].results = state.dataRisk[key].results.map(x => {
        if (x.id === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataRisk(state, { name, riskId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataRisk) {
        state.dataRisk[key].results = state.dataRisk[key].results.filter(
          x => x.id !== riskId
        );
        state.dataRisk[key].totals--;
      }
    } else {
      state.dataRisk[name].results = state.dataRisk[name].results.filter(
        x => x.id !== riskId
      );
      state.dataRisk[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  getRiskDetail(state, data) {
    state.riskDetail = { ...state.riskDetail, ...data };
  },
  updateRisk(state, data) {
    state.riskDetail = data;
  },

  // Histories
  setLoadingHistories(state, isLoadingHistories) {
    state.isLoadingHistories = isLoadingHistories
  },
  getHistoriesRisks(state, response) {
    state.dataHistories = response.type === 'paging' ? state.dataHistories.concat(response.results) : response.results;
    state.total_histories = response.count;
  },
  postHistoriesRisks(state, result) {
    state.dataHistories = [...state.dataHistories, result];
    state.total_histories = state.total_histories++;
  },
  patchHistoriesRisks(state, result) {
    state.dataHistories = state.dataHistories.map(m => {
      if (m.pk === result.pk) {
        return {
          ...m, ...result
        }
      }
      return m;
    })
  },
  deleteHistoriesRisks(state, result) {
    state.dataHistories = state.dataHistories.filter(x => x.pk !== result.historiesId);
    state.total_histories = state.total_histories--;
  },

  //comments
  getDataCommentHistory(state, data) {
    state.dataComment = data.results;
    state.countComment = data.count;
  },

  getDataCommentFeedbackHistory(state, data) {
    const mergeComment = [...state.dataCommentFeedback, ...data.results];
    state.dataCommentFeedback = removeObjectDuplicate(mergeComment, "pk")
  },

  addCommentHistory(state, data) {
    state.dataComment.unshift(data);
  },

  addCommentFeedbackHistory(state, data) {
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

  updateCommentHistory(state, data) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateCommentFeedbackHistory(state, data) {
    state.dataCommentFeedback = state.dataCommentFeedback.map(x => {
      if (x.pk === data.pk) {
        return { ...x, ...data };
      }
      return x;
    })
  },

  updateChildCountCommentHistory(state, { commentId, calculation }) {
    state.dataComment = state.dataComment.map(x => {
      if (x.pk === commentId) {
        return { ...x, child_count: calculation(x.child_count) };
      }
      return x;
    })
  },

  removeCommentHistory(state, commentId) {
    state.dataComment = state.dataComment.filter(x => x.pk !== commentId)
  },

  removeCommentFeedbackHistory(state, commentId) {
    state.dataCommentFeedback = state.dataCommentFeedback.filter(x => x.pk !== commentId)
  },

  // relations
  updateDataRelationRisk(state, { id, result }) {
    for (const key in state.dataRisk) {
      state.dataRisk[key].results = state.dataRisk[key].results.map(x => {
        if (x.id === id) {
          x.relations_info.first_class_relations.push(result)
          return x;
        }
        return x;
      });
    }
  },

  removeDataRelationRisk(state, { id, result }) {
    for (const key in state.dataRisk) {
      state.dataRisk[key].results = state.dataRisk[key].results.map(x => {
        if (x.id === id) {
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
  },
  // attachments

  getDataAttachments(state, data) {
    state.dataAttachments = data;
  },

  addDataAttachment(state, data) {
    state.dataAttachments = [...state.dataAttachments, ...data]
  },

  updateDataAttachment(state, data) {
    state.dataAttachments = state.dataAttachments.map(x => {
      if (x.pk === data.attachmentId) {
        return { ...x, ...data.result }
      }
      return x;
    });
  },

  removeDataAttachment(state, attachmentId) {
    state.dataAttachments = state.dataAttachments.filter(x => x.pk !== attachmentId);
  },

  addDataAttachmentInRisk(state, data) {
    for (var key in state.dataRisk) {
      state.dataRisk[key].results = state.dataRisk[
        key
      ].results.map(x => {
        if (x.id === data.riskId) {
          const attachments = [...x.attachments, ...data.attachment];
          return { ...x, attachments };
        }
        return x;
      });
    }
    if (data.detail) {
      const attachments = [...state.riskDetail.attachments, ...data.attachment];
      state.riskDetail = { ...state.riskDetail, attachments };
    }
  },

  updateDataAttachmentInRisk(state, data) {
    for (var key in state.dataRisk) {
      state.dataRisk[key].results = state.dataRisk[
        key
      ].results.map(x => {
        if (x.id === data.riskId) {
          const attachments = x.attachments.map(attachment => {
            if (attachment.pk === data.attachment.pk) {
              return data.attachment;
            }
            return attachment;
          });
          return { ...x, attachments };
        }
        return x;
      });
    }
    if (data.detail) {
      state.riskDetail.attachments = state.riskDetail.attachments.map(attachment => {
        if (attachment.pk === data.attachment.pk) {
          return data.attachment;
        }
        return attachment;
      });
    }
  },

  removeDataAttachmentInRisk(state, data) {
    for (var key in state.dataRisk) {
      state.dataRisk[key].results = state.dataRisk[
        key
      ].results.map(x => {
        if (x.id === data.riskId) {
          const attachments = x.attachments.filter(x => x.pk !== data.attachmentId);
          return { ...x, attachments };
        }
        return x;
      });
    }
    if (data.detail) {
      const attachments = state.riskDetail.attachments.filter(x => x.pk !== data.attachmentId);
      state.riskDetail = { ...state.riskDetail, attachments };
    }
  },

};
