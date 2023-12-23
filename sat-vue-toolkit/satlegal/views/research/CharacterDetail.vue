<template>
  <v-row no-gutters>
    <ProfileDetail  />
    <TabProfileUser />
    <router-view></router-view>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import ProfileDetail from "../../ht_components/research/characters/ProfileDetail";
import TabProfileUser from "../../ht_components/toolbars/TabProfileUser";
export default {
  components: {
    ProfileDetail,
    TabProfileUser
  },
  methods: {
    ...mapActions("ht_store/matter/character/characterProfile", [
      "getDataProfileCharacter"
    ]),
    ...mapActions("ht_store/matter/character/characterProfile/goal", [
      "getDataCharacterGoalRequest"
    ]),
    ...mapActions("ht_store/matter/character/characterProfile/goal/label", [
      "getDataGoalLabelRequest"
    ]),
    ...mapActions("ht_store/matter/character/characterProfile/about", [
      "getDataAboutRequest"
    ]),
    ...mapActions("ht_store/matter/character/characterProfile/notes", [
      "getDataNotesRequest"
    ]),
    ...mapActions("ht_store/matter/character/characterProfile/document", [
      "getDataDocumentRequest"
    ]),
    ...mapActions("ht_store/matter/character/characterProfile/credibilities", [
      "getDataCredibilitiesRequest"
    ])
  },
  mounted() {
    const { projectId, characterId } = this.$route.params;
    this.getDataProfileCharacter();
    this.getDataCharacterGoalRequest();
    this.getDataGoalLabelRequest();
    this.getDataAboutRequest();
    this.getDataNotesRequest({ matterId: projectId, characterId, page: 1 });
    this.getDataDocumentRequest();
    this.getDataCredibilitiesRequest();
  }
};
</script>
