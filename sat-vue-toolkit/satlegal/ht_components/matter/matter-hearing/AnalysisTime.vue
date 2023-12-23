<template>
  <td>
    <v-spacer>
      <v-text-field
        hide-details
        mask="##:##"
        :rules="[ v => !v || /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/.test(v) || 'Invalid format']"
        :value="dataRow.time"
        placeholder="00:00"
        @input="change($event, dataRow)"
        class="ma-0 pa-0 custom-text-field"
      ></v-text-field>
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
    change(time, dataRow) {
      var b = ":";
      var result = "";
      for (var i = time.length; i > 0; i -= 2) {
        var ii = i - 1;
        if (result) {
          result = time.charAt(ii - 1) + time.charAt(ii) + b + result;
        } else {
          result = time.charAt(ii - 1) + time.charAt(ii);
        }
      }
      const data = {
        type: "Time",
        time: result || null,
        dataRow,
        itemAnalysis: this.itemAnalysis
      };
      const isValid = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]?$/.test(result);
      if (result.length === 0 || (result.length === 5 && isValid)) {
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
