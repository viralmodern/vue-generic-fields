import baseDocketMixin from "./baseDocketMixin";
export default {
  mixins: [baseDocketMixin],
  data() {
    return {
      isLoadingSearchDocket: false,
    };
  },
  methods: {
    async $_searchDocketMixin_search(text) {
      try {
        const searchObject = {
          description: text
        }
        this.isLoadingSearchDocket = true;
        await this.$_baseDocketMixin_getDataFromApi(searchObject);
        this.isLoadingSearchDocket = false;
      } catch (error) {
        this.isLoadingSearchDocket = false;
      }
    },
  }
};
