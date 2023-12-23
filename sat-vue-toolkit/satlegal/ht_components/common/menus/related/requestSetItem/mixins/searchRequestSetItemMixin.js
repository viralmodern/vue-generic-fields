import baseRequestSetItemMixin from "./baseRequestSetItemMixin";

export default {
  mixins: [baseRequestSetItemMixin],
  data() {
    return {
      isLoadingSearchRequestSetItem: false
    };
  },
  methods: {
    async $_searchRequestSetItemMixin_search(text) {
      try {
        const searchObject = {
          ungroup: true,
          name: text,
        }
        this.isLoadingSearchRequestSetItem = true;
        await this.$_baseRequestSetItemMixin_getDataFromApi(searchObject, true);
        this.isLoadingSearchRequestSetItem = false;
      } catch (error) {
        this.isLoadingSearchRequestSetItem = false;
      }
    },
  }
};
