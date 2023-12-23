<template>
  <td>
    <v-form ref="form">
      <v-row no-gutters class="justify-center align-center">
        <v-text-field
          hide-details
          mask="##########"
          name="input-7-1"
          :value="dataRow.limitaion.yearLimitation"
          class="ma-0 pa-0 custom-text-field input-size"
          @input="change"
          :rules="[v => !!v || 'Statute Of Limitation of is required']"
        ></v-text-field>
        <span>years</span>
      </v-row>
    </v-form>
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
    ...mapActions("ht_store/task/list", ["updateTask"]),
    change(e) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: e
      };
      if (this.$refs.form.validate()) {
        this.updateTask(data);
      }
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
