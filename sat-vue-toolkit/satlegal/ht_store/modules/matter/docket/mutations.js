export default {
  setDataDocket(state, data) {
    state.dataDocket = { ...state.dataDocket, ...data };
    state.totals_docket = state.dataDocket.count;
  },
  setDataDocketNoGroup(state, data) {
    state.dataDocketNoGroup = data.results;
  },
  addDataDocket(state, data) {
    state.dataDocket.push(data);
    state.totals_docket = state.totals_docket++;
  },
  updateDataDocket(state, { result }) {
    for (const key in state.dataDocket) {
      state.dataDocket[key].results = state.dataDocket[
        key
      ].results.map(x => {
        if (x.id === result.id || x.pk === result.id) {
          return { ...x, ...result };
        }
        return x;
      });
    }
  },
  removeDataDocket(state, data) {
    state.dataDocket = state.dataDocket.filter(x => x.id !== data.id);
    state.totals_docket = state.totals_docket--;
  },

  setLoading(state, loading) {
    state.isLoadingGet = { ...state.isLoadingGet, ...loading };
  },
  // attachments

  getDataDocuments(state, data) {
    state.dataDocuments = data;
  },
  // Related
  getDataDocketRelated(state, response) {
    state.dataDocketRelated = response.results;
    state.total_related = response.count;
  },
  postDocketRelated(state, result) {
    state.dataDocketRelated = [...state.dataDocketRelated, result];
    state.total_related = state.total_related++;
  },
  patchDocketRelated(state, result) {
    state.dataDocketRelated = state.dataDocketRelated.map(x => {
      if (x.pk === result.relatedId) {
        return { ...x, ...result }
      }
      return x;
    });
  },
  deleteDocketRelated(state, result) {
    state.dataDocketRelated = state.dataDocketRelated.filter(f => f.pk !== result.relatedId);
    state.total_related = state.total_related--;
  },
};
