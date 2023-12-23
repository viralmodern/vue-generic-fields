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
        const results = _.uniqBy(mergeTasks, 'pk'); //remove duplicates
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

  setLoadingGetDetail(state, loading) {
    state.isLoadingGetDetail = loading;
  },

  getFactDetail(state, data) {
    state.factDetail = data;
  }
};
