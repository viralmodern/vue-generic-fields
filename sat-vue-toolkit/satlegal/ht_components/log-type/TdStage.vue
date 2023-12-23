<template>
  <td>
    <v-select
      :value="itemJoin"
      :items="stageExhibit"
      item-text="name"
      item-value="id"
      class="custom-text-field"
      @change="onChange"
    >
      <template v-slot:selection="{ item, index }">
        <span>{{ item.name }}</span>
      </template>
    </v-select>
  </td>
</template>

<script>
import { stageExhibit } from "../../config.js";
export default {
  props: {
    column: Object,
    dataRow: Object
  },
  data() {
    return {
      stageExhibit,
      type: ""
    };
  },
  computed: {
    itemJoin() {
      return this.stageExhibit.find(x => x.id === this.dataRow.stage);
    }
  },
  methods: {
    onChange(value) {
      const data = {
        column: this.column.name,
        parentId: this.dataRow.id,
        value: value
      };
      this.$emit("onChange", data);
    }
  }
};
</script>
<style scoped>
.custom-text-field /deep/ .v-input__slot::before {
  border-style: unset;
}
</style>
