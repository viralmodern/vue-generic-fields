import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/requestStatus/requestSet", ["dataList"])
  },
  methods: {
    async $_baseRequestSetMixin_getDataFromApi(searchObject = {}, isFirstCall) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const query = {
        idParams: {
          matterId
        },
        searchObject,
        isFirstCall
      };
      return this.getDataFromApi(query);
    },
    ...mapActions("ht_store/matter/requestStatus/requestSet", [
      "getDataFromApi"
    ])
  }
};
