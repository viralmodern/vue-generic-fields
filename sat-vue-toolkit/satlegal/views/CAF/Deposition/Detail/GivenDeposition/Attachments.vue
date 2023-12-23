<template>
  <div>
    <PopupAttachments
      ref="refPopupAttachment"
      :dataAttachments="dataAttachments"
      :isShowPagination="isShowPagination"
      :isLoadingAdd="isLoadingAdd"
      :isLoadingUpdate="isLoadingUpdate"
      :totalsPageAttachment="totalsPageAttachment"
      :isShowPopup="isShowPopup"
      @addFiles="addFiles"
      @updateAttachment="updateAttachment"
      @removeAttachment="removeAttachment"
      @closePopup="$emit('closePopup')"
    />
  </div>
</template>
<script>
import { mapActions } from "vuex";

import PopupAttachments from "@/sat-vue-toolkit/satlegal/ht_components/common/dialog/PopupAttachments";

export default {
  components: {
    PopupAttachments
  },
  props: {
    dataAttachments: Array,
    isShowPagination: Boolean,
    totalsPageAttachment: Number,
    isShowPopup: Boolean,
    requestForProductionId: Number,
    detail: Boolean
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingUpdate: false
    };
  },
  methods: {
    async addFiles(payload) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          requestForProductionId: this.requestForProductionId
        },
        body: {
          attachments: payload.files
        },
        detail: this.detail
      };
      try {
        this.isLoadingAdd = true;
        await this.addAttachmentRequest(data);
        this.isLoadingAdd = false;
        this.$refs.refPopupAttachment.clearUploadFiles();
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    async updateAttachment(payload) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          requestForProductionId: this.requestForProductionId,
          attachmentId: payload.id
        },
        body: {
          attachment: payload.files
        },
        detail: this.detail
      };
      try {
        this.isLoadingUpdate = true;
        await this.updateAttachmentRequest(data);
        this.isLoadingUpdate = false;
        this.$refs.refPopupAttachment.cancelUpdate();
      } catch (error) {
        this.isLoadingUpdate = false;
      }
    },
    removeAttachment(payload) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        requestForProductionId: this.requestForProductionId,
        attachmentId: payload.id,
        detail: this.detail
      };
      this.removeAttachmentRequest(data);
    },
    ...mapActions("ht_store/matter/deposition/givenDeposition", [
      "addAttachmentRequest",
      "updateAttachmentRequest",
      "removeAttachmentRequest"
    ])
  }
};
</script>
