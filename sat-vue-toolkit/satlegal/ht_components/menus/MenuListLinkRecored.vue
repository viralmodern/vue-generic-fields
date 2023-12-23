<template>
  <SelectMultiple
    class="custom"
    :value="value"
    :list="list"
    :title="title"
    labelSearch="Search"
    :name="name"
    :to="to"
    :keySearch="keySearch"
    @select="select"
  >
    <template slot-scope="{ items }" slot="section">
      <slot v-if="$scopedSlots.sectionCustom" name="sectionCustom" :item="items"></slot>
      <v-chip v-else class="pa-0 ml-0" v-for="item in items" :key="item.id" label>{{item.name}}</v-chip>
    </template>
    <template slot-scope="{ item }" slot="item">
      <v-list-item-avatar class="border">
        <v-icon v-if="item.check">done</v-icon>
      </v-list-item-avatar>
      <v-list-item-content class="ml-2">
        <v-row no-gutters class="align-center" style="width:100%">
          <v-col cols="10">{{item.name}}</v-col>
        </v-row>
      </v-list-item-content>
    </template>
  </SelectMultiple>
</template>

<script>
import SelectMultiple from "../inputs/SelectMultiple";

export default {
  components: {
    SelectMultiple
  },
  props: {
    value: Array,
    list: Array,
    name: String,
    to: [Object, Array],
    keySearch: String,
    title: String
  },
  methods: {
    select({ check, id: idSelect }) {
      let data;
      if (check) {
        data = (this.value || []).filter(id => id !== idSelect);
      } else {
        data = [...this.value, idSelect];
      }
      this.$emit("select", data);
    }
  }
};
</script>

<style scoped>
.custom {
  align-items: center;
  flex-wrap: wrap;
}
.border /deep/ .v-avatar {
  border: 1px solid silver;
}
</style>
