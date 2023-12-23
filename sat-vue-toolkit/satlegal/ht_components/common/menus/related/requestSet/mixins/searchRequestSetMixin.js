import baseRequestSetMixin from "./baseRequestSetMixin";

export default {
  mixins: [baseRequestSetMixin],
  data() {
    return {
      isLoadingSearchRequestSet: false
    };
  },
  methods: {
    async $_searchRequestSetMixin_search(text) {
      try {
        const searchObject = {
          ungroup: true,
          name: text,
          page: 1
        }
        this.isLoadingSearchRequestSet = true;
        await this.$_baseRequestSetMixin_getDataFromApi(searchObject, true);
        this.isLoadingSearchRequestSet = false;
      } catch (error) {
        this.isLoadingSearchRequestSet = false;
      }
    },
  }
};
