<template>
  <td>
    <a href="#" @click="getAttachment">{{dataRow[column.name]}} attachments(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <ProjectAttachment
            :dataAttachment="dataAttachment"
            @addFilesAttachment="addFiles"
            @removeAttachment="remove"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import ProjectAttachment from "../../../../cards/ProjectAttachment";

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
  computed: {
    ...mapGetters("ht_store/matter/discovery/status/requestItem/attachment", [
      "dataAttachment"
    ])
  },
  methods: {
    getAttachment() {
      this.showDialog = true;
      this.getDataAttachmentRequest();
    },
    async addFiles(files) {
      const data = files.map(x => ({
        id: Math.random(),
        coverPhoto: {
          imageUrl: x.dataURL
        },
        rate: false,
        name: x.name,
        createAt: new Date().toISOString()
      }));
      const result = await this.addAttachmentRequest(data);
      if (result) {
        this.$emit("update", this.dataRow[this.column.name] + data.length);
      }
    },
    async remove(id) {
      const result = await this.removeAttachmentRequest(id);
      if (result) {
        this.$emit("update", this.dataRow[this.column.name] - 1);
      }
    },
    ...mapActions("ht_store/matter/discovery/status/requestItem/attachment", [
      "getDataAttachmentRequest",
      "addAttachmentRequest",
      "removeAttachmentRequest"
    ]),
  }
};
</script>
