import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataCharacter(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataCharacter = data;
    } else {
      for (let key in data) {
        const mergeTasks = ((state.dataCharacter[key] || {}).results || []).concat(
          data[key].results
        );
        const results = removeObjectDuplicate(mergeTasks, 'id'); //remove duplicates
        state.dataCharacter[key] = {
          ...data[key],
          results
        };
      }
      state.dataCharacter = { ...state.dataCharacter };
    }
  },
  setAllDataCharacter(state, data) {
    state.dataAllCharacter = data;
  },
  getDataNoteCharacter(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },
  addDataCharacter(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataCharacter[name];
      data.results.push(result);
      data.totals++;
    });
  },
  addCharacterNoGroupBy(state, result) {
    state.dataAllCharacter.unshift(result);
  },
  updateDataCharacter(state, { result }) {
    for (const key in state.dataCharacter) {
      state.dataCharacter[key].results = state.dataCharacter[key].results.map(x => {
        if (x.id === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataCharacter(state, { name, characterId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataCharacter) {
        state.dataCharacter[key].results = state.dataCharacter[key].results.filter(
          x => x.id !== characterId
        );
        state.dataCharacter[key].totals--;
      }
    } else {
      state.dataCharacter[name].results = state.dataCharacter[name].results.filter(
        x => x.id !== characterId
      );
      state.dataCharacter[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  getCharacterDetail(state, data) {
    state.characterDetail = { ...state.characterDetail, ...data };
  },
  updateCharacterDetail(state, data) {
    state.characterDetail = { ...state.characterDetail, ...data };
  },
  updateCharacter(state, data) {
    state.characterDetail = data;
  },

  // Histories
  setLoadingHistories(state, isLoadingHistories) {
    state.isLoadingHistories = isLoadingHistories
  },
  getHistoriesCharacters(state, response) {
    state.dataHistories = response.type === 'paging' ? state.dataHistories.concat(response.results) : response.results;
    state.total_histories = response.count;
  },
  postHistoriesCharacters(state, result) {
    state.dataHistories = [...state.dataHistories, result];
    state.total_histories = state.total_histories++;
  },
  patchHistoriesCharacters(state, result) {
    state.dataHistories = state.dataHistories.map(m => {
      if (m.pk === result.pk) {
        return {
          ...m, ...result
        }
      }
      return m;
    })
  },
  patchHistories(state, { result }) {
    state.dataHistories = state.dataHistories.map(m => {
      if (m.pk === result.pk) {
        return {
          ...m, ...result
        }
      }
      return m;
    })
  },
  deleteHistoriesCharacters(state, result) {
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
  updateDataRelationCharacter(state, { id, result }) {
    for (const key in state.dataCharacter) {
      state.dataCharacter[key].results = state.dataCharacter[key].results.map(x => {
        if (x.id === id) {
          x.relations_info.first_class_relations.push(result)
          return x;
        }
        return x;
      });
    }
  },

  removeDataRelationCharacter(state, { id, result }) {
    for (const key in state.dataCharacter) {
      state.dataCharacter[key].results = state.dataCharacter[key].results.map(x => {
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
};
