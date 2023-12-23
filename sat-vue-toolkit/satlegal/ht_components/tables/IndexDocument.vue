<template>
  <div>
    <SlickTable :items="dataIndexDocument" :headers="headers" @onEndDragRows="onEndDragRows">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
        />
      </template>
      <template v-slot:top>
        <v-btn @click="newItem" color="primary" outlined>New Item</v-btn>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import SlickTable from "../slick-table/SlickTable2";

import TaskTerms from "../discovery-index/cells-document/TaskTerms";
import TaskDefinitions from "../discovery-index/cells-document/TaskDefinitions";
import TaskPage from "../discovery-index/cells-document/TaskPage";
import TaskActions from "../discovery-index/cells-document/TaskActions";

export default {
  components: {
    SlickTable,
    TaskTerms,
    TaskDefinitions,
    TaskPage,
    TaskActions
  },
  props: {
    dataIndexDocument: Array
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Terms",
          value: "terms",
          name: "terms"
        },
        {
          visible: true,
          sortable: false,
          text: "Definitions",
          value: "definitions",
          name: "definitions"
        },
        {
          visible: true,
          sortable: false,
          text: "Page",
          value: "page",
          name: "page"
        },
        {
          visible: true,
          sortable: false,
          text: "Actions",
          value: "actions",
          name: "actions"
        }
      ]
    };
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "terms") {
        return TaskTerms;
      }
      if (columnName === "definitions") {
        return TaskDefinitions;
      }
      if (columnName === "page") {
        return TaskPage;
      }
      if (columnName === "actions") {
        return TaskActions;
      }
      return "td";
    },
    onEndDragRows(data) {
      this.moveRows({ id: this.item.id, moveResult: data });
    },
    ...mapMutations("ht_store/matter/hearing", ["moveRows"]),
    ...mapActions("ht_store/matter/discovery/index/detailIndex", ["addItemTerminology"]),
    newItem() {
      const data = {
        id: Math.random(),
        terms: "hello",
        definitions: "name definitions",
        page: 1
      };
      this.addItemTerminology(data);
    }
  }
};
</script>
