<template>
  <IndexCardIndex :isShow="true" @cancel="close"/>
</template>

<script>
import { mapActions } from "vuex";
import IndexCardIndex from "../../ht_components/dialogs/IndexCardIndex";
export default {
  components: {
    IndexCardIndex
  },
  methods: {
    close() {
      this.$router.push({
        name: "discovery-index",
        params: {
          ...this.$route.params
        }
      });
    },
    ...mapActions("ht_store/matter/linkedCharacter", ["getDataLinkedCharacter"]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/project/research/facts", ["getDataFactsResearchRequest"]),
    ...mapActions("ht_store/matter/discovery/index/detailIndex/tag", [
      "getDataTagsRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/index/detailIndex/checklist", [
      "getDataCheckListRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/index/detailIndex/note", [
      "getListNoteRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/index/detailIndex/comment", [
      "getDataCommentMessagesRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/index/detailIndex", ["getDataIndexDetail"]),
    ...mapActions("ht_store/matter/discovery/index/detailIndex/attachment", [
      "getDataAttachmentRequest"
    ])
  },
  mounted() {
    this.getListNoteRequest();
    this.getDataCommentMessagesRequest();
    this.getDataCharacterRequest();
    this.getDataCheckListRequest();
    this.getDataMembersRequest({matterId: this.$route.params.matter || this.$route.params.projectId});
    this.getDataTagsRequest();
    this.getDataIndexDetail(this.$route.params.indexId);
    this.getDataFactsResearchRequest({matterId: this.$route.params.matter || this.$route.params.projectId, page: 1});
    this.getDataAttachmentRequest();
  }
};
</script>
