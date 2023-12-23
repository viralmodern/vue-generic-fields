export default {
  dataDeposition: state => state.dataDeposition,
  dataDepositionNoGroup: state => {
    if (state.dataDeposition.all) {
      const results = state.dataDeposition.all.results;
      return results ? results : [];
    }
    return [];
  },
  isLoadingGet: state => state.isLoadingGet,
  factDetail: state => state.factDetail,
  isLoadingGetDetail: state => state.isLoadingGetDetail,
};
