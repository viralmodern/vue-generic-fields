import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/deposition", ["dataDepositionNoGroup"])
  },
  methods: {
    async $_baseDepositionMixin_getDataFromApi(searchObject = {}, isFirstCall) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const query = {
        idParams: {
          matterId
        },
        searchObject,
        isFirstCall
      };
      return this.getDataDepositionRequest(query);
    },
    ...mapActions("ht_store/matter/deposition", ["getDataDepositionRequest"])
  }
};
