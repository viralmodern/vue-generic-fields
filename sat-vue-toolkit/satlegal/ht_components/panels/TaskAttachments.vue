<template>
  <v-row no-gutters>
    <v-col>
      <h1>Attachments</h1>
      <ProjectAttachment
        :dataAttachment="dataAttachment"
        @addFilesAttachment="addFiles"
        @removeAttachment="removeAttachment"
        @updateRateAttachment="updateRateAttachment"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ProjectAttachment from "../cards/ProjectAttachment";
import {$$STORE_PREFIX} from "../../utils";
export default {
  components: {
    ProjectAttachment
  },
  computed: {
    ...mapGetters("ht_store/task/detail/attachment", ["dataAttachment"])
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
       this.addFilesAttachment(data)
    },
    ...mapActions("ht_store/task/detail/attachment", ["getDataAttachmentRequest"]),
    ...mapMutations("ht_store/task/detail/attachment", [
      "addFilesAttachment",
      "removeAttachment",
      "updateRateAttachment"
    ])
  },
  mounted() {
    this.getDataAttachmentRequest();
  }
};
</script>

