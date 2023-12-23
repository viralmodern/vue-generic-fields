<template>
  <v-list class="list">
    <slot name="AddCheckListMenu"></slot>
    <div
      class="ml-3 mb-1 text-body-2 primary--text list-all"
      @click="$emit('pagingFilters', { name: 'page', req: 1 })"
    >
      <v-icon color="primary" class="mr-2 small">list</v-icon>All
    </div>
    <div class="ml-3 font-weight-bold text-body-2">Filters</div>
    <v-list>
      <div v-for="(item, index) in checkListFilters" :key="index">
        <v-list-item
          @click="filters(item)"
          :class="active === item.id ? 'primary--text' : null"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>

    <div class="ml-3 font-weight-bold text-body-2">Labels</div>
    <v-list>
      <div v-for="(item, index) in dataLabels" :key="index">
        <v-list-item
          @click="filtersLabels({ name: 'labels', req: item.id })"
          :class="active === item.id ? 'primary--text' : null"
        >
          <v-list-item-action>
            <v-icon :color="item.color">fiber_manual_record</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </div>
    </v-list>
  </v-list>
</template>
<script>
import { checkListFilters } from "../../../../config";
export default {
  props: {
    dataLabels: Array
  },
  data() {
    return {
      checkListFilters,
      active: null
    };
  },
  methods: {
    filtersLabels(item) {
      this.$emit("pagingFilters", item);
      this.active = item.req;
    },
    filters(item) {
      switch (item.name) {
        case "starred":
          this.$emit("pagingFilters", { name: "starred", req: true });
          break;
        case "Deleted":
          this.$emit("pagingFilters", { name: "is_removed", req: true });
          break;
        case "Done":
          this.$emit("pagingFilters", { name: "done", req: true });
          break;
        case "Scheduled":
          this.$emit("pagingFilters", { name: "scheduled", req: true });
          break;
        case "Priority":
          this.$emit("pagingFilters", { name: "marked_priority", req: true });
          break;
        case "Today":
          this.$emit("pagingFilters", { name: "today", req: true });
          break;
      }
      this.active = item.id;
    }
  }
};
</script>
<style scoped>
.list-all {
  align-items: center;
  display: flex;
  cursor: pointer;
  padding: 5px;
}
.list {
  border-right-style: solid;
  border-right-width: 1px;
  border-right-color: #c1c1c1;
}
</style>
