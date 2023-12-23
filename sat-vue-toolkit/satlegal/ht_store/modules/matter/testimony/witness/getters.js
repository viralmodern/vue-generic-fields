export default {
  dataWitness: state => state.dataWitness,
  dataWitnessNoGroup: state => {
    if (state.dataWitness.all) {
      const results = state.dataWitness.all.results;
      return results ? results : [];
    }
    return [];
  },
  isLoadingGet: state => state.isLoadingGet,
};
