<template>
  <td>
    <v-btn icon @click="deleteTask">
      <v-icon>mdi-delete_outline</v-icon>
    </v-btn>
  </td>
</template>
<script>
import { mapActions } from "vuex";
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    ...mapActions("ht_store/matter/discovery/index/detailIndex", [
      "updateTaskIndexDocument"
    ]),
    deleteTask() {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name
      };
      this.updateTaskIndexDocument(data);
    }
  }
};
</script>
