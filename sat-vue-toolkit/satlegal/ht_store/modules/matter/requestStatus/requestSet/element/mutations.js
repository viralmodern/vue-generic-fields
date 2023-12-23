import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  getDataRequestSetItemElement(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataRequestSetItemElement = data.results;
      state.totals = data.count;
    } else {
      const mergeTasks = state.dataRequestSetItemElement.concat(data.results);
      const results = removeObjectDuplicate(mergeTasks, "pk"); //remove duplicates
      state.dataRequestSetItemElement = results;
      state.totals = data.count;
    }
  },
  updateRequestSetItemElement(state, result) {
    state.dataRequestSetItemElement = state.dataRequestSetItemElement.map(x => {
      if (x.pk === result.pk) {
        return { ...x, ...result };
      }
      return x;
    });
  },
  addRequestSetItemElement(state, data) {
    state.dataRequestSetItemElement.push(data);
    state.totals++;
  },
  removeRequestSetItemElement(state, pk) {
    state.dataRequestSetItemElement = state.dataRequestSetItemElement.filter(
      x => x.pk !== pk
    );
    state.totals--;
  },
  setLoading(state, status) {
    state.isLoadingGet = status;
  },

  // relations
  updateDataRelationRequestSetItemElement(state, {pk, result}) {
    state.dataRequestSetItemElement = state.dataRequestSetItemElement.map(x => {
      if (x.pk === pk) {
        x.relations_info.first_class_relations.push(result)
        return x;
      }
      return x;
    });
  },

  removeDataRelationRequestSetItemElement(state, {pk, result}) {
    state.dataRequestSetItemElement = state.dataRequestSetItemElement.map(x => {
      if (x.pk === pk) {
        let relations = x.relations_info.first_class_relations.filter(relation => {
          const checkContentTypeId = result.contentTypeId !== relation.content_type_id;
          if (checkContentTypeId) {
            return true;
          } else {
            return +relation.pk !== +result.objectId;
          }
        });
        x.relations_info.first_class_relations = relations;
        return x;
      }
      return x;
    });
  },
};
