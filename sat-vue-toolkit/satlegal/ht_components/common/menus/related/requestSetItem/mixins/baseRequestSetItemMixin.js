import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/requestStatus/requestItem", ["dataRequestItemNoGroup"])
  },
  methods: {
    async $_baseRequestSetItemMixin_getDataFromApi(searchObject = {}, isFirstCall) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const rSId = this.$route.params.requestSetId;
      const query = {
        idParams: {
          matterId,
          rSId
        },
        searchObject,
        isFirstCall
      };
      return this.getAllDataRequestItemNoGroupByRequest(query);
    },
    ...mapActions("ht_store/matter/requestStatus/requestItem", [
      "getAllDataRequestItemNoGroupByRequest"
    ])
  }
};
