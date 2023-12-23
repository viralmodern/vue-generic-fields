<template>
  <MedWarDetail :isShow="true" @cancel="close"/>
</template>

<script>
import { mapActions } from "vuex";
import MedWarDetail from "../../../ht_components/dialogs/MedWarDetail";
export default {
  components: {
    MedWarDetail
  },
  methods: {
    close() {
      this.$router.push({
        name: "MedWarPartient",
        params: {
          ...this.$route.params
        }
      });
    },
    ...mapActions("ht_store/matter/partient/negligence/detail", [
      "getDataNegligenceDetailRequest"
    ]),
    ...mapActions("ht_store/matter/partient/negligence/detail/checklist", [
      "getDataCheckListRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/partient/damage", [
      "getDataDamageNegligenceRequest"
    ]),
    ...mapActions("ht_store/matter/partient/injury", [
      "getDataInjuryNegligenceRequest"
    ]),
    ...mapActions("ht_store/matter/partient/injury/label", [
      "getDataInjuryNegligenceLabelRequest"
    ]),
    ...mapActions("ht_store/matter/partient/damage/label", [
      "getDataDamageNegligenceLabelRequest"
    ]),
  },
  mounted() {
    this.getDataNegligenceDetailRequest();
    this.getDataCharacterRequest();
    this.getDataMembersRequest({matterId: this.$route.params.matter || this.$route.params.projectId});
    this.getDataCheckListRequest();
    this.getDataDamageNegligenceRequest();
    this.getDataInjuryNegligenceRequest();
    this.getDataInjuryNegligenceLabelRequest();
    this.getDataDamageNegligenceLabelRequest();
  }
};
</script>
