<template>
  <td>
    <SelectMultiple
      :value="dataRow[column.name]"
      :list="dataDocumentAll"
      title="List"
      labelSearch="Search"
      name="document"
      to="/document-requests"
      keySearch="documentName"
      @select="select"
    >
      <template slot-scope="{ items }" slot="section">
        <v-chip class="pa-0 ml-0" v-for="item in items" :key="item.id" label>{{
          item.documentName
        }}</v-chip>
      </template>
      <template slot-scope="{ item }" slot="item">
        <v-list-item-avatar class="border">
          <v-icon v-if="item.check">mdi-done</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="ml-2">
          <v-row no-gutters class="align-center" style="width:100%">
            <v-col cols="10">{{ item.documentName }}</v-col>
          </v-row>
        </v-list-item-content>
      </template>
    </SelectMultiple>
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import SelectMultiple from "../inputs/SelectMultiple";

export default {
  components: {
    SelectMultiple
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    ...mapGetters("ht_store/document/all", ["dataDocumentAll"])
  },
  methods: {
    select({ check, id: idSelect }) {
      let data;
      if (check) {
        data = this.dataRow[this.column.name].filter(id => id !== idSelect);
      } else {
        data = [...this.dataRow[this.column.name], idSelect];
      }
      this.$emit("update", data);
    }
  }
};
</script>

<style scoped>
.border /deep/ .v-avatar {
  border: 1px solid silver;
}
</style>
