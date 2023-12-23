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
  setLoading(state, loading) {
    state.isLoading = { ...state.isLoading, ...loading };
  },
  // attachments
  getDataAttachments(state, data) {
    state.dataAttachments = data;
  },
  // Note
  getNotes(state, data) {
    state.dataNotes = data.results;
    state.countNotes = data.count;
  },
};
