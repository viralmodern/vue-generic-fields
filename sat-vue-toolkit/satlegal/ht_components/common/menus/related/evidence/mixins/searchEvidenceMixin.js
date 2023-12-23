import baseEvidenceMixin from "./baseEvidenceMixin";

export default {
  mixins: [baseEvidenceMixin],
  data() {
    return {
      isLoadingSearchEvidence: false
    };
  },
  methods: {
    async $_searchEvidenceMixin_search(text) {
      try {
        const searchObject = {
          name: text
        }
        this.isLoadingSearchEvidence = true;
        await this.$_baseEvidenceMixin_getDataFromApi(searchObject);
        this.isLoadingSearchEvidence = false;
      } catch (error) {
        this.isLoadingSearchEvidence = false;
      }
    },
  }
};
