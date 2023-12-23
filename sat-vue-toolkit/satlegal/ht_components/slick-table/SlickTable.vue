<template>
  <DataTable
    :items="items"
    :server-items-length="totals"
    :loading="loading"
    :options="pagination"
    @update:pagination="updatePagination"
    :dragging="dragging"
  >
    <template slot="cellFilter" slot-scope="props">
      <slot
        name="cellFilter"
        :column="props.column"
        :filterObject="filterObject"
        :changeFilter="changeFilter"
      ></slot>
    </template>
    <template slot="cell" slot-scope="props">
      <slot name="cell" :column="props.column" :dataRow="props.dataRow"></slot>
    </template>
    <template v-slot:actions-prepend>
      <slot name="top" />
    </template>
  </DataTable>
</template>
<script>
import DataTable from "./DataTable";

export default {
  components: {
    DataTable
  },
  props: {
    items: Array,
    totals: Number,
    pagination: Object,
    filterObject: Object,
    loading: Boolean,
    dragging: Boolean
  },
  methods: {
    changeFilter(filter) {
      this.$emit("update:filterObject", filter);
    },
    updatePagination(pagination) {
      this.$emit("update:pagination", pagination);
    }
  }
};
</script>

