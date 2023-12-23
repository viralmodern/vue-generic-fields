import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("ht_store/matter/riskSource", ["dataRiskSource"])
  },
  methods: {
    ...mapActions("ht_store/matter/riskSource", [
      "getDataRiskSourceRequest",
      "addRiskSourceRequest",
      "updateRiskSourceRequest",
      "removeRiskSourceRequest"
    ])
  }
};
