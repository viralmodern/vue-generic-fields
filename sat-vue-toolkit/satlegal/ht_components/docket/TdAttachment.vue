<template>
  <td>
    <a href="#" @click="showDialog=true">{{dataRow.attachment.length}} attachment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <ProjectAttachment
            :dataAttachment="getAttachment"
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
import ProjectAttachment from "../cards/ProjectAttachment";

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
      const data = {
        files: files.map(x => ({
          id: id,
          coverPhoto: {
            imageUrl: x.dataURL
          },
          rate: false,
          name: x.name,
          createAt: new Date().toISOString()
        }))
      };
      const result = await this.uploadAttachmentRequest(data);
      if (result) {
        const data = {
          taskId: this.dataRow.id,
          columnName: this.column.name,
          value: id,
        };
        this.$emit("addAtachment", data);
      }
    },
    async remove(id) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: id
      };
      this.removeAttachmentRequest(data);
    },
    updateRate(id) {
      this.updateRateAttachmentRequest(id);
    },
    ...mapActions("ht_store/matter/briefcase/docket/attachment", [
      "uploadAttachmentRequest",
      "getDataAttachmentRequest",
      "removeAttachmentRequest",
      "updateRateAttachmentRequest"
    ]),
  },
  mounted() {
    this.getDataAttachmentRequest();
  },
  computed: {
    getAttachment() {
      return this.dataAttachment.filter(x => {
        return this.dataRow.attachment.includes(x.id);
      });
    },
    ...mapGetters("ht_store/matter/briefcase/docket/attachment", ["dataAttachment"])
  }
};
</script>
