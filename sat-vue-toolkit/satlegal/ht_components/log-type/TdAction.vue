<template>
  <td>
    <v-btn @click="isShowPopup = true" class="ma-0" icon>
      <v-icon color="#757575">delete_outline</v-icon>
    </v-btn>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteSupport"
      @cancel="isShowPopup= false"
      :messageConfirm="messageDelete"
    />
  </td>
</template>

<script>
import ConfirmItem from "../dialogs/ConfirmItem";

export default {
  components: {
    ConfirmItem
  },
  props: {
    dataRow: Object,
    column: Object
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  methods: {
    deleteSupport() {
      this.$emit("deleteLogType", this.dataRow.id);
      this.isShowPopup = false;
    }
  },
  computed: {
    messageDelete() {
      const type = this.$route.params.logId;
      if (type == 1) {
        return "Are you sure want to delete this privilege entry?";
      }
      if (type == 2) {
        return "Are you sure want to delete this item? ";
      }
      if (type == 3) {
        return "Are you sure want to delete this item? ";
      }
      if (type == 4) {
        return "Are you sure want to delete this exhibit entry? ";
      }
      return "";
    }
  }
};
</script>
