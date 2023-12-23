<template>
  <td>
    <v-btn icon @click="remove">
      <v-icon>mdi-delete_outline</v-icon>
    </v-btn>
    <ConfirmItem
      :isShowPopup="isShowPopup"
      @remove="deleteConfirm(dataRow)"
      @cancel="isShowPopup = false"
      messageConfirm="Are you sure you want to delete this item?"
    />
  </td>
</template>
<script>
import { mapActions } from "vuex";
import ConfirmItem from "../../dialogs/ConfirmItem";
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
    ...mapActions("ht_store/clientPortal/addressbook", ["updateTask"]),
    remove() {
      this.isShowPopup = true;
    },
    deleteConfirm() {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name
      };
      this.updateTask(data);
      this.isShowPopup = false;
    }
  }
};
</script>
