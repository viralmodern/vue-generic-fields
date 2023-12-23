import { mapActions, mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("ht_store/matter/riskAreas", ["dataRiskArea"])
  },
  methods: {
    ...mapActions("ht_store/matter/riskAreas", [
      "getDataRiskAreaRequest",
      "addRiskAreaRequest",
      "updateRiskAreaRequest",
      "removeRiskAreaRequest"
    ])
  }
};
