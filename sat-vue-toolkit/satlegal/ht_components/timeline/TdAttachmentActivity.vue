<template>
  <td>
    <a href="#" @click="show">{{dataRow.attachments.length}} attachment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <ProjectAttachment
            :dataAttachment="dataAttachment"
            :addLink="true"
            @addFilesAttachment="addFiles"
            @removeAttachment="remove"
            @updateRateAttachment="updateRate"
            @submitLink="postAttachmentTimeLine({
              matterId:$route.params.matter || $route.params.projectId,
              timelineId: $route.params.timelineId,
              formData: $event,
              activitiesId: dataRow.id
            })"
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
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      showDialog: false
    };
  },
  computed: {
    ...mapGetters("ht_store/project/research/timeline/detail/activities", [
      "dataAttachment"
    ])
  },
  methods: {
    show() {
      const { timelineId, projectId } = this.$route.params;
      this.showDialog = true;
      this.getAttachmentsTimeLine({
        matterId: projectId,
        timelineId,
        activitiesId: this.dataRow.id
      });
    },
    addFiles(files) {
      const { timelineId, projectId } = this.$route.params;
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("files[" + i + "]", file);
      }
      const data = {
        matterId: projectId,
        timelineId,
        formData,
        activitiesId: this.dataRow.id
      };
      this.postAttachmentTimeLine(data);
    },
    updateRateAttachment(id) {
      return id;
    },
    remove(id) {
      const { timelineId, projectId } = this.$route.params;
      const req = {
        matterId: projectId,
        timelineId,
        activitiesId: this.dataRow.id,
        attachmentsId: id
      };
      this.removeAttachmentTimeLine(req);
    },
    updateRate(id) {
      return id;
    },
    ...mapActions("ht_store/project/research/timeline/detail/activities", [
      "getAttachmentsTimeLine",
      "postAttachmentTimeLine",
      "removeAttachmentTimeLine"
    ])
  }
};
</script>
