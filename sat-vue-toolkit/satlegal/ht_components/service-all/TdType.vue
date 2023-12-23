<template>
  <td>
    <v-select
      :value="itemJoin"
      :items="serviceType"
      item-text="name"
      item-value="id"
      class="custom-text-field"
      @change="onChange"
    >
      <template v-slot:selection="{ item, index }">
        <v-chip :color="item.color" class="pb-1 white--text" small>
          <span>{{ item.name }}</span>
        </v-chip>
      </template>
    </v-select>
  </td>
</template>

<script>
import { serviceType } from "../../config.js";
export default {
  props: {
    column: Object,
    dataRow: Object
  },
  data() {
    return {
      serviceType,
      type: ""
    };
  },
  computed: {
    itemJoin() {
      return this.serviceType.find(x => x.id === this.dataRow.type);
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
