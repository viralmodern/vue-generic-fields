<template>
  <v-dialog :value="true" width="1200" @input="cancel">
    <v-list style="height:100%">
      <v-row no-gutters>
        <v-col cols="9">
          <v-col cols="12">
            <CardDetailTitle
              :detailMembers="dataRequestDetail.members"
              :listMembers="members"
              :title="dataRequestDetail.name"
              :date="dataRequestDetail.deadline"
              @update="update"
            />
          </v-col>
          <div>
            <v-tabs grow class="px-1">
              <v-tab key="Request">Request</v-tab>
              <v-tab key="Instruction">instruction</v-tab>
              <v-tab key="Definition">definition</v-tab>
              <v-tab key="Task">task</v-tab>
              <v-tab key="Comment">comment</v-tab>
              <v-tab key="Notes">Notes</v-tab>
              <v-tab key="Attachment">Attachment</v-tab>
              <v-tab-item class="pa-3" key="Request">
                <RequestItem
                  v-if="Object.keys(dataRequestDetail).length"
                  :dataRequestDetail="dataRequestDetail"
                  :members="members"
                  :currentUser="currentUser"
                />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Instruction">
                <Instruction
                  v-if="Object.keys(dataRequestDetail).length"
                  :dataRequestDetail="dataRequestDetail"
                />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Definition">
                <Definition
                  v-if="Object.keys(dataRequestDetail).length"
                  :dataRequestDetail="dataRequestDetail"
                />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Task">
                <RequestTask
                  v-if="Object.keys(dataRequestDetail).length"
                  :dataRequestDetail="dataRequestDetail"
                />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Comment">
                <Comment
                  :members="members"
                  :comments="comments"
                  :totalComment="totalComment"
                  @pagingComment="getComment(page++ + 1)"
                  @sendComment="sendComments"
                />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Notes">
                <Notes
                  @create="addNotesRequest"
                  @edit="updateNotesRequest"
                  @remove="removeNotesRequest"
                  @paging="getDataNotes"
                  :notes="notes"
                  :totalPagination="totalPagination"
                  :matterId="Number($route.params.matter || $route.params.projectId)"
                  :rowId="Number($route.params.requestId)"
                  :dataRow="{deadline: null, members: null}"
                />
              </v-tab-item>
              <v-tab-item class="pa-3" key="Attachment">
                <ProjectAttachment
                  :dataAttachment="attachments"
                  @addFilesAttachment="addFiles"
                  @removeAttachment="removeAttachment"
                  @updateRateAttachment="updateRate"
                />
              </v-tab-item>
            </v-tabs>
          </div>
        </v-col>
        <v-col cols="3" style="border-left:1px solid #d8d5d5cf">
          <RightDetailCard :items="dataRequestDetail" @update="update" />
        </v-col>
      </v-row>
    </v-list>
  </v-dialog>
</template>

<script>
const pageSize = 20;
import { mapActions, mapGetters } from "vuex";
import CardDetailTitle from "./CardDetailTitle";
import RightDetailCard from "./RightDetailCard";
import Notes from "../common/Notes";
import ProjectAttachment from "../../../cards/ProjectAttachment";
import Comment from "../common/Comment";
import RequestItem from "./RequestItem";
import RequestTask from "./RequestTask";
import Instruction from "./Instruction";
import Definition from "./Definition";

export default {
  components: {
    CardDetailTitle,
    RightDetailCard,
    Notes,
    ProjectAttachment,
    Comment,
    RequestItem,
    RequestTask,
    Instruction,
    Definition
  },
  data() {
    return {
      page: 1
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestSets/detail", [
      "dataRequestDetail"
    ]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/matter/discovery/status/requestSets/notes", [
      "notes",
      "totalNotes"
    ]),
    ...mapGetters("ht_store/matter/discovery/status/requestSets/comments", [
      "comments",
      "totalComment"
    ]),
    ...mapGetters("ht_store/matter/discovery/status/requestSets/attachment", [
      "attachments"
    ]),
    ...mapGetters("ht_store/user", ["currentUser"]),
    totalPagination() {
      return Math.ceil((this.totalNotes / pageSize).toFixed(1)) || 1;
    }
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/status/requestSets/detail", [
      "getRequestSetDetail",
      "updateRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestSets/notes", [
      "getNotesRequestSets",
      "addNotesRequest",
      "removeNotesRequest",
      "updateNotesRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestSets/attachment", [
      "removeAttachmentRequest",
      "updateRateAttachmentRequest",
      "getAttachmentsRequestSets",
      "addAttachmentRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestSets/comments", [
      "getCommentRequestSets",
      "sendComment"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    update({ newValue, columnName }) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const rowId = this.$route.params.requestId;
      const dataRequest = {
        columnName,
        rowId,
        newValue,
        matterId,
        bodyRequest: {
          [columnName]: newValue
        }
      };
      this.updateRequest(dataRequest);
    },
    //Notes
    getDataNotes(page) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const rowId = this.$route.params.requestId;
      this.getNotesRequestSets({ matterId, rowId, page });
    },
    //Attachment
    getDataAttachment(params) {
      this.getAttachmentsRequestSets(params);
    },
    addFiles(files) {
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("files[" + i + "]", file);
      }
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        rowId: this.$route.params.requestId,
        formData
      };
      this.addAttachmentRequest(data);
    },
    removeAttachment(id) {
      const data = {
        request_set: this.$route.params.requestId,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        id
      };
      this.removeAttachmentRequest(data);
    },
    updateRate(id) {
      this.updateRateAttachmentRequest(id);
    },
    //comment
    getComment(page) {
      let matterId = this.$route.params.matter || this.$route.params.projectId;
      let rowId = this.$route.params.requestId;
      this.getCommentRequestSets({ matterId, rowId, page });
    },
    sendComments(text) {
      let matterId = this.$route.params.matter || this.$route.params.projectId;
      let rowId = this.$route.params.requestId;
      this.sendComment({ matterId, rowId, body: { text } });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const rowId = this.$route.params.requestId;
    this.getRequestSetDetail({ matterId, rowId });
    this.getDataMembersRequest({ matterId });
    this.getDataNotes(this.page);
    this.getDataAttachment({ matterId, rowId });
    this.getComment(this.page);
  }
};
</script>
