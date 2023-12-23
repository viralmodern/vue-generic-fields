

<template>
  <div>
    <ProjectAttachment
      :dataAttachment="item.attachment"
      @addFilesAttachment="uploadAttachment"
      @removeAttachment="removeAttachment"
      @updateRateAttachment="updateRateAttachment"
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import ProjectAttachment from "../../cards/ProjectAttachment";
export default {
  props: {
    item: Object
  },
  components: {
    ProjectAttachment
  },
  methods: {
    uploadAttachment(files) {
      const data = {
        id: this.item.id,
        files: files.map(x => ({
          id: Math.random(),
          coverPhoto: {
            imageUrl: x.dataURL
          },
          rate: false,
          name: x.name,
          createAt: new Date().toISOString()
        }))
      };
      this.uploadAttachmentRequest(data);
    },
    updateRateAttachment(id) {
      const data = {
        id: this.item.id,
        idAttachment: id
      };
      this.updateRateAttachmentRequest(data);
    },
    removeAttachment(id) {
      const data = {
        id: this.item.id,
        idAttachment: id
      };
      this.removeAttachmentRequest(data);
    },
    ...mapActions("ht_store/matter/hearing/attachment", [
      "uploadAttachmentRequest",
      "removeAttachmentRequest",
      "updateRateAttachmentRequest"
    ])
  }
};
</script>
