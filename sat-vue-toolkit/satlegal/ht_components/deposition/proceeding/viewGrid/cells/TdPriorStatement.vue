<template>
  <td>
    <SelectMultiple
      :value="dataRow[column.name]"
      :list="list"
      class="align-center"
      title="List Prior Statement"
      labelSearch="Search"
      name="Prior Statement"
      :to="{
        name: 'depositionPreparation',
        params: { projectId:$route.params.matter || $route.params.projectId}
      }"
      keySearch="question"
      @select="select"
    >
      <template slot-scope="{ items }" slot="section">
        <v-chip
          small
          class="pa-0 ml-0"
          v-for="item in items"
          :key="item.id"
          label
          >{{ item.question }}</v-chip
        >
      </template>
      <template slot-scope="{ item }" slot="item">
        <v-list-item-avatar class="border">
          <v-icon v-if="item.check">done</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="ml-2">
          <v-row no-gutters style="width:100%">
            <v-col cols="10">{{ item.question }}</v-col>
            <v-col cols="10">{{ item.answer }}</v-col>
          </v-row>
        </v-list-item-content>
      </template>
    </SelectMultiple>
  </td>
</template>

<script>
import { mapGetters } from "vuex";
import SelectMultiple from "../../../../inputs/SelectMultiple";

export default {
  components: {
    SelectMultiple
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    list() {
      if (!this.dataPriorStatement.all) return [];
      return this.dataPriorStatement.all.list;
    },
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/priorStatement", [
      "dataPriorStatement"
    ])
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
