<template>
  <Attachments
    ref="refAttachment"
    :totalAttachments="totalAttachments.length || 0"
    :dataAttachments="dataAttachments"
    :isShowPagination="isShowPagination"
    :totalsPageAttachment="totalsPageAttachment"
    :isLoadingAdd="isLoadingAdd"
    @showModal="getDataAttachment"
    @addFiles="addFiles"
    @removeAttachment="removeAttachment"
    @updatePagination="getDataAttachment"
  />
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Attachments from "../Attachments";

export default {
  components: {
    Attachments
  },
  data() {
    return {
      showDialog: false,
      isLoadingAdd: false,
    };
  },
  props: {
    totalAttachments: Number,
    RFPId: Number
  },
  methods: {
    getDataAttachment(query) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          RFPId: this.RFPId
        },
        query,
      }
      this.getDataAttachmentRFPRequest(data);
    },
    async addFiles({body, pagination}) {
      const data = {
        idParams: {
          matterId: this.$route.params.matter || this.$route.params.projectId,
          depositionId: this.$route.params.depositionId,
          RFPId: this.RFPId
        },
        body,
      }
      this.isLoadingAdd = true;
      await this.addAttachmentRFPRequest(data);
      await this.getDataAttachment(pagination);
      this.isLoadingAdd = false;
      this.clearUploadFiles();
    },
    async removeAttachment({id, pagination}) {
      const data = {
        matterId: this.$route.params.matter || this.$route.params.projectId,
        depositionId: this.$route.params.depositionId,
        RFPId: this.RFPId,
        attachmentId: id,
      };
      await this.removeAttachmentRFPRequest(data);
      this.getDataAttachment(pagination);
    },
    ...mapActions("ht_store/matter/discovery/deposition/preparation/requestForProduction", [
      "getDataAttachmentRFPRequest",
      "addAttachmentRFPRequest",
      "updateAttachmentRFPRequest",
      "removeAttachmentRFPRequest",
    ]),
  },
  computed: {
    clearUploadFiles() {
      return this.$refs.refAttachment.clearUploadFiles;
    },
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/requestForProduction", [
      "dataAttachments",
      "totalsPageAttachment",
      "isShowPagination",
    ]),
  }
};
</script>
