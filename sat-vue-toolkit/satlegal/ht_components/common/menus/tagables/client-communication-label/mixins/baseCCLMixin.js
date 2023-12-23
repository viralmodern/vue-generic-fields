import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("ht_store/workspace/communicationLabel", ["dataCommunicationLabel"])
  },
  methods: {
    ...mapActions("ht_store/workspace/communicationLabel", [
      "getDataCommunicationLabelRequest",
      "addCommunicationLabelRequest",
      "updateCommunicationLabelRequest",
      "removeCommunicationLabelRequest"
    ])
  }
};
