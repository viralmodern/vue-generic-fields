<template>
  <td>
    <v-text-field
      hide-details
      name="input-7-1"
      :value="dataRow.dosage"
      class="ma-0 pa-0 custom-text-field input-size"
      @input="change"
      type="number"
      mask
    ></v-text-field>
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
    ...mapActions("ht_store/matter/partient/profile/detail/medicationLog", [
      "updateTask"
    ]),
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
