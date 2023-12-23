<template>
  <div>
    <v-list>
      <v-col cols="12">
        <CitationDetail :isShow="true" @cancel="close" />
      </v-col>
    </v-list>
  </div>
</template>
<script>
import CitationDetail from "../../ht_components/dialogs/CitationDetail";
import { mapActions } from "vuex";
export default {
  components: {
    CitationDetail
  },
  methods: {
    close() {
      this.$router.push({
        name: "citations",
        params: {
          ...this.$route.params
        }
      });
    },
    ...mapActions("ht_store/matter/citations/detail", ["getDataCitationDetailRequest"]),
    ...mapActions("ht_store/matter/citations/detail/checklist", [
      "getDataCheckListRequest"
    ]),
    ...mapActions("ht_store/matter/citations/detail/notes", ["getListNoteRequest"]),
    ...mapActions("ht_store/matter/citations/detail/comment", [
      "getDataCommentMessagesRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    ...mapActions("ht_store/matter/citations/detail/tag", ["getDataTagsRequest"])
  },
  mounted() {
    this.getDataCitationDetailRequest();
    this.getDataCharacterRequest();
    this.getDataMembersRequest({ matterId: this.$route.params.matter || this.$route.params.projectId });
    this.getDataCommentMessagesRequest();
    this.getDataCheckListRequest();
    this.getListNoteRequest();
    this.getDataTagsRequest();
  }
};
</script>
