import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/deposition/exhibitSlickgrid", ["dataExhibitNoGroup"])
  },
  methods: {
    async $_baseExhibitMixin_getDataFromApi(searchObject = {}, isFirstCall) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const depositionId = this.$route.params.depositionId;
      const query = {
        idParams: {
          matterId,
          depositionId,
        },
        searchObject,
        isFirstCall
      };
      return this.getDataKeyExhibitRequest(query);
    },
    ...mapActions("ht_store/matter/deposition/exhibitSlickgrid", ["getDataKeyExhibitRequest"])
  }
};
