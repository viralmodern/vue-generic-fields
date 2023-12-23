<template>
  <td>
    <a
      href="#"
      @click="showDialog=true"
    >{{ dataRow.attachment || 0 }} attachment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <ProjectAttachment
            :dataAttachment="attachments"
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
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProjectAttachment from "../../cards/ProjectAttachment";

export default {
  components: {
    ProjectAttachment
  },
  data() {
    return {
      showDialog: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    async addFiles(files) {

      let id = Math.random();

      const result = await this.createAttachmentRequest({files});
      if (result) {
        const dataPost = {
          taskId: this.dataRow.id,
          columnName: this.column.name,
          newValue: id,
          type: "add"
        };
        this.updateTask(dataPost);
      }
    },
    async remove(id) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: id,
        type: "remove"
      };
      this.updateTask(data);
    },
    updateRate(id) {
      this.updateRateAttachment(id);
    },
    ...mapActions("ht_store/matter/attachment", [
      "createAttachmentRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/evidences", ["updateTask"]),
    ...mapMutations("ht_store/matter/attachment", ["updateRateAttachment"])
  },
  computed: {
    ...mapGetters("ht_store/matter/attachment", ["attachments"])
  }
};
</script>
