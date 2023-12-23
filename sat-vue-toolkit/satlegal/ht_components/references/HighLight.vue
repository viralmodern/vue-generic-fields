<template>
  <div>
    <SlickTable :items="dataHighlight" :headers="headers" @onEndDragRows="onEndDragRows">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
          @update="updateHighlight( props.dataRow.id, props.column.name, $event)"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../slick-table/SlickTable2";
import TdInlineEdit from "../cells/TdInlineEdit";
import TdType from "../cells/TdType";
import TdAction from "./highlight/TdAction";

export default {
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Highlight",
          value: "name",
          name: "name"
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
          text: "Relevant",
          value: "relevant",
          name: "relevant"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ]
    };
  },
  components: {
    SlickTable
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdInlineEdit;
      }
      if (columnName === "implication") {
        return TdInlineEdit;
      }
      if (columnName === "relevant") {
        return TdType;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    onEndDragRows() {},
    ...mapActions("ht_store/matter/references/highlight", [
      "getDataHighlightRequest",
      "updateHighlightRequest"
    ]),
    updateHighlight(id, column, value) {
      const data = { id, column, value };
      this.updateHighlightRequest(data);
    }
  },
  computed: {
    ...mapGetters("ht_store/matter/references/highlight", ["dataHighlight"])
  },
  mounted() {
    this.getDataHighlightRequest();
  }
};
</script>
