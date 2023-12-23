import baseClientMixin from "./baseClientMixin";

export default {
  mixins: [baseClientMixin],
  data() {
    return {
      isLoadingSearchClient: false
    };
  },
  methods: {
    async $_searchClientMixin_search(text) {
      try {
        const searchObject = {
          ungroup: true,
          name: text
        };
        this.isLoadingSearchClient = true;
        await this.$_baseClientMixin_getDataFromApi(searchObject, true);
        this.isLoadingSearchClient = false;
      } catch (error) {
        this.isLoadingSearchClient = false;
      }
    }
  }
};
