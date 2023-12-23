import { mapActions, mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/evidences", ["dataEvidences"])
  },
  methods: {
    async $_baseEvidenceMixin_getDataFromApi(searchObject) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const query = {
        matterId,
        page: 1,
        ...searchObject
      };
      return this.getEvidencesFromApi(query);
    },
    ...mapActions("ht_store/matter/evidences", ["getEvidencesFromApi"])
  }
};
