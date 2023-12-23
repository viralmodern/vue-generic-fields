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
    daubertId: [String, Number],
    reviewId: [String, Number],
    isShowRightPopup: Boolean
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingUpdate: false
    };
  },
  methods: {
    ...mapActions("ht_store/matter/deposition/daubertTest", [
      "addAttachmentRequest",
      "removeAttachmentRequest",
      "updateAttachmentRequest"
    ]),
    async addFiles(payload) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        daubertId: this.daubertId,
        reviewId: this.reviewId,
        body: {
          attachments: payload.files
        },
        isShowRightPopup: this.isShowRightPopup
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
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        daubertId: this.daubertId,
        reviewId: this.reviewId,
        attachmentId: payload.id,
        body: {
          attachment: payload.files
        },
        isShowRightPopup: this.isShowRightPopup
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
        daubertId: this.daubertId,
        reviewId: this.reviewId,
        attachmentId: payload.id,
        isShowRightPopup: this.isShowRightPopup
      };
      this.removeAttachmentRequest(data);
    }
  }
};
</script>
