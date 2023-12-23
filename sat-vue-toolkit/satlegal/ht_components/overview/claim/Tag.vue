<template>
  <td>
    <v-combobox
      :value="dataRow.tags"
      v-model="tags"
      :items="overviewTable.tags"
      :search-input.sync="search"
      hide-selected
      multiple
      persistent-hint
      small-chips
      @change="changeTags"
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
      tags: []
    };
  },
  props: {
    dataRow: Object
  },
  methods: {
    changeTags() {
      const data = {
        id: this.dataRow.id,
        value: this.tags,
        nameRow: "tags"
      };
      this.$emit("changeClaim", data);
    }
  },
  mounted() {
    this.tags = this.dataRow.tags;
  }
};
</script>
