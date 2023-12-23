export default {
  dataFacts: state => state.dataFacts,
  dataFactsNoGroup: state => {
    if (state.dataFacts.all) {
      const results = state.dataFacts.all.results;
      return results ? results : [];
    }
    return [];
  },
  isLoadingGet: state => state.isLoadingGet,
  dataFactsVersion: (state, _, __, rootGetters) => {
    // const allCharacters =
    //   rootGetters["ht_store/matter/partialInfoCharacter/dataAllCharacter"];
    // const result = state.dataFactsVersion.map(x => {
    //   const keysCharacters = Object.keys(x.characters).map(x => +x);
    //   const resultCharacters = allCharacters.filter(f => {
    //     return keysCharacters.includes(f.pk);
    //   }).reduce((acc, cur) => {
    //     acc[cur.pk] = cur;
    //     return acc;
    //   }, {});
    //   return {
    //     pk: x.pk,
    //     desc: x.desc,
    //     similarities: x.similarities,
    //     differences: x.differences,
    //     flag: x.flag,
    //     ...resultCharacters
    //   };
    // });
    return state.dataFactsVersion;
  },
  totals_fact_version: state => state.totals_fact_version,
  factDetail: state => state.factDetail,
  isLoadingVersion: state => state.isLoadingVersion
};
