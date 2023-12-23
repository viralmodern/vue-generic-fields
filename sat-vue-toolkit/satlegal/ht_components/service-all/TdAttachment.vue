<template>
  <td>
    <a href="#" @click="show">{{ total_attachments }} attachment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <ProjectAttachment
            :dataAttachment="dataAttachment"
            @addFilesAttachment="addFiles"
            @removeAttachment="remove"
            @updateRateAttachment="updateRate"
          />
        </v-card-text>
        <v-row no-gutters class="justify-end">
          <v-pagination
            v-model="page"
            :total-visible="7"
            :length="totals"
          ></v-pagination>
        </v-row>
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
      showDialog: false,
      total_attachments: 0,
      page: 1
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    show() {
      this.showDialog = true;
      this.getDataAttachment({
        matterId: this.$route.params.matter || this.$route.params.projectId,
        serviceId: this.dataRow.id,
        page: 1
      });
    },
    addFiles(files) {
      let formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("files[" + i + "]", file);
      }
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        serviceId: this.dataRow.id,
        formData
      };
      this.uploadAttachment(data);
      this.total_attachments = this.total_attachments + files.length;
    },
    remove(id) {
      const req = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        serviceId: this.dataRow.id,
        attachmentId: id
      };
      this.removeAttachment(req);
      this.total_attachments = this.total_attachments - 1;
    },
    updateRate(id) {
      return id;
    },
    ...mapActions("ht_store/matter/service", [
      "uploadAttachment",
      "removeAttachment",
      "getDataAttachment"
    ])
  },
  computed: {
    ...mapGetters("ht_store/matter/service", ["dataAttachment", "totalsAttachment"]),
    totals() {
      return Math.ceil((this.totalsAttachment / 20).toFixed(1)) || 1;
    }
  },
  mounted() {
    this.total_attachments = this.dataRow.attachments.length || 0;
  },
  watch: {
    page: {
      handler(page) {
        const { projectId } = this.$route.params;
        this.getDataAttachment({
          matterId: projectId,
          serviceId: this.dataRow.id,
          page
        });
      }
    }
  }
};
</script>
