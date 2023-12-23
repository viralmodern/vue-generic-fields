<template>
  <td>
    <a href="#" @click="showDialog=true">{{dataAttachmentJoin.length}} attachment(s)</a>
    <v-dialog v-model="showDialog" width="800" style="width: 130px">
      <v-card>
        <v-card-text>
          <ProjectAttachment
            :dataAttachment="dataAttachmentJoin"
            @addFilesAttachment="uploadAttachment"
            @removeAttachment="removeAttachmentItem"
            @updateRateAttachment="updateRateAttachment"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
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
    ...mapGetters("ht_store/matter/discovery/log/attachment", ["attachments"]),
    dataAttachmentJoin() {
      return (this.attachments || []).filter(x =>
        this.dataRow.attachments.includes(x.id)
      );
    }
  },
  methods: {
    async uploadAttachment(files) {
      const data = files.map(x => ({
        id: Math.random(),
        coverPhoto: {
          imageUrl: x.dataURL
        },
        rate: false,
        name: x.name,
        createAt: new Date().toISOString()
      }));
      await this.uploadAttachmentRequest(data);
      this.addAttachment({
        id: this.dataRow.id,
        idAttachment: data.map(x => x.id),
        typeId: this.$route.params.logId
      });
    },
    updateRateAttachment(id) {
      this.updateRateAttachmentRequest(id);
    },
    async removeAttachmentItem(id) {
      await this.removeAttachmentRequest(id);
      this.deleteAttachment({
        id: this.dataRow.id,
        idAttachment: id,
        typeId: this.$route.params.logId
      });
    },
    ...mapActions("ht_store/matter/discovery/log/attachment", [
      "uploadAttachmentRequest",
      "removeAttachmentRequest",
      "updateRateAttachmentRequest"
    ]),
    ...mapMutations("ht_store/matter/discovery/log/detail/type", [
      "addAttachment",
      "deleteAttachment"
    ])
  }
};
</script>
