<template>
  <td>
    <v-form ref="form">
      <v-row no-gutters class="justify-center align-center">
        <v-text-field
          hide-details
          type="number"
          name="input-7-1"
          :value="dataRow.quantity"
          class="ma-0 pa-0 custom-text-field"
          @input="change"
          :rules="[v => !!v || 'required']"
        ></v-text-field>
      </v-row>
    </v-form>
  </td>
</template>
<script>
export default {
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    change(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      if (this.$refs.form.validate()) {
        this.$emit("updateTask", data);
      }
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
