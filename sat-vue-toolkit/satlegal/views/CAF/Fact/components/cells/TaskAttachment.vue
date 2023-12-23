<template>
  <td>
    <a href="#" @click="show">{{total_attachments}} attachment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <ProjectAttachment
            :dataAttachment="dataAttachment"
            @addFilesAttachment="addFiles"
            @removeAttachment="remove"
            @updateRateAttachment="updateRate"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProjectAttachment from "../../../../components/cards/ProjectAttachment";

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
  methods: {
    show() {
      this.showDialog = true;
      this.getFactAttachment({
        matterId: this.$route.params.matter || this.$route.params.projectId,
        taskId: this.dataRow.id
      });
    },
    addFiles(files) {
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("files[" + i + "]", file);
      }
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        taskId: this.dataRow.id,
        formData
      };
      this.createFactAttachment(data);
      this.total_attachments = this.total_attachments + files.length;
    },
    remove(id) {
      const req = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        taskId: this.dataRow.id,
        attachmentId: id
      };
      this.removeFactAttachment(req);
      this.total_attachments = this.total_attachments - 1;
    },
    updateRate(id) {
      return id;
    },
    ...mapActions("ht_store/project/research/facts", [
      "createFactAttachment",
      "removeFactAttachment",
      "getFactAttachment"
    ])
  },
  computed: {
    ...mapGetters("ht_store/project/research/facts", ["dataAttachment"])
  },
  mounted() {
    this.total_attachments = this.dataRow.attachment || 0;
  }
};
</script>
