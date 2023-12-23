<template>
  <EvidencesCard :isShow="true" @cancel="close"/>
</template>

<script>
import { mapActions } from "vuex";
import EvidencesCard from "../../ht_components/dialogs/EvidencesCard";
export default {
  components: {
    EvidencesCard
  },
  methods: {
    close() {
      this.$router.push({
        name: "evidences",
        params: {
          ...this.$route.params
        }
      });
    },
    ...mapActions("ht_store/matter/discovery/evidences/detail", [
      "getDataEvidencesDetailRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/evidences/detail/checklist", [
      "getDataCheckListRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/evidences/detail/note", [
      "getListNoteRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/evidences/detail/comment", [
      "getDataCommentMessagesRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/discovery/evidences/detail/tag", [
      "getDataTagsRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/evidences", ["getDataDiscoveryEvidences"]),
    ...mapActions("ht_store/project/research/facts", ["getDataFactsResearchRequest"]),
    ...mapActions("ht_store/matter/discovery/evidences/detail/attachment", [
      "getDataAttachmentRequest"
    ])
  },
  mounted() {
    this.getDataEvidencesDetailRequest(this.$route.params.evidenceId);
    this.getListNoteRequest();
    this.getDataCommentMessagesRequest();
    this.getDataCharacterRequest();
    this.getDataCheckListRequest();
    this.getDataMembersRequest({matterId: this.$route.params.matter || this.$route.params.projectId});
    this.getDataTagsRequest();
    this.getDataDiscoveryEvidences();
    this.getDataFactsResearchRequest({matterId: this.$route.params.matter || this.$route.params.projectId, page: 1});
    this.getDataAttachmentRequest();
  }
};
</script>
