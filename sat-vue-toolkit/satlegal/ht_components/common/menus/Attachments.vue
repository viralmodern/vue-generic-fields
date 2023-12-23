<template>
  <div>
    <a href="#" @click="showModal">{{ totalAttachments }} attachment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text class="pa-4">
          <ProjectAttachment
            ref="refProjectAttachment"
            :dataAttachment="dataAttachments"
            :isLoadingAdd="isLoadingAdd"
            @addFilesAttachment="addFilesAttachment"
            @removeAttachment="$emit('removeAttachment', {id: $event, pagination})"
          />
          <div>
            <v-pagination
              v-if="isShowPagination"
              v-model="pagination.page"
              :length="totalsPageAttachment"
            ></v-pagination>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ProjectAttachment from "../../cards/ProjectAttachment";

export default {
  components: {
    ProjectAttachment
  },
  data() {
    return {
      showDialog: false,
      pagination: {
        page: 1,
      }
    };
  },
  props: {
    totalAttachments: Number,
    dataAttachments: Array,
    isShowPagination: Boolean,
    totalsPageAttachment: Number,
    isLoadingAdd: Boolean,
  },
  methods: {
    addFilesAttachment(files) {
      let body = new FormData();
      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        body.append("files[" + i + "]", file);
      }
      this.$emit('addFiles', {body, pagination: this.pagination});
    },
    showModal() {
      this.showDialog = true;
      this.$emit('showModal');
    },
    clearUploadFiles() {
      this.$refs.refProjectAttachment.clearUploadFiles();
    },
  },
  watch: {
    pagination: {
      handler(val) {
        this.$emit('updatePagination', val);
      },
      deep: true,
    }
  },
};
</script>
