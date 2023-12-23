import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("ht_store/matter/tag", ["dataTag"])
  },
  methods: {
    ...mapActions("ht_store/matter/tag", [
      "getDataTagRequest",
      "addTagRequest",
      "updateTagRequest",
      "removeTagRequest"
    ])
  }
};
