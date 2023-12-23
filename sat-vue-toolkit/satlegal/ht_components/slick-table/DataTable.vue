<template>
  <VDataTableExtend
    :headers="columns"
    :loading="loading"
    :items="items"
    :options="pagination"
    @update:pagination="updatePagination"
    :server-items-length="totals"
    class="elevation-1 c-table"
    :dragging="dragging"
  >
    <template slot="filterRow">
      <tr class="filter-row" style="height: initial">
        <th v-for="column in visibleColumns" :key="column.name">
          <slot name="cellFilter" :column="column"></slot>
        </th>
      </tr>
    </template>
    <template slot="items" slot-scope="props">
      <tr :key="props.item.id" :id="props.item.id" @click="showTaskDetail">
        <slot
          v-for="column in visibleColumns"
          name="cell"
          :index="props.index"
          :column="column"
          :dataRow="props.item"
        ></slot>
      </tr>
    </template>
    <template v-slot:top>
      <slot name="actions-prepend"></slot>
    </template>
  </VDataTableExtend>
</template>
<script>
import { mapGetters } from "vuex";
import VDataTableExtend from "./VDataTableExtend";

export default {
  components: {
    VDataTableExtend
  },
  props: {
    items: Array,
    totals: Number,
    loading: Boolean,
    pagination: Object,
    dragging: Boolean
  },
  computed: {
    ...mapGetters("ht_store/slick", ["visibleColumns"]),
    columns() {
      return this.visibleColumns.map(x => ({
        text: x.title,
        value: x.name,
        sortable: false
      }));
    }
  },
  methods: {
    updatePagination(pagination) {
      this.$emit("update:pagination", pagination);
    },
    showTaskDetail() {
      this.$router.push({
        name: "CardDetail",
        params: {
          projectId: this.$route.params.matter || this.$route.params.projectId,
          cardId: 189
        }
      });
    }
  }
};
</script>

<style scoped>
.filter-row {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
.c-table /deep/ .v-table thead tr:first-child {
  border: none !important;
}
.c-table /deep/ .v-table thead tr {
  height: 50px;
}
.c-table /deep/ .v-table thead tr:first-child th {
  padding-top: 10px;
}
.c-table /deep/ .v-table thead tr.filter-row th {
  padding-bottom: 10px;
}
</style>
