import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataProceeding(state, data) {
    state.dataProceeding = data;

  },
  concatDataProceeding(state, data) {
    for (let key in data) {
      const mergeTasks = (
        (state.dataProceeding[key] || {}).results || []
      ).concat(data[key].results);
      const results = removeObjectDuplicate(mergeTasks, "id"); //remove duplicates
      state.dataProceeding[key] = {
        ...data[key],
        results
      };
    }
    state.dataProceeding = { ...state.dataProceeding };
  },
  setAllDataProceeding(state, data) {
    state.dataAllProceeding = data;
  },
  addDataProceeding(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataProceeding[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataProceeding(state, { result }) {
    for (const key in state.dataProceeding) {
      state.dataProceeding[key].results = state.dataProceeding[
        key
      ].results.map(x => {
        if (x.pk === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataProceeding(state, { name, id, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataProceeding) {
        state.dataProceeding[key].results = state.dataProceeding[
          key
        ].results.filter(x => x.pk !== id);
        state.dataProceeding[key].totals--;
      }
    } else {
      state.dataProceeding[name].results = state.dataProceeding[
        name
      ].results.filter(x => x.pk !== id);
      state.dataProceeding[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  //source
  getDataSource(state, data) {
    state.dataSource = data;
  },

  addSource(state, data) {
    state.dataSource.push(data)
  },

  updateSource(state, data) {
    state.dataSource.map(x => {
      if (x.pk === data.pk) {
        return data
      }
      return x
    })
  },

  // relations
  updateDataRelationProceeding(state, { id, result }) {
    for (const key in state.dataProceeding) {
      state.dataProceeding[key].results = state.dataProceeding[key].results.map(x => {
        if (x.id === id) {
          x.relations_info.first_class_relations.push(result)
          return x;
        }
        return x;
      });
    }
  },
  updateDataRelationProceedingDetail(state, result) {
    state.dataProceedingDetail.relations_info.first_class_relations.push(result)
  },

  removeDataRelationProceeding(state, { id, result }) {
    for (const key in state.dataProceeding) {
      state.dataProceeding[key].results = state.dataProceeding[key].results.map(x => {
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

  removeDataRelationProceedingDetail(state, result) {
    let relations = state.dataProceedingDetail.relations_info.first_class_relations.filter(x => {
      const checkContentTypeId = result.contentTypeId !== x.content_type_id;
      if (checkContentTypeId) {
        return true;
      } else {
        return +x.pk !== +result.objectId;
      }
    });
    state.dataProceedingDetail.relations_info.first_class_relations = relations;
  },

  setDataProceedingDetail(state, data) {
    state.dataProceedingDetail = data
  },
  updateDataProceedingDetail(state, { result }) {
    state.dataProceedingDetail = { ...state.dataProceedingDetail, ...result }
  },
  updateDataDetail(state, result) {
    state.dataProceedingDetail = { ...state.dataProceedingDetail, ...result }
  }

};
