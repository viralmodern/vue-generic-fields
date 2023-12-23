<template>
  <InjuryDetail :isShow="true" @cancel="close"/>
</template>

<script>
import { mapActions } from "vuex";
import InjuryDetail from "../../../ht_components/dialogs/InjuryDetail";
export default {
  components: {
    InjuryDetail
  },
  methods: {
    close() {
      this.$router.push({
        name: "MedWarPartientInjury",
        params: {
          ...this.$route.params
        }
      });
    },
    ...mapActions("ht_store/matter/partient/injury/detail", [
      "getDataInjuryDetailRequest"
    ]),
    ...mapActions("ht_store/matter/partient/injury/detail/checklist", [
      "getDataCheckListRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/partient/damage", [
      "getDataDamageNegligenceRequest"
    ]),
    ...mapActions("ht_store/matter/partient/injury/label", [
      "getDataInjuryNegligenceLabelRequest"
    ]),
    ...mapActions("ht_store/matter/partient/damage/label", [
      "getDataDamageNegligenceLabelRequest"
    ]),
  },
  mounted() {
    this.getDataInjuryDetailRequest();
    this.getDataCharacterRequest();
    this.getDataMembersRequest({matterId: this.$route.params.matter || this.$route.params.projectId});
    this.getDataCheckListRequest();
    this.getDataDamageNegligenceRequest();
    this.getDataDamageNegligenceLabelRequest();
  }
};
</script>
