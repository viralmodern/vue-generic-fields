import _ from "lodash";

export default {
  setDataDeposition(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataDeposition = data;
    } else {
      for (let key in data) {
        const mergeTasks = ((state.dataDeposition[key] || {}).results || []).concat(
          data[key].results
        );
        const results = _.uniqBy(mergeTasks, 'pk'); //remove duplicates
        state.dataDeposition[key] = {
          ...data[key],
          results
        };
      }
      state.dataDeposition = { ...state.dataDeposition };
    }
  },
  addDataDeposition(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataDeposition[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataDeposition(state, { result }) {
    for (const key in state.dataDeposition) {
      state.dataDeposition[key].results = state.dataDeposition[key].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataDeposition(state, { name, depositionId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataDeposition) {
        state.dataDeposition[key].results = state.dataDeposition[key].results.filter(
          x => x.pk !== depositionId
        );
        state.dataDeposition[key].totals--;
      }
    } else {
      state.dataDeposition[name].results = state.dataDeposition[name].results.filter(
        x => x.pk !== depositionId
      );
      state.dataDeposition[name].totals--;
    }
  },

  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  setLoadingGetDetail(state, loading) {
    state.isLoadingGetDetail = loading;
  },

  getFactDetail(state, data) {
    state.factDetail = data;
  }
};
