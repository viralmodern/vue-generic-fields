<template>
  <div>
    <SlickTable groupRows="tableCitation" :items="items" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @updateTask="updateTaskDetail"
          :index="parseInt(props.index)+1"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import SlickTable from "../../../slick-table/SlickTable2";

import TdHightLightFromCom from "../cells/TdHightLightFromCom";
import TdImplication from "../cells/TdImplication";
import TdTags from "../cells/TdTags";
import TdLinkedRecords from "../cells/TdLinkedRecords";

export default {
  components: {
    SlickTable,

    TdHightLightFromCom,
    TdImplication,
    TdTags,
    TdLinkedRecords
  },
  props: {
    items: Array
  },
  methods: {
    ...mapActions("ht_store/matter/partient/profile/detail/communication", [
      "updateTaskDetail"
    ]),
    getDisplayComponent(columnName) {
      if (columnName === "hightLightFromCom") {
        return TdHightLightFromCom;
      }
      if (columnName === "implication") {
        return TdImplication;
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
      const data = [
        {
          visible: true,
          sortable: false,
          text: "Hightlight from this communication",
          value: "hightLightFromCom",
          name: "hightLightFromCom"
        },
        {
          visible: true,
          sortable: false,
          text: "Implication",
          value: "implication",
          name: "implication"
        },
        {
          visible: true,
          sortable: false,
          text: "Tags",
          value: "tags",
          name: "tags"
        },
        {
          visible: true,
          sortable: false,
          text: "Linked Records",
          value: "linkedRecords",
          name: "linkedRecords"
        }
      ];
      return data;
    }
  }
};
</script>
