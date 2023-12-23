<template>
  <td>
    <v-textarea
      hide-details
      name="input-7-1"
      :value="dataRow.causeOfActions"
      class="ma-0 pa-0 custom-text-field input-size"
      @input="change"
      rows="1"
    ></v-textarea>
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
    ...mapActions("ht_store/project/research/facts", ["updateTask"]),
    change(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      this.updateTask(data);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
.input-size {
  width: 130px;
  font-size: 13px;
}
</style>
