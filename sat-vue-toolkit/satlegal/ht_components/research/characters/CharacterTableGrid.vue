<template>
  <div>
    <SlickTable
      :items="dataProfileCharacter"
      :headers="headers.filter(x=> x.visible)"
      @onEndDragRows="onEndDragRows"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
        />
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";

import TaskFactName from "./cells/TaskFactName";
import TaskFactType from "./cells/TaskFactType";
import TaskTime from "../research/../characters/cells/TaskTime";
import TaskCreateBy from "./cells/TaskCreateBy";
import TaskDateAdded from "./cells/TaskDateAdded";
import TaskTag from "./cells/TaskTag";
import TaskLinkedRecords from "./cells/TaskLinkedRecords";
import TaskAssignee from "./cells/TaskAssignee";

export default {
  components: {
    SlickTable,
    TaskFactName,
    TaskFactType,
    TaskTime,
    TaskCreateBy,
    TaskDateAdded,
    TaskTag,
    TaskLinkedRecords,
    TaskAssignee
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Fact Name",
          value: "factname",
          name: "factname"
        },
        {
          visible: true,
          sortable: false,
          text: "Fact Type ",
          value: "facttype",
          name: "facttype"
        },
        {
          visible: true,
          sortable: false,
          text: "Time",
          value: "time",
          name: "time"
        },
        {
          visible: true,
          sortable: false,
          text: "Assignee",
          value: "assignee",
          name: "assignee"
        },
        {
          visible: true,
          sortable: false,
          text: "Create By",
          value: "createby",
          name: "createby"
        },
        {
          visible: true,
          sortable: false,
          text: "Date Added",
          value: "dateadded",
          name: "dateadded"
        },
        {
          visible: true,
          sortable: false,
          text: "Tag",
          value: "tag",
          name: "tag"
        },
        {
          visible: true,
          sortable: false,
          text: "Linked Records",
          value: "linkedrecords",
          name: "linkedrecords"
        }
      ]
    };
  },
  methods: {
    ...mapActions("ht_store/matter/character", ["getDataCharacterRequest"]),
    getDisplayComponent(columnName) {
      if (columnName === "factname") {
        return TaskFactName;
      }
      if (columnName === "facttype") {
        return TaskFactType;
      }
      if (columnName === "time") {
        return TaskTime;
      }
      if (columnName === "assignee") {
        return TaskAssignee;
      }
      if (columnName === "createby") {
        return TaskCreateBy;
      }
      if (columnName === "dateadded") {
        return TaskDateAdded;
      }
      if (columnName === "tag") {
        return TaskTag;
      }
      if (columnName === "linkedrecords") {
        return TaskLinkedRecords;
      }
      return "td";
    },
    onEndDragRows(data) {
      this.moveRows({ id: this.item.id, moveResult: data });
    },
    ...mapMutations("ht_store/matter/hearing", ["moveRows"])
  },
  computed: {
    ...mapGetters("ht_store/matter/character/characterProfile", [
      "dataProfileCharacter",
      "dataProfile"
    ])
  },
  mounted() {
    this.getDataCharacterRequest();
  }
};
</script>
