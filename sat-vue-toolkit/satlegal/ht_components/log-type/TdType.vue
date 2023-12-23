<template>
  <td>
    <v-select
      :value="itemJoin"
      :items="privilegeType"
      multiple
      item-text="name"
      item-value="id"
      class="custom-text-field"
      @change="onChange"
    >
      <template v-slot:selection="{ item, index }">
        <v-chip v-if="index === 0" class="pb-1" small>
          <span>{{ item.name }}</span>
        </v-chip>
        <span v-if="index === 1" class="grey--text caption">(+{{ itemJoin.length - 1 }} others)</span>
      </template>
    </v-select>
  </td>
</template>

<script>
import { privilegeType } from "../../config.js";
export default {
  props: {
    column: Object,
    dataRow: Object
  },
  data() {
    return {
      privilegeType,
      type: ""
    };
  },
  computed: {
    itemJoin() {
      return this.privilegeType.filter(x => {
        return (this.dataRow.type || []).includes(x.id);
      });
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
