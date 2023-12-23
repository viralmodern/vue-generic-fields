import _ from "lodash";

export default {
  setDataTestimony(state, data) {
    const isFirstCall = data.isFirstCall;
    delete data.isFirstCall;
    if (isFirstCall) {
      state.dataTestimony = data;
    } else {
      for (let key in data) {
        const mergeTasks = ((state.dataTestimony[key] || {}).results || []).concat(
          data[key].results
        );
        const results = _.uniqBy(mergeTasks, 'pk'); //remove duplicates
        state.dataTestimony[key] = {
          ...data[key],
          results
        };
      }
      state.dataTestimony = { ...state.dataTestimony };
    }
  },
  addDataTestimony(state, { listIdGroup, result }) {
    listIdGroup.forEach(name => {
      const data = state.dataTestimony[name];
      data.results.push(result);
      data.totals++;
    });
  },
  updateDataTestimony(state, { result }) {
    for (const key in state.dataTestimony) {
      state.dataTestimony[key].results = state.dataTestimony[key].results.map(x => {
        if (x.pk === result.pk) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataTestimony(state, { name, depositionId, isFieldArray }) {
    if (isFieldArray) {
      for (var key in state.dataTestimony) {
        state.dataTestimony[key].results = state.dataTestimony[key].results.filter(
          x => x.pk !== depositionId
        );
        state.dataTestimony[key].totals--;
      }
    } else {
      state.dataTestimony[name].results = state.dataTestimony[name].results.filter(
        x => x.pk !== depositionId
      );
      state.dataTestimony[name].totals--;
    }
  },

  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },

  setLoadingGetDetail(state, loading) {
    state.isLoadingGetDetail = loading;
  },

};
