import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/privilege", ["dataPrivilege"])
  },
  methods: {
    async $_basePrivilegeLogMixin_getDataFromApi(searchObject = {}, isFirstCall) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const query = {
        idParams: {
          matterId
        },
        searchObject,
        isFirstCall
      };
      return this.getDataPrivilegeRequest(query);
    },
    ...mapActions("ht_store/matter/privilege", ["getDataPrivilegeRequest"])
  }
};
