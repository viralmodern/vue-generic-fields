<template>
  <td>
    <SelectMultiple
      :value="dataRow[column.name]"
      :list="dataFactsReSearch"
      title="List facts"
      labelSearch="Search facts"
      name="facts"
      :to="{ name: 'facts', params: { projectId:$route.params.matter || $route.params.projectId } }"
      keySearch="title"
      @select="select"
    >
      <template slot-scope="{ items }" slot="section">
        <v-chip class="pa-0 ml-0" v-for="item in items" :key="item.id" label>{{
          item.title
        }}</v-chip>
      </template>
      <template slot-scope="{ item }" slot="item">
        <v-list-item-avatar class="border">
          <v-icon v-if="item.check">mdi-done</v-icon>
        </v-list-item-avatar>
        <v-list-item-content class="ml-2">
          <v-row row align-center style="width:100%">
            <v-col cols="10">{{ item.title }}</v-col>
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
    $$$matterID() {
      try {
        return this.$route.params.matter || this.$route.params.projectId
      } catch (e) {
        console.log('$$$matterID', e.message) // eslint-disable-line
        return null
      }
    },
    ...mapGetters("ht_store/project/research/facts", ["dataFactsReSearch"])
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
