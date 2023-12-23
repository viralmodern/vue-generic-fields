import _ from "lodash";

export default {
  getRiskAction(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataRiskAction = data.results;
      state.totals = data.count;
    } else {
      const mergeTasks = state.dataRiskAction.concat(data.results);
      const results = _.uniqBy(mergeTasks, "id"); //remove duplicates
      state.dataRiskAction = results;
      state.totals = data.count;
    }
  },
  updateDataRiskAction(state, data) {
    state.dataRiskAction = state.dataRiskAction.map(x => {
      if (x.id === data.id) {
        if (new Date(x.start_date) > new Date(data.body.end_date) ||
          new Date(data.body.start_date) > new Date(x.end_date)) {
          return x;
        }
        return { ...x, ...data.body };
      }
      return x;
    });
  },
  updateData(state, { result }) {
    state.dataRiskAction = state.dataRiskAction.map(x => {
      if (x.id === result.id) {
        return { ...x, ...result };
      }
      return x;
    });
  },
  addDataRiskAction(state, data) {
    state.dataRiskAction.push(data);
    state.totals++;
  },
  removeDataRiskAction(state, id) {
    state.dataRiskAction = state.dataRiskAction.filter(
      x => x.id !== id
    );
  },
  setLoading(state, status) {
    state.isLoadingGet = status;
  },
  // relations
  updateDataRelationRisk(state, { id, result }) {
    state.dataRiskAction = state.dataRiskAction.map(x => {
      if (x.id === id) {
        x.relations_info.first_class_relations.push(result)
        return x;
      }
      return x;
    });
  },

  removeDataRelationRisk(state, { id, result }) {
    state.dataRiskAction = state.dataRiskAction.map(x => {
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
  },
}

