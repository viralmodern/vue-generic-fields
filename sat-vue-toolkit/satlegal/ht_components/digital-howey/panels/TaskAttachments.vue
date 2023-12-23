<template>
  <v-row no-gutters>
    <v-col>
      <h1>Attachments</h1>
      <ProjectAttachment
        :dataAttachment="dataAttachment"
        @addFilesAttachment="addFiles"
        @removeAttachment="remove"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProjectAttachment from "../../cards/ProjectAttachment";
export default {
  components: {
    ProjectAttachment
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHoweyChecklist/task/attachment", [
      "dataAttachment"
    ])
  },
  methods: {
    addFiles(files) {
      const data = files.map(x => ({
        id: Math.random(),
        coverPhoto: {
          imageUrl: x.dataURL
        },
        rate: false,
        name: x.name,
        createAt: new Date().toISOString()
      }));
      this.addAttachmentRequest(data);
    },
    remove(id) {
      this.removeAttachmentRequest(id);
    },
    ...mapActions("ht_store/matter/digitalHoweyChecklist/task/attachment", [
      "getDataAttachmentRequest",
      "addAttachmentRequest",
      "removeAttachmentRequest"
    ])
  },
  mounted() {
    this.getDataAttachmentRequest();
  }
};
</script>

