import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("ht_store/matter/labelDocument", ["dataDocumentLabel"])
  },
  methods: {
    ...mapActions("ht_store/matter/labelDocument", [
      "getDataDocumentLabelRequest",
      "addDocumentLabelRequest",
      "updateDocumentLabelRequest",
      "removeDocumentLabelRequest"
    ])
  }
};
