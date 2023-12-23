import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/facts", ["dataFactsNoGroup"])
  },
  methods: {
    async $_baseFactMixin_getDataFromApi(searchObject = {}, isFirstCall) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const query = {
        idParams: {
          matterId
        },
        searchObject,
        isFirstCall
      };
      return this.getDataFactsRequest(query);
    },
    ...mapActions("ht_store/matter/facts", ["getDataFactsRequest"])
  }
};
