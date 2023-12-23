import baseFactMixin from "./baseFactMixin";
export default {
  mixins: [baseFactMixin],
  data() {
    return {
      isLoadingSearchFact: false,
    };
  },
  methods: {
    async $_searchFactMixin_search(text) {
      try {
        const searchObject = {
          ungroup: true,
          name: text
        }
        this.isLoadingSearchFact = true;
        await this.$_baseFactMixin_getDataFromApi(searchObject, true);
        this.isLoadingSearchFact = false;
      } catch (error) {
        this.isLoadingSearchFact = false;
      }
    },
  }
};
