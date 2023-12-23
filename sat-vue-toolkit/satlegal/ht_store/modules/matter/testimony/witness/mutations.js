import _ from "lodash";
import { cloneDeep } from "@/sat-vue-toolkit/satlegal/utils"

export default {
  setDataWitness(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataWitness = data;
    } else {
      for (let key in data) {
        const mergeTasks = ((state.dataWitness[key] || {}).results || []).concat(
          data[key].results
        );
        const results = _.uniqBy(mergeTasks, 'pk'); //remove duplicates
        state.dataWitness[key] = {
          ...data[key],
          results
        };
      }
      state.dataWitness = { ...state.dataWitness };
    }
  },
  addDataWitness(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataWitness[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataWitness(state, { result }) {
    for (const key in state.dataWitness) {
      state.dataWitness[key].results = state.dataWitness[key].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...cloneDeep(result) };
        }
        return x;
      });
    }

  },
  removeDataWitness(state, { name, witnessId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataWitness) {
        state.dataWitness[key].results = state.dataWitness[key].results.filter(
          x => x.pk !== witnessId
        );
        state.dataWitness[key].totals--;
      }
    } else {
      state.dataWitness[name].results = state.dataWitness[name].results.filter(
        x => x.pk !== witnessId
      );
      state.dataWitness[name].totals--;
    }
  },

  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  setLoadingGetDetail(state, loading) {
    state.isLoadingGetDetail = loading;
  },

  // relations
  updateDataRelationWitness(state, {pk, result}) {
    for (const key in state.dataWitness) {
      state.dataWitness[key].results = state.dataWitness[key].results.map(x => {
        if (x.pk === pk) {
          x.relations_info.first_class_relations.push(result)
          return x;
        }
        return x;
      });
    }
  },

  removeDataRelationWitness(state, {pk, result}) {
    for (const key in state.dataWitness) {
      state.dataWitness[key].results = state.dataWitness[key].results.map(x => {
        if (x.pk === pk) {
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
