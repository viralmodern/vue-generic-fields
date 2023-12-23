<template>
  <div>
    <PopupDocuments
      ref="refPopupAttachment"
      :dataDocuments="dataDocuments"
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

import PopupDocuments from "@/sat-vue-toolkit/satlegal/ht_components/common/dialog/PopupDocuments";

export default {
  components: {
    PopupDocuments
  },
  props: {
    dataDocuments: Array,
    isShowPagination: Boolean,
    totalsPageAttachment: Number,
    isShowPopup: Boolean,
    docketEntryId: Number,
  },
  data() {
    return {
      isLoadingAdd: false,
      isLoadingUpdate: false,
    }
  },
  methods: {
    async addFiles(payload) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          docketEntryId: this.docketEntryId,
        },
        body: {
          attachments: payload.files
        }
      };
      try {
        this.isLoadingAdd = true;
        await this.addAttachmentRFPRequest(data);
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
          docketEntryId: this.docketEntryId,
          attachmentId: payload.id,
        },
        body: {
          attachment: payload.files
        }
      };
      try {
        this.isLoadingUpdate = true
        await this.updateAttachmentRFPRequest(data);
        this.isLoadingUpdate = false
        this.$refs.refPopupAttachment.cancelUpdate();
      } catch (error) {
        this.isLoadingUpdate = false
      }
    },
    removeAttachment(payload) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        docketEntryId: this.docketEntryId,
        attachmentId: payload.id,
      };
      this.removeAttachmentRFPRequest(data);
    },
    ...mapActions("ht_store/matter/deposition/RFP", [
      "addAttachmentRFPRequest",
      "updateAttachmentRFPRequest",
      "removeAttachmentRFPRequest",
    ]),
  },
};
</script>
