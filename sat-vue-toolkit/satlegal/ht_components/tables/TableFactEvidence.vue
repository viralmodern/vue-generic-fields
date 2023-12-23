<template>
  <div>
    <SlickTable
      :items="items"
      :headers="headers"
      groupRows="evidenceRow"
      groupColumns="evidenceColumn"
      @onEndDragRows="onEndDragRows"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @onChange="$emit('onChange', {id:props.dataRow.id,[props.column.name]:$event})"
        />
      </template>
      <template v-slot:top></template>
    </SlickTable>
  </div>
</template>

<script>
import SlickTable from "../slick-table/SlickTable2";
import TdEvidence from "../research/facts/cells/TdEvidence";
import TdRelevance from "../research/facts/cells/TdRelevance";
import TdMateriality from "../research/facts/cells/TdMateriality";
import TdAdmissibility from "../research/facts/cells/TdAdmissibility";

export default {
  components: {
    SlickTable,
    TdEvidence,
    TdRelevance,
    TdMateriality,
    TdAdmissibility
  },
  props: {
    items: Array
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Evidence",
          value: "evidence",
          name: "evidence"
        },
        {
          visible: true,
          sortable: false,
          text: "Relevance",
          value: "relevance",
          name: "relevance"
        },
        {
          visible: true,
          sortable: false,
          text: "Materiality",
          value: "materiality",
          name: "materiality"
        },
        {
          visible: true,
          sortable: false,
          text: "Admissibility",
          value: "admissibility",
          name: "admissibility"
        }
      ]
    };
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "evidence") {
        return TdEvidence;
      }
      if (columnName === "relevance") {
        return TdRelevance;
      }
      if (columnName === "materiality") {
        return TdMateriality;
      }
      if (columnName === "admissibility") {
        return TdAdmissibility;
      }
      return "td";
    },
    onEndDragRows() {}
  }
};
</script>
