import baseRiskMixin from "./baseRiskMixin";
export default {
  mixins: [baseRiskMixin],
  data() {
    return {
      isLoadingSearchRisk: false,
    };
  },
  methods: {
    async $_searchRiskMixin_search(text) {
      try {
        const searchObject = {
          ungroup: true,
          question: text
        }
        this.isLoadingSearchRisk = true;
        await this.$_baseRiskMixin_getDataFromApi(searchObject, true);
        this.isLoadingSearchRisk = false;
      } catch (error) {
        this.isLoadingSearchRisk = false;
      }
    },
  }
};
