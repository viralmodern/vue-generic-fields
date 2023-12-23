import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("ht_store/matter/issues", ["dataIssues"])
  },
  methods: {
    ...mapActions("ht_store/matter/issues", [
      "getDataIssuesRequest",
      "addIssuesRequest",
      "updateIssuesRequest",
      "removeIssuesRequest"
    ])
  }
};
