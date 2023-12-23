<template>
  <PracticeDetail :isShow="true" @cancel="close"/>
</template>

<script>
import { mapActions } from "vuex";
import PracticeDetail from "../../../ht_components/dialogs/PracticeDetail";
export default {
  components: {
    PracticeDetail
  },
  methods: {
    close() {
      this.$router.push({
        name: "MedWarPractice",
        params: {
          ...this.$route.params
        }
      });
    },
    ...mapActions("ht_store/matter/partient/practice/detail", [
      "getDataPracticeDetailRequest"
    ]),
    ...mapActions("ht_store/matter/partient/practice/detail/checklist", [
      "getDataCheckListRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),

    ...mapActions("ht_store/matter/partient/injury", ["getDataInjuryNegligenceRequest"]),
    ...mapActions("ht_store/matter/partient/injury/label", [
      "getDataInjuryNegligenceLabelRequest"
    ])
  },
  mounted() {
    this.getDataPracticeDetailRequest();
    this.getDataCharacterRequest();
    this.getDataMembersRequest({matterId: this.$route.params.matter || this.$route.params.projectId});
    this.getDataCheckListRequest();
    this.getDataInjuryNegligenceRequest();
    this.getDataInjuryNegligenceLabelRequest();
  }
};
</script>
