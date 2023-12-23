<template>
  <v-dialog :value="true" width="1000" @input="cancel">
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
              <v-tab key="Comment">comment</v-tab>
              <v-tab key="Notes">Notes</v-tab>
              <v-tab key="Attachment">Attachment</v-tab>
              <v-tab key="Current">Current Expense (10) </v-tab>
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
                  @create="addNote"
                  @edit="editNote"
                  @remove="removeNote"
                  @paging="getDataNotes"
                  :notes="notes"
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
              <v-tab-item class="pa-3" key="Current">
                <CurentExpense/>
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
import { mapActions, mapGetters } from "vuex";
import CardDetailTitle from "./CardDetailTitle";
import RightDetailCard from "./RightDetailCard";
import Notes from "../../request-set/common/Notes";
import ProjectAttachment from "../../../cards/ProjectAttachment";
import Comment from "../../request-set/common/Comment";
import CurentExpense from "../CurentExpense/TableCurentExpense"

export default {
  components: {
    CardDetailTitle,
    RightDetailCard,
    Notes,
    ProjectAttachment,
    Comment,
    CurentExpense
  },
  data() {
    return {
      page: 1
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestTask/detail", [
      "dataRequestDetail"
    ]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/matter/discovery/status/requestTask/detail/notes", [
      "notes",
      "totalNotes"
    ]),
    ...mapGetters("ht_store/matter/discovery/status/requestTask/detail/comments", [
      "comments",
      "totalComment"
    ]),
    ...mapGetters("ht_store/matter/discovery/status/requestTask/detail/attachment", [
      "attachments"
    ]),
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/status/requestTask/detail", [
      "getRequestTaskDetailRequest",
      "updateRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestTask/detail/notes", [
      "getNotesRequestTask",
      "addNotesRequest",
      "removeNotesRequest",
      "updateNotesRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestTask/detail/attachment", [
      "removeAttachmentRequest",
      "updateRateAttachmentRequest",
      "getAttachmentsRequestTask",
      "addAttachmentRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/status/requestTask/detail/comments", [
      "getCommentRequestTask",
      "sendComment"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"]),
    update({ newValue, columnName }) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const rowId = this.$route.params.requestId;
      const taskId = this.$route.params.taskId;
      const dataRequest = {
        columnName,
        rowId,
        newValue,
        matterId,
        taskId,
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
      const taskId = this.$route.params.taskId;
      this.getNotesRequestTask({ matterId, taskId, rowId, page });
    },
    addNote(data) {
      const taskId = this.$route.params.taskId;
      this.addNotesRequest({ ...data, taskId: taskId });
    },
    editNote(data) {
      const taskId = this.$route.params.taskId;
      this.updateNotesRequest({ ...data, taskId: taskId });
    },
    removeNote(data) {
      const taskId = this.$route.params.taskId;
      this.removeNotesRequest({ ...data, taskId: taskId });
    },
    //attachment
    addFiles(files) {
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("files[" + i + "]", file);
      }
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        rowId: this.$route.params.requestId,
        taskId: this.$route.params.taskId,
        formData
      };
      this.addAttachmentRequest(data);
    },
    removeAttachment(id) {
      const data = {
        rowId: this.$route.params.requestId,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        taskId: this.$route.params.taskId,
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
      const taskId = this.$route.params.taskId;
      this.getCommentRequestTask({ matterId, taskId, rowId, page });
    },
    sendComments(text) {
      let matterId = this.$route.params.matter || this.$route.params.projectId;
      let rowId = this.$route.params.requestId;
      const taskId = this.$route.params.taskId;
      this.sendComment({ matterId, rowId, taskId, body: { text } });
    },
    cancel() {
      this.$router.go(-1);
    }
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const rowId = this.$route.params.requestId;
    const taskId = this.$route.params.taskId;
    this.getRequestTaskDetailRequest({ matterId, rowId, taskId });
    this.getDataMembersRequest({ matterId });
    this.getDataNotes(this.page);
    this.getAttachmentsRequestTask({ matterId, rowId, taskId });
    this.getComment(this.page);
  }
};
</script>
