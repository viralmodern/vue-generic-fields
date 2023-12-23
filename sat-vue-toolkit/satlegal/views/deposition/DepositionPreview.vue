<template>
  <v-col cols="12" class="mt-2">
    <UploadFileDragDrop
      accept=".pdf, .txt, .docx, .doc"
      :regExpFiles="/\.(pdf|txt|docx|doc)$/i"
      :multiple="false"
      title="Deposition Transcript"
      subTitle="Presentations, research papers, legal documents, and more"
      @uploadFiles="uploadSignFiles"
    />

    <div
      v-if="respTranscript.transcript_text"
      class="ma-2"
      style="border: 1px solid silver;"
    >
      <!-- <v-col xs12 class="text-xs-right">
        <v-btn  :href="respTranscript.transcript" download>
          <v-icon>mdi-cloud_download</v-icon>
        </v-btn>
      </v-col>-->
      <pre class="pa-3">{{ respTranscript.transcript_text }}</pre>
    </div>
  </v-col>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import UploadFileDragDrop from "../../ht_components/uploadFiles/Home";
export default {
  components: {
    UploadFileDragDrop
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/deposition/uploadFiles", [ // eslint-disable-line
      "getAllFiles",
      "uploadFiles"
    ]),
    uploadSignFiles(files) {
      const matterId = this.$route.params.matter || this.$route.params.projectId;
      const depositionId = this.$route.params.depositionId;
      const data = {
        transcript: files,
        matterId,
        depositionId
      };
      this.uploadFiles(data);
    },
    downloadFiles() {
      // var URL = this.respTranscript.transcript;
      // var filename = URL.split("/")
      //   .pop()
      //   .split("#")[0]
      //   .split("?")[0];
      // window.location.assign(URL);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/uploadFiles", ["respTranscript"]) // eslint-disable-line
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    const depositionId = this.$route.params.depositionId;
    this.getAllFiles({ matterId, depositionId });
  }
};
</script>
<style scoped>
.dic-prev {
  width: 100%;
  height: 100%;
}
</style>
