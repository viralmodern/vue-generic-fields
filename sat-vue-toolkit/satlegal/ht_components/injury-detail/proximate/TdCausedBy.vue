<template>
  <td>
    <v-select
      :value="itemJoin"
      :items="causedBy"
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
import { causedBy } from "../../../config";
export default {
  props: {
    column: Object,
    dataRow: Object
  },
  data() {
    return {
      causedBy,
    };
  },
  computed: {
    itemJoin() {
      return this.causedBy.find(x => x.id === this.dataRow.causedBy);
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
