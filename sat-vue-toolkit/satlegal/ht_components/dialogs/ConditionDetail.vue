<template>
  <v-dialog :value="isShow" width="1000" @input="$emit('cancel')">
    <v-list style="height:100%">
      <v-row no-gutters class="pa-2">
        <h3>Description</h3>
        <div class="pa-2">
          <v-textarea
            hide-details
            auto-grow
            :value="dataCondition.description"
            @change="editDescriptionRequest($event)"
            class="ma-0 pa-2 custom-text-field fieldDes"
            rows="1"
          ></v-textarea>
        </div>
        <div class="pa-2">
          <ConditionTable />
        </div>
        <div class="pa-2">
          <span class="title py-2">Attachments</span>
          <AttachmentCondition />
        </div>
        <div class="pa-2">
          <span class="title py-2">Notes</span>
          <NoteCondition />
        </div>
        <div class="pa-2">
          <span class="title py-2">Comments</span>
          <CommentCondition />
        </div>
      </v-row>
    </v-list>
  </v-dialog>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import ConditionTable from "../../views/digital-howey/ConditionTable";
import AttachmentCondition from "../../views/digital-howey/AttachmentCondition";
import NoteCondition from "../../views/digital-howey/NoteCondition";
import CommentCondition from "../../views/digital-howey/CommentCondition";
export default {
  props: {
    isShow: Boolean
  },
  methods: {
    ...mapActions("ht_store/matter/digitalHowey/condition", [
      "getDatadataConditionRequest",
      "editDescriptionRequest",
      "addAttachmentRequest"
    ]),
    ...mapActions("ht_store/matter/digitalHowey/condition/attachment", [
      "getDataAttachmentRequest"
    ]),
    ...mapActions("ht_store/matter/digitalHowey/condition/note", ["getListNoteRequest"]),
    ...mapActions("ht_store/matter/digitalHowey/condition/comment", [
      "getDataCommentMessagesRequest"
    ]),
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"])
  },
  components: {
    ConditionTable,
    AttachmentCondition,
    NoteCondition,
    CommentCondition
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHowey/condition", ["dataCondition"])
  },
  mounted() {
    this.getDatadataConditionRequest();
    this.getDataCharacterRequest();
    this.getDataAttachmentRequest();
    this.getListNoteRequest();
    this.getDataCommentMessagesRequest();
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.fieldDes {
  background: #eceff1;
}
.theme--dark.fieldDes {
  background: #909090;
}
</style>
