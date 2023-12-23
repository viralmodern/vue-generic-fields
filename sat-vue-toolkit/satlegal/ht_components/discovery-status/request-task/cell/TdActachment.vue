<template>
  <td>
    <a href="#" @click="showAttachment(page)">0 attachment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <ProjectAttachment
            :dataAttachment="attachments"
            @addFilesAttachment="addFiles"
            @removeAttachment="removeAttachment"
            @updateRateAttachment="updateRate"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProjectAttachment from "../../../cards/ProjectAttachment";

export default {
  data() {
    return {
      showDialog: false,
      page: 1
    };
  },
  components: {
    ProjectAttachment
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestTask/detail/attachment", [
      "attachments"
    ])
  },
  methods: {
    showAttachment() {
      this.showDialog = true;
      let matterId = this.$route.params.matter || this.$route.params.projectId;
      let rowId = this.dataRow.request_set;
      let taskId = this.dataRow.pk;
      this.getAttachmentsRequestTask({ matterId, rowId, taskId });
    },
    async addFiles(files) {
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("files[" + i + "]", file);
      }
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        rowId: this.dataRow.request_set,
        taskId: this.dataRow.pk,
        formData
      };
      const result = this.addAttachmentRequest(data);
      if(result){
        this.$emit("update", this.dataRow[this.column.name] + 1);
      }
    },
    removeAttachment(id) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        rowId: this.dataRow.request_set,
        taskId: this.dataRow.pk,
        id
      };
      this.removeAttachmentRequest(data);
    },
    updateRate(id) {
      this.updateRateAttachmentRequest(id);
    },
    ...mapActions("ht_store/matter/discovery/status/requestTask/detail/attachment", [
      "removeAttachmentRequest",
      "updateRateAttachmentRequest",
      "getAttachmentsRequestTask",
      "addAttachmentRequest"
    ])
  }
};
</script>
