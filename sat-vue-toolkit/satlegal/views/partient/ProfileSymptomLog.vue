<template>
  <div>
    <div>
      <ProfileSymptomHeader class="px-2"/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ProfileSymptomHeader from "../../ht_components/partient/profile/symptom-log/ProfileSymptomHeader";
export default {
  components: {
    ProfileSymptomHeader
  },
  methods: {
    ...mapActions("ht_store/matter/partient/profile/detail/symptomLog", [
      "getDataSymptomLogRequest"
    ]),
    ...mapActions("ht_store/matter/partient/profile/tag", ["getDataTagsRequest"]),
    ...mapActions("ht_store/matter/citations", ["getDataCitationsFromApi"]),
    ...mapActions("ht_store/project/research/facts", ["getDataFactsResearchRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"])
  },
  mounted() {
    this.getDataSymptomLogRequest();
    this.getDataCitationsFromApi();
    this.getDataCharacterRequest();
    this.getDataFactsResearchRequest({matterId: this.$route.params.matter || this.$route.params.projectId, page: 1});
    this.getDataTagsRequest();
  }
};
</script>
