<template>
  <td>
    <v-btn @click="isShowPopup = true" class="ma-0" icon>
      <v-icon color="#757575">mdi-delete_outline</v-icon>
    </v-btn>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteService"
      @cancel="isShowPopup= false"
      messageConfirm="Are you sure want to delete this service?"
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
    deleteService() {
      this.$emit("deleteService", this.dataRow.id);
      this.isShowPopup = false;
    }
  }
};
</script>
