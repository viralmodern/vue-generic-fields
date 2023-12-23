import _ from "lodash";
export default {
  getDataFromApi(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataList = data.results;
      state.totals = data.count;
    } else {
      const mergeTasks = state.dataList.concat(data.results);
      const results = _.uniqBy(mergeTasks, "id"); //remove duplicates
      state.dataList = results;
      state.totals = data.count;
    }
  },
  addRequestApi(state, data) {
    state.dataList.push({ id: data.pk, ...data });
    state.totals++;
  },
  updateDataDefinition(state, data) {
    state.dataList = state.dataList.map(x => {
      if (x.id === data.id) {
        return { ...x, ...data.body };
      }
      return x;
    });
  },
  updateDefinition(state, { result }) {
    state.dataList = state.dataList.map(x => {
      if (x.id === result.id) {
        return { ...x, ...result };
      }
      return x;
    });
  },
  patchRequestApi(state, response) {
    state.dataList = state.dataList.map(x => {
      if (x.pk === response.pk) {
        return { ...x, ...response };
      }
      return x;
    });
  },
  removeDataDefinition(state, id) {
    state.dataList = state.dataList.filter(
      x => x.id !== id
    );
  },
  setLoading(state, loading) {
    state.isLoadingGet = loading;
  }
};
