import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/clients", ["dataClientsNoGroup"])
  },
  methods: {
    async $_baseClientMixin_getDataFromApi(searchObject = {}, isFirstCall) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const query = {
        idParams: {
          matterId
        },
        searchObject,
        isFirstCall
      };
      return this.getDataClientsRequest(query);
    },
    ...mapActions("ht_store/clients", ["getDataClientsRequest"])
  }
};
