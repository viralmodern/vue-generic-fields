<template>
  <td>
    <a href="#" @click="showModal">{{total_attachments}} attachment(s)</a>
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
  components: {
    ProjectAttachment
  },
  data() {
    return {
      showDialog: false,
      total_attachments: 0
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  mounted() {
    this.total_attachments = this.dataRow.total_attachments || 0;
  },
  methods: {
    getDataAttachment() {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      this.getAttachmentsRequestSets({ matterId, rowId: this.dataRow.pk });
    },
    showModal() {
      this.showDialog = true;
      this.getDataAttachment();
    },
    addFiles(files) {
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("files[" + i + "]", file);
      }
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        rowId: this.dataRow.pk,
        formData
      };
      this.addAttachmentRequest(data);
      this.total_attachments = this.total_attachments + files.length;
    },
    removeAttachment(id) {
      const data = {
        request_set: this.dataRow.pk,
        matterId: this.$route.params.matter || this.$route.params.projectId,
        id
      };
      this.removeAttachmentRequest(data);
      this.total_attachments = this.total_attachments - 1;
    },
    updateRate(id) {
      this.updateRateAttachmentRequest(id);
    },
    ...mapActions("ht_store/matter/discovery/status/requestSets/attachment", [
      "removeAttachmentRequest",
      "updateRateAttachmentRequest",
      "getAttachmentsRequestSets",
      "addAttachmentRequest"
    ])
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestSets/attachment", [
      "attachments"
    ])
  }
};
</script>
