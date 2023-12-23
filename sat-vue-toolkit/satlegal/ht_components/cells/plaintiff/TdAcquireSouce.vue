<template>
  <td>
    <SelectMultiple
      :value="dataRow.acquireSource"
      :list="acquireSource"
      title="Acquire Source"
      labelSearch="Search acquire source"
      name="acquire source"
      keySearch="name"
      @select="select"
    >
      <template slot-scope="{ items }" slot="section">
        <v-chip
          class="mx-1"
          v-for="item in (items = convertList)"
          :key="item.id"
          label
        >{{ item.name }}</v-chip>
      </template>
      <template slot-scope="{ item }" slot="item">
        <v-list-item-avatar class="border">
          <v-icon v-if="item.check">mdi-done</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="ml-2">
          <v-row no-gutters class="align-center" style="width:100%">
            <v-col cols="10">{{ item.name }}</v-col>
          </v-row>
        </v-list-item-content>
      </template>
    </SelectMultiple>
  </td>
</template>

<script>
import SelectMultiple from "../../inputs/SelectMultiple";
import { acquireSource } from "../../../config";

export default {
  data() {
    return {
      acquireSource
    };
  },
  components: {
    SelectMultiple
  },
  props: {
    dataRow: Object,
    column: Object
  },
  methods: {
    select({ check, id: idSelect }) {
      const data = {
        taskId: this.dataRow.id,
        columnName: this.column.name,
        newValue: { check, id: idSelect }
      };
      this.$emit("updateTask", data);
    }
  },
  computed: {
    convertList() {
      return this.acquireSource.filter(x => {
        return this.dataRow.acquireSource.includes(x.id);
      });
    }
  }
};
</script>

<style scoped>
.border /deep/ .v-avatar {
  border: 1px solid silver;
}
</style>
