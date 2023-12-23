import _ from "lodash";

export default {
  setDataFacts(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataFacts = data;
    } else {
      for (let key in data) {
        const mergeTasks = ((state.dataFacts[key] || {}).results || []).concat(
          data[key].results
        );
        const results = _.uniqBy(mergeTasks, "pk"); //remove duplicates
        state.dataFacts[key] = {
          ...data[key],
          results
        };
      }
      state.dataFacts = { ...state.dataFacts };
    }
  },
  addDataFacts(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataFacts[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataFacts(state, { result }) {
    for (const key in state.dataFacts) {
      state.dataFacts[key].results = state.dataFacts[key].results.map(x => {
        if (x.id === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataFacts(state, { name, factsId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataFacts) {
        state.dataFacts[key].results = state.dataFacts[key].results.filter(
          x => x.id !== factsId
        );
        state.dataFacts[key].totals--;
      }
    } else {
      state.dataFacts[name].results = state.dataFacts[name].results.filter(
        x => x.id !== factsId
      );
      state.dataFacts[name].totals--;
    }
  },

  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  getFactSlickGridVersion(state, response) {
    state.dataFactsVersion =
      response.type === "paging"
        ? state.dataFactsVersion.concat(response.result.results)
        : response.result.results;
    state.totals_fact_version = response.result.count;
  },
  patchFactSlickGridVersion(state, result) {
    state.dataFactsVersion = state.dataFactsVersion.map(x => {
      if (x.pk === result.pk) {
        return { ...x, ...result };
      }
      return x;
    });
  },
  updateFactSlickGridVersion(state, { result }) {
    
    state.dataFactsVersion = state.dataFactsVersion.map(x => {
      if (x.pk === result.id) {        
        return { ...x, ...result };
      }
      return x;
    });
  },
  patchOpinionFactVersion(state, result) {
    state.dataFactsVersion = state.dataFactsVersion.map(x => {
      if (parseInt(result.versionId) === x.pk) {
        x.characters[result.characterId] = {
          ...x.characters[result.characterId],
          ...result.body
        };
        return x;
      }
      return x;
    });
  },
  postVersion(state, result) {
    state.dataFactsVersion = [...state.dataFactsVersion, result];
  },
  deleteVersion(state, result) {
    state.dataFactsVersion = state.dataFactsVersion.filter(
      f => f.pk !== result.versionId
    );
  },
  getFactDetail(state, data) {
    state.factDetail = data;
  },
  updateFactDetail(state, data) {
    state.factDetail = { ...state.factDetail, ...data };
  },
  setLoadingSlickGrid(state, isLoadingVersion) {
    state.isLoadingVersion = isLoadingVersion;
  },
  // relations
  updateDataRelationFacts(state, { id, result }) {
    for (const key in state.dataFacts) {
      state.dataFacts[key].results = state.dataFacts[key].results.map(x => {
        if (x.id === id) {
          x.relations_info.first_class_relations.push(result)
          return x;
        }
        return x;
      });
    }
  },

  removeDataRelationFacts(state, { id, result }) {
    for (const key in state.dataFacts) {
      state.dataFacts[key].results = state.dataFacts[key].results.map(x => {
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
