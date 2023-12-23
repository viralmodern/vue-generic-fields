import _ from "lodash";

export default {
  getDataFromApi(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataList = data;
    } else {
      for (let key in data) {
        const mergeTasks = ((state.dataList[key] || {}).results || []).concat(
          data[key].results
        );
        const results = _.uniqBy(mergeTasks, "id"); //remove duplicates
        state.dataList[key] = {
          ...data[key],
          results
        };
      }
      state.dataList = { ...state.dataList };
    }
  },
  patchRequestApi(state, { result }) {
    for (const key in state.dataList) {
      state.dataList[key].results = state.dataList[key].results.map(x => {
        if (x.id === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }

  },
  removeRequestApi(state, { name, rowId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataList) {
        state.dataList[key].results = state.dataList[key].results.filter(
          x => x.id !== rowId
        );
        state.dataList[key].totals--;
      }
    } else {
      state.dataList[name].results = state.dataList[name].results.filter(
        x => x.id !== rowId
      );
      state.dataList[name].totals--;
    }
  },

  setLoading(state, loading) {
    state.isLoading = { ...state.isLoading, ...loading };
  },
  addDataDefiAndInstrucs(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataList[name];
      result.index = data.results.length + 1;
      data.results.push(result);
      data.totals++;
    });
  },
};
