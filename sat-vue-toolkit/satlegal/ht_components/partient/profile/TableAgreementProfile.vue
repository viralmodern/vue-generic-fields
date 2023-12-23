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
          :index="parseInt(props.index)+1"
        />
      </template>
      <template v-slot:top>
        <slot name="top"></slot>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";

import TdName from "./cells/TdName";
import TdDefendantParty from "./cells/TdDefendantParty";
import TdDate from "./cells/TdDate";
import TdPlaintiffParty from "./cells/TdPlaintiffParty";
import TdTags from "./cells/TdTags";
import TdLinkedRecords from "./cells/TdLinkedRecords";
import TdViewDetail from "./cells/TdActionAgreement";

export default {
  components: {
    SlickTable,
    TdName,
    TdDefendantParty,
    TdDate,
    TdPlaintiffParty,
    TdTags,
    TdLinkedRecords,
    TdViewDetail
  },
  props: {
    items: Array
  },
  methods: {
    ...mapActions("ht_store/matter/partient/profile/detail", [
      "updateTask",
      "removeRow"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "viewDetail") {
        return TdViewDetail;
      }
      if (columnName === "agreementName") {
        return TdName;
      }
      if (columnName === "dateOfAgreement") {
        return TdDate;
      }
      if (columnName === "defendantParty") {
        return TdDefendantParty;
      }
      if (columnName === "plaintiffParty") {
        return TdPlaintiffParty;
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
