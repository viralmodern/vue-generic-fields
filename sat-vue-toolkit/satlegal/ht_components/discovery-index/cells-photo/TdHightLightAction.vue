<template>
  <td>
    <v-btn @click="isShowPopup = true" class="ma-0" icon>
      <v-icon color="#757575">delete</v-icon>
    </v-btn>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteSupport"
      @cancel="isShowPopup= false"
      messageConfirm="Are you sure want to delete this microscopic support?"
    />
  </td>
</template>

<script>

import ConfirmItem from "../../dialogs/ConfirmItem";

export default {
  components: {
    ConfirmItem
  },
  props: {
    idGroup: Number,
    dataRow: Object,
    column: Object,
    expanId: Number
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  methods: {
    deleteSupport() {
      const data = {
        idGroup: this.idGroup,
        id: this.dataRow.id,
        expanId: this.expanId,
        columnName: this.column.name
      };
      this.$emit("updateTaskPhoto", data);
      this.isShowPopup = false;
    }
  }
};
</script>
