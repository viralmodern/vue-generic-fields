import baseExhibitMixin from "./baseExhibitMixin";
export default {
  mixins: [baseExhibitMixin],
  data() {
    return {
      isLoadingSearchExhibit: false,
    };
  },
  methods: {
    async $_searchExhibitMixin_search(text) {
      try {
        const searchObject = {
          ungroup: true,
          question: text
        }
        this.isLoadingSearchExhibit = true;
        await this.$_baseExhibitMixin_getDataFromApi(searchObject, true);
        this.isLoadingSearchExhibit = false;
      } catch (error) {
        this.isLoadingSearchExhibit = false;
      }
    },
  }
};
