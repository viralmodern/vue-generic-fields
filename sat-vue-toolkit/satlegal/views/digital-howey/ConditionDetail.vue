<template>
  <ConditionDetail :isShow="true" @cancel="close"/>
</template>
<script>
import { mapActions } from "vuex";
import ConditionDetail from "../../ht_components/dialogs/ConditionDetail";
export default {
  components: {
    ConditionDetail
  },
  methods: {
    close() {
      this.$router.push({
        name: "DigitalHoweyChecklist",
        params: {
          ...this.$route.params
        }
      });
    },
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  mounted() {
    this.getDataCharacterRequest();
    this.getDataMembersRequest({matterId: this.$route.params.matter || this.$route.params.projectId});
  }
};
</script>
