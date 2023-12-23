

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
import Attachment from "../../../cards/ProjectAttachment";
export default {
  components: {
    Attachment
  },
  methods: {
    uploadAttachment(files) {
      const { factId, projectId } = this.$route.params;
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("files[" + i + "]", file);
      }
      const data = {
        matterId: projectId,
        taskId: factId,
        formData
      };
      this.createFactAttachment(data);
    },
    updateRateAttachment(id) {
      return id;
    },
    removeAttachment(attachmentId) {
      const { factId, projectId } = this.$route.params;
      this.removeFactAttachment({ matterId: projectId, taskId: factId, attachmentId });
    },
    ...mapActions("ht_store/project/research/facts", [
      "getFactAttachment",
      "createFactAttachment",
      "removeFactAttachment"
    ])
  },
  mounted() {
    const { factId, projectId } = this.$route.params;
    this.getFactAttachment({ matterId: projectId, taskId: factId });
  },
  computed: {
    ...mapGetters("ht_store/project/research/facts", ["dataAttachment"])
  }
};
</script>
