<template>
  <div>
    <v-dialog :value="isShowPopup" @input="$emit('closePopup')" :width="width">
      <v-card>
        <v-card-text class="pa-4">
          <ProjectDocument
            ref="refProjectAttachment"
            :dataDocuments="dataDocuments"
            :isLoadingAdd="isLoadingAdd"
            @addFilesAttachment="addFilesAttachment"
            @removeAttachment="
              $emit('removeAttachment', { id: $event })
            "
            @updateAttachment="attachmentId = $event; isShowUpdateFile = true"
          />
        </v-card-text>
        <!-- <TableGrid
          hide-default-header
          hide-default-footer
          :fixedHeader="false"
          :headers="headersFilter"
          :desserts="dataDocuments"
          :loading="isLoadingGet"
        >
          <template v-slot:item.name="{ props: { item } }">
            <TextArea
              :value="item.name"
              @update="updateDraftsPrepared(item.id, 'name', $event)"
            />
          </template>
          <template v-slot:item.desc="{ props: { item } }">
            <TextArea
              :value="item.desc"
              @update="updateDraftsPrepared(item.id, 'desc', $event)"
            />
          </template>
          <template v-slot:item.action="{ props: { item } }">
            <div class="d-flex">
              <v-btn
                class="ma-0"
                @click="updateBookmarkDrafts(item.id, !item.bookmarked_pk)"
                icon
                small
              >
                <v-icon small :color="item.bookmarked_pk ? 'success' : 'grey'"
                  >bookmark</v-icon
                >
              </v-btn>
              <Action @remove="removeDraftsPrepared(item.id, $event)" />
            </div>
          </template>
        </TableGrid> -->
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import ProjectDocument from "../../cards/ProjectDocument";
export default {
  components: {
    ProjectDocument
  },
  data() {
    return {
      headers: [
        { text: "Draft name", value: "file_name", active: true },
        { text: "Draft description", description: "desc", active: true },
        { text: "Action", value: "action", active: true }
      ],
      attachmentId: 0,
      isShowUpdateFile: false
    };
  },
  props: {
    width: {
      type: Number,
      default: () => 1200
    },
    dataDocuments: Array,
    totalsPageAttachment: Number,
    isLoadingAdd: Boolean,
    isLoadingUpdate: Boolean,
    isShowPopup: Boolean
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
