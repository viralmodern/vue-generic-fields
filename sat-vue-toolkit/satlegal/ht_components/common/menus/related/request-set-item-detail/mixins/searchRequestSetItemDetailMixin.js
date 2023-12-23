import baseRequestSetItemDetailMixin from "./baseRequestSetItemDetailMixin";

export default {
  mixins: [baseRequestSetItemDetailMixin],
  data() {
    return {
      isLoadingSearchRequestSetItemDetail: false
    };
  },
  methods: {
    async $_searchRequestSetItemDetailMixin_search(query) {
      try {
        this.isLoadingSearchRequestSetItemDetail = true;
        await this.$_baseRequestSetItemDetailMixin_getDataFromApi(query);
        this.isLoadingSearchRequestSetItemDetail = false;
      } catch (error) {
        this.isLoadingSearchRequestSetItemDetail = false;
      }
    },
  }
};
