<template>
  <td>
    <v-select
      :value="itemJoin"
      :items="responsiblity"
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
import { responsiblity } from "../../../config";
export default {
  props: {
    column: Object,
    dataRow: Object
  },
  data() {
    return {
      responsiblity,
    };
  },
  computed: {
    itemJoin() {
      return this.responsiblity.find(x => x.id === this.dataRow.responsiblity);
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
