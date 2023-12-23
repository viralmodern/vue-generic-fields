<template>
  <td>
    <v-combobox
      :value="dataRow.records"
      v-model="records"
      :items="overviewTable.records"
      :search-input.sync="search"
      hide-selected
      multiple
      persistent-hint
      small-chips
      @change="changeRecords"
    >
      <template v-slot:no-data>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              No results matching "
              <strong>{{ search }}</strong>". Press
              <kbd>enter</kbd> to create a new one
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-combobox>
  </td>
</template>
<script>
import { overviewTable } from "../../../config.js";
export default {
  data() {
    return {
      overviewTable,
      search: null,
      records: []
    };
  },
  props: {
    dataRow: Object
  },
  methods: {
    changeRecords() {
      const data = {
        id: this.dataRow.id,
        value: this.records,
        nameRow: "records"
      };
      this.$emit("changeComplaint", data);
    }
  },
  mounted() {
    this.records = this.dataRow.records;
  }
};
</script>
