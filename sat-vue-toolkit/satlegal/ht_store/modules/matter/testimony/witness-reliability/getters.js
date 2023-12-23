export default {
  dataWitnessReliability: state => state.dataWitnessReliability,
  dataWitnessReliabilityNoGroup: state => {
    if (state.dataWitnessReliability.all) {
      const results = state.dataWitnessReliability.all.results;
      return results ? results : [];
    }
    return [];
  },
  isLoadingGet: state => state.isLoadingGet,
};
