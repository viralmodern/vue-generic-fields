<template>
  <v-row no-gutters class="mt-2" v-if="attachments">
    <span class="text--secondary" v-if="attachments.length < 1">
      <i>(There is no pending request need to review)</i>
    </span>
    <v-col v-for="item in attachments" :key="item.id" cols="6">
      <AttachmentDocument
        :imageUrl="item.coverPhoto && item.coverPhoto.imageUrl"
        :name="item.name"
        :createAt="item.createAt"
        :rate="item.rate"
        :link="item.link"
        @removeAttachment="$emit('removeAttachment', item.id)"
        @updateRateAttachment="$emit('updateRateAttachment', item.id)"
        @changeStatusDocument="changeStatusDocument(item, $event)"
      />
    </v-col>
    <ConfirmDocument
      :isShowPopup="isShowPopup"
      @remove="deleteConfirm"
      @cancel="isShowPopup= false"
      :messageConfirm="message"
      :title="titleConfirm"
    />
  </v-row>
</template>
<script>
import AttachmentDocument from "./AttachmentDocument";
import ConfirmDocument from "../dialogs/ConfirmDocument";
export default {
  props: {
    attachments: Array
  },
  components: {
    AttachmentDocument,
    ConfirmDocument
  },
  data() {
    return {
      isShowPopup: false,
      item: {},
      message: "",
      titleConfirm: ""
    };
  },
  methods: {
    changeStatusDocument(item, value) {
      const data = {
        item: item,
        value: value
      };
      if (value == "approve") {
        this.message = "Are you sure you want to approve this document?";
        this.titleConfirm = "Confirm approve"
      } else {
        this.message = "Are you sure you want to reject this document?";
        this.titleConfirm = "Confirm reject"
      }
      this.item = data;
      this.isShowPopup = true;
    },
    deleteConfirm() {
      this.$emit("changeStatusDocument", this.item);
      this.isShowPopup = false;
    }
  }
};
</script>
