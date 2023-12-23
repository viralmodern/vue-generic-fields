import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/risk/register", ["dataAllRiskNoGroup"])
  },
  methods: {
    async $_baseRiskMixin_getDataFromApi(searchObject = {}, isFirstCall) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const query = {
        idParams: {
          matterId,
        },
        searchObject,
        isFirstCall
      };
      return this.getAllDataRiskNoGroupRequest(query);
    },
    ...mapActions("ht_store/matter/risk/register", ["getAllDataRiskNoGroupRequest"])
  }
};
