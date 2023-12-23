<template>
  <td>
    <v-btn @click="isShowPopup = true" class="ma-0" icon>
      <v-icon color="#757575">delete_outline</v-icon>
    </v-btn>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteGiven"
      @cancel="isShowPopup= false"
      messageConfirm="Are you sure want to delete this information and document?"
    />
  </td>
</template>

<script>
import ConfirmItem from "../../../../dialogs/ConfirmItem";

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
    deleteGiven() {
      this.$emit("remove", this.dataRow.id);
      this.isShowPopup = false;
    }
  }
};
</script>
