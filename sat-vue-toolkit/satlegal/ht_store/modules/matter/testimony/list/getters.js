export default {
  dataTestimony: state => state.dataTestimony,
  dataTestimonyNoGroup: state => {
    if (state.dataTestimony.all) {
      const results = state.dataTestimony.all.results;
      return results ? results : [];
    }
    return [];
  },
  isLoadingGet: state => state.isLoadingGet,
};
