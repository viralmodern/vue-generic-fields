<template>
  <IssueCard :isShow="true" @cancel="close"/>
</template>

<script>
import { mapActions } from "vuex";
import IssueCard from "../../ht_components/dialogs/IssueCard";
export default {
  components: {
    IssueCard
  },
  methods: {
    close() {
      this.$router.push({
        name: "citations"
      });
    },
    ...mapActions("ht_store/matter/citations/citationsIssue/detail/checklist", [
      "getDataCheckListRequest"
    ]),
    ...mapActions("ht_store/matter/citations/citationsIssue/detail/note", [
      "getListNoteRequest"
    ]),
    ...mapActions("ht_store/matter/citations/citationsIssue/detail/comment", [
      "getDataCommentMessagesRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/citations/ruleOfLaw", ["getDataRuleOfLawRequest"]),
    ...mapActions("ht_store/project/research/facts", ["getDataFactsResearchRequest"]),
    ...mapActions("ht_store/matter/citations/citationsIssue/detail/attachment", [
      "getDataAttachmentRequest"
    ]),
    ...mapActions("ht_store/matter/citations/citationsIssue/detail", ["getDataIssueDetailRequest"])
  },
  mounted() {
    this.getListNoteRequest();
    this.getDataCommentMessagesRequest();
    this.getDataCharacterRequest();
    this.getDataCheckListRequest();
    this.getDataMembersRequest({matterId: this.$route.params.matter || this.$route.params.projectId});
    this.getDataRuleOfLawRequest();
    this.getDataFactsResearchRequest({matterId: this.$route.params.matter || this.$route.params.projectId, page: 1});
    this.getDataAttachmentRequest();
    this.getDataIssueDetailRequest();
  }
};
</script>
