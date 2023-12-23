<template>
  <div>
    <SlickTable groupRows="tableCitation" :items="items" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @updateTask="updateTask"
          @removeRow="removeRow"
          :isDetail="false"
          :index="parseInt(props.index)+1"
        />
      </template>
      <template v-slot:top>
        <slot name="button"></slot>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";

import TdName from "./cells/TdName";
import TdDate from "./cells/TdDate";
import TdTags from "./cells/TdTags";
import TdLinkedRecords from "./cells/TdLinkedRecords";
import TdViewDetail from "./cells/TdViewDetail";
import TdDosage from "./cells/TdDosage";

export default {
  components: {
    SlickTable,
    TdName,
    TdDate,
    TdTags,
    TdDosage,
    TdLinkedRecords,
    TdViewDetail
  },
  props: {
    items: Array
  },
  methods: {
    ...mapActions("ht_store/matter/partient/profile/detail/medicationLog", [
      "updateTask",
      "removeRow"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "viewDetail") {
        return TdViewDetail;
      }
      if (columnName === "medicationName") {
        return TdName;
      }
      if (columnName === "date") {
        return TdDate;
      }
      if (columnName === "dosage") {
        return TdDosage;
      }
      if (columnName === "tags") {
        return TdTags;
      }
      if (columnName === "linkedRecords") {
        return TdLinkedRecords;
      }
      return "td";
    }
  },
  computed: {
    ...mapGetters("ht_store/slick", ["visibleColumns"]),
    headers() {
      return this.visibleColumns.map(x => ({
        text: x.title,
        value: x.name,
        name: x.name,
        sortable: false
      }));
    }
  }
};
</script>
