<template>
  <div>
    <Attachment
      :dataAttachment="dataAttachment"
      @addFilesAttachment="uploadAttachment"
      @removeAttachment="removeAttachment"
      @updateRateAttachment="updateRateAttachment"
    />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Attachment from "../cards/ProjectAttachment";
export default {
  components: {
    Attachment
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/index/detailIndex/attachment", [
      "dataAttachment"
    ])
  },
  methods: {
    uploadAttachment(files) {
      const data = {
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
      this.updateRateAttachmentRequest(id);
    },
    removeAttachment(id) {
      this.removeAttachmentRequest(id);
    },
    ...mapActions("ht_store/matter/discovery/index/detailIndex/attachment", [
      "uploadAttachmentRequest",
      "removeAttachmentRequest",
      "updateRateAttachmentRequest"
    ])
  }
};
</script>
