<template>
  <td>
    <v-spacer>
      <v-form ref="form">
        <v-text-field
          hide-details
          :value="dataRow.objection"
          :rules="[v => (v || '').length > 0 || 'This field is required']"
          @input="change($event, dataRow)"
          class="ma-0 pa-0 custom-text-field"
        ></v-text-field>
      </v-form>
    </v-spacer>
  </td>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    dataRow: Object,
    itemAnalysis: Object
  },
  methods: {
    ...mapActions("ht_store/matter/hearing/analysis", ["changeItemAnalysis"]),
    change(objection, dataRow) {
      const data = {
        type: "Objection",
        objection,
        dataRow,
        itemAnalysis: this.itemAnalysis
      };
      if (this.$refs.form.validate()) {
        this.changeItemAnalysis(data);
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
