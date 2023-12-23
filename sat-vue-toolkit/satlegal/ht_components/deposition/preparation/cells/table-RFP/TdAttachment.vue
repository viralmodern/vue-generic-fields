<template>
  <td>
    <Attachments
      ref="refAttachment"
      :totalAttachments="totalAttachments"
      :dataAttachments="dataAttachments"
      :isShowPagination="isShowPagination"
      :totalsPageAttachment="totalsPageAttachment"
      :isLoadingAdd="isLoadingAdd"
      @showModal="getDataAttachment"
      @addFiles="addFiles"
      @removeAttachment="removeAttachment"
      @updatePagination="getDataAttachment"
    />
  </td>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Attachments from "../../../../common/Attachments";

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
    dataRow: Object,
    column: Object,
    matterId: [String, Number],
    depositionId: [String, Number],
  },
  methods: {
    getDataAttachment(query) {
      const data = {
        idParams: {
          matterId: this.matterId,
          depositionId: this.depositionId,
          RFPId: this.dataRow.id,
        },
        query,
      }
      this.getDataAttachmentRFPRequest(data);
    },
    async addFiles({body, pagination}) {
      const data = {
        idParams: {
          matterId: this.matterId,
          depositionId: this.depositionId,
          RFPId: this.dataRow.id,
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
        matterId: this.matterId,
        depositionId: this.depositionId,
        RFPId: this.dataRow.id,
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
    totalAttachments() {
      return this.dataRow.attachments.length || 0;
    },
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
