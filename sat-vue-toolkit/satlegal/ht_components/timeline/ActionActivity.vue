<template>
  <td>
    <v-btn small icon @click="deleteItemActivity">
      <v-icon size="18">mdi-delete_outline</v-icon>
    </v-btn>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteConfirm"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this item activity ?"
    />
  </td>
</template>
<script>
import ConfirmItem from "../dialogs/ConfirmItem";
export default {
  props: {
    dataRow: Object
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  components: {
    ConfirmItem
  },
  methods: {
    deleteItemActivity() {
      this.isShowPopup = true;
    },
    deleteConfirm() {
      this.$emit("deleteItemActivity", this.dataRow.id);
      this.isShowPopup = false;
    }
  }
};
</script>
