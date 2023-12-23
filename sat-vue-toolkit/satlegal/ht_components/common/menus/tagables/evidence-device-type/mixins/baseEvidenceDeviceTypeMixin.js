import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("ht_store/matter/evidenceDeviceType", ["dataEvidenceDeviceType"])
  },
  methods: {
    ...mapActions("ht_store/matter/evidenceDeviceType", [
      "getDataEvidenceDeviceTypeRequest",
      "addEvidenceDeviceTypeRequest",
      "updateEvidenceDeviceTypeRequest",
      "removeEvidenceDeviceTypeRequest"
    ])
  }
};
