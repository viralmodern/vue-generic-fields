import baseDepositionMixin from "./baseDepositionMixin";

export default {
  mixins: [baseDepositionMixin],
  data() {
    return {
      isLoadingSearchDeposition: false
    };
  },
  methods: {
    async $_searchDepositionMixin_search(text) {
      try {
        const searchObject = {
          ungroup: true,
          name: text
        };
        this.isLoadingSearchDeposition = true;
        await this.$_baseDepositionMixin_getDataFromApi(searchObject, true);
        this.isLoadingSearchDeposition = false;
      } catch (error) {
        this.isLoadingSearchDeposition = false;
      }
    }
  }
};
