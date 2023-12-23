<template>
  <div>
    <v-dialog :value="isShowPopup" @input="$emit('closePopup')" :width="width">
      <v-card>
        <v-card-text class="pa-4">
          <ProjectAttachment
            :isDisabled="isDisabled"
            ref="refProjectAttachment"
            :dataAttachment="dataAttachments"
            :isLoadingAdd="isLoadingAdd"
            @addFilesAttachment="addFilesAttachment"
            @removeAttachment="
              $emit('removeAttachment', { id: $event })
            "
            @updateAttachment="attachmentId = $event; isShowUpdateFile = true"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
    <UploadFile
      ref="refUploadFile"
      :isShow="isShowUpdateFile"
      :isLoadingAdd="isLoadingUpdate"
      @closeModal="isShowUpdateFile = false"
      @addFiles="$emit('updateAttachment', { id: attachmentId, files: $event[0] })"
    />
  </div>
</template>
<script>
import ProjectAttachment from "../../cards/ProjectAttachment";
import UploadFile from "../../dialogs/UploadFile";

export default {
  components: {
    ProjectAttachment,
    UploadFile
  },
  data() {
    return {
      attachmentId: 0,
      isShowUpdateFile: false
    };
  },
  props: {
    width: {
      type: Number,
      default: () => 900
    },
    dataAttachments: Array,
    totalsPageAttachment: Number,
    isLoadingAdd: Boolean,
    isLoadingUpdate: Boolean,
    isShowPopup: Boolean,
    isDisabled: {
      type: Boolean,
      default: () => false
    }
  },
  methods: {
    addFilesAttachment(files) {
      this.$emit("addFiles", { files });
    },
    clearUploadFiles() {
      this.$refs.refProjectAttachment.clearUploadFiles();
    },
    cancelUpdate() {
      this.$refs.refUploadFile.cancel();
    }
  }
};
</script>
