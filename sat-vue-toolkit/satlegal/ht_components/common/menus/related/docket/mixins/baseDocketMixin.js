import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/docket", ["dataDocketNoGroup"])
  },
  methods: {
    async $_baseDocketMixin_getDataFromApi(searchObject = {}) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const query = {
        idParams: {
          matterId,
        },
        searchObject,
      };
      return this.getDataDocketNoGroupRequest(query);
    },
    ...mapActions("ht_store/matter/docket", ["getDataDocketNoGroupRequest"])
  }
};
