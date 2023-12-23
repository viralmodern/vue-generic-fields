import _ from "lodash";
import { cloneDeep } from "@/sat-vue-toolkit/satlegal/utils"

export default {
  setDataWitnessReliability(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataWitnessReliability = data;
    } else {
      for (let key in data) {
        const mergeTasks = ((state.dataWitnessReliability[key] || {}).results || []).concat(
          data[key].results
        );
        const results = _.uniqBy(mergeTasks, 'pk'); //remove duplicates
        state.dataWitnessReliability[key] = {
          ...data[key],
          results
        };
      }
      state.dataWitnessReliability = { ...state.dataWitnessReliability };
    }
  },
  addDataWitnessReliability(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataWitnessReliability[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataWitnessReliability(state, { result }) {
    for (const key in state.dataWitnessReliability) {
      state.dataWitnessReliability[key].results = state.dataWitnessReliability[key].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...cloneDeep(result) };
        }
        return x;
      });
    }

  },
  removeDataWitnessReliability(state, { name, witnessReliabilityId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataWitnessReliability) {
        state.dataWitnessReliability[key].results = state.dataWitnessReliability[key].results.filter(
          x => x.pk !== witnessReliabilityId
        );
        state.dataWitnessReliability[key].totals--;
      }
    } else {
      state.dataWitnessReliability[name].results = state.dataWitnessReliability[name].results.filter(
        x => x.pk !== witnessReliabilityId
      );
      state.dataWitnessReliability[name].totals--;
    }
  },

  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  setLoadingGetDetail(state, loading) {
    state.isLoadingGetDetail = loading;
  },

  // relations
  updateDataRelationWitnessReliability(state, {pk, result}) {
    for (const key in state.dataWitnessReliability) {
      state.dataWitnessReliability[key].results = state.dataWitnessReliability[key].results.map(x => {
        if (x.pk === pk) {
          x.relations_info.first_class_relations.push(result)
          return x;
        }
        return x;
      });
    }
  },

  removeDataRelationWitnessReliability(state, {pk, result}) {
    for (const key in state.dataWitnessReliability) {
      state.dataWitnessReliability[key].results = state.dataWitnessReliability[key].results.map(x => {
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
