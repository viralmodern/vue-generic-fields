<template>
  <!-- <v-list class="fill-height"> -->
    <v-col cols="12" class="mt-1">
      <v-row no-gutters>
        <v-col cols="3">
          <ProfileLeftMenu />
        </v-col>
        <v-col cols="9">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-col>
  <!-- </v-list> -->
</template>
<script>
import { mapActions } from "vuex";
import ProfileLeftMenu from "../../ht_components/partient/profile/ProfileLeftMenu";
export default {
  components: {
    ProfileLeftMenu
  },
  methods: {
    ...mapActions("ht_store/workspace/member", ["getDataMemberRequest"]),
    ...mapActions("ht_store/matter/citations", ["getDataCitationsFromApi"]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/matter/briefcase/docket", ["getDataDocketRequest"]),
    ...mapActions("ht_store/matter/discovery/toolbox", ["getDataToolboxRequest"]),
    ...mapActions("ht_store/project/research/facts", ["getDataFactsResearchRequest"]),
    ...mapActions("ht_store/matter/discovery/evidences", ["getDataDiscoveryEvidences"]),
    ...mapActions("ht_store/matter/discovery/log", ["getDataDiscoveryLogRequest"]),
    ...mapActions("ht_store/matter/discovery/index", ["getDataIndexDiscovery"]),
    ...mapActions("ht_store/matter/hearing", ["getDataMatterHearingRequest"]),
    ...mapActions("ht_store/document/all", ["getDocumentAllRequest"])
  },
  mounted() {
    this.getDataMemberRequest();
    this.getDataCitationsFromApi();
    this.getDataCharacterRequest();
    this.getDataDocketRequest();
    this.getDataToolboxRequest();
    this.getDataFactsResearchRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      page: 1
    });
    this.getDataDiscoveryEvidences();
    this.getDataDiscoveryLogRequest();
    this.getDataIndexDiscovery();
    this.getDataMatterHearingRequest();
    this.getDocumentAllRequest(1);
  }
};
</script>
