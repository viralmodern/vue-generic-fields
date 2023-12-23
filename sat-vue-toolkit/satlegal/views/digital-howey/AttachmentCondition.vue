<template>
  <div>
    <ProjectAttachment
      :dataAttachment="dataAttachment"
      @addFilesAttachment="addFiles"
      @removeAttachment="remove"
      @updateRateAttachment="updateRate"
    />
  </div>
</template>
<script>
import ProjectAttachment from "../../ht_components/cards/ProjectAttachment";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    ProjectAttachment
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
      await this.uploadAttachmentRequest(data);
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
    ...mapActions("ht_store/matter/digitalHowey/condition/attachment", [
      "uploadAttachmentRequest",
      "removeAttachmentRequest",
      "updateRateAttachmentRequest"
    ])
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHowey/condition/attachment", [
      "dataAttachment"
    ])
  }
};
</script>
