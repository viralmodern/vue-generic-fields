import { removeObjectDuplicate } from "@/sat-vue-toolkit/satlegal/utils";

export default {
  setDataRequestSetExpense(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataRequestSetExpense = data;
    } else {
      for (let key in data) {
        const mergeTasks = (
          (state.dataRequestSetExpense[key] || {}).results || []
        ).concat(data[key].results);
        const results = removeObjectDuplicate(mergeTasks, "pk"); //remove duplicates
        state.dataRequestSetExpense[key] = {
          ...data[key],
          results
        };
      }
      state.dataRequestSetExpense = { ...state.dataRequestSetExpense };
    }
  },
  setAllDataRequestSetExpense(state, data) {
    state.dataAllRequestSetExpense = data;
  },
  addDataRequestSetExpense(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataRequestSetExpense[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataRequestSetExpense(state, { result }) {
    for (const key in state.dataRequestSetExpense) {
      state.dataRequestSetExpense[key].results = state.dataRequestSetExpense[
        key
      ].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataRequestSetExpense(state, { name, requestSetExpenseId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataRequestSetExpense) {
        state.dataRequestSetExpense[key].results = state.dataRequestSetExpense[
          key
        ].results.filter(x => x.pk !== requestSetExpenseId);
        state.dataRequestSetExpense[key].totals--;
      }
    } else {
      state.dataRequestSetExpense[name].results = state.dataRequestSetExpense[
        name
      ].results.filter(x => x.pk !== requestSetExpenseId);
      state.dataRequestSetExpense[name].totals--;
    }
  },
  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  // relations
  updateDataRelationRequestSetExpense(state, { pk, result }) {
    for (const key in state.dataRequestSetExpense) {
      state.dataRequestSetExpense[key].results = state.dataRequestSetExpense[key].results.map(x => {
        if (x.pk === pk) {
          x.relations_info.first_class_relations.push(result)
          return x;
        }
        return x;
      });
    }
  },

  removeDataRelationRequestSetExpense(state, { pk, result }) {
    for (const key in state.dataRequestSetExpense) {
      state.dataRequestSetExpense[key].results = state.dataRequestSetExpense[key].results.map(x => {
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
  setDataRequestSetExpenseDetail(state, data) {
    state.expenseDetail = data
  },
  updateExpenseDetail(state, { result }) {
    state.expenseDetail = { ...state.expenseDetail, ...result }
  },
  updateDataRelationRequestSetExpenseDetail(state, data) {
    const relations_info = state.expenseDetail.relations_info
    relations_info.first_class_relations.push(data)
    state.expenseDetail = { ...state.expenseDetail, relations_info }
  },
  removeDataRelationRequestSetExpenseDetail(state, { objectId, contentTypeId }) {
    let relations = state.expenseDetail.relations_info.first_class_relations.filter(x => {
      const checkContentTypeId = contentTypeId !== x.content_type_id;
      if (checkContentTypeId) {
        return true;
      } else {
        return +x.pk !== +objectId;
      }
    });
    state.expenseDetail.relations_info.first_class_relations = relations;
  }
};
