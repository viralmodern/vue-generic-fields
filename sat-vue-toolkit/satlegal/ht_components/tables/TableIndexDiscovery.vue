<template>
  <div>
    <SlickTable :items="dataIndex" :headers="headers" @onEndDragRows="onEndDragRows">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index)+1"
        />
      </template>
      <template v-slot:top>
        <SelectDocument/>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import SlickTable from "../slick-table/SlickTable2";

import TaskCreatedBy from "../cells/index-discovery/TaskCreatedBy";
import TaskFavorable from "../cells/index-discovery/TaskFavorable";
import TaskLinkedRecords from "../cells/index-discovery/TaskLinkedRecords";
import TaskName from "../cells/index-discovery/TaskName";
import TaskProvidedBy from "../cells/index-discovery/TaskProvidedBy";
import TaskTags from "../cells/index-discovery/TaskTags";
import TaskAttachment from "../cells/index-discovery/TaskAttachment";
import TaskViewDetail from "../cells/index-discovery/TaskViewDetail";
import TaskType from "../cells/index-discovery/TaskType";
import TaskAuthoredBy from "../cells/index-discovery/TaskAuthoredBy";
import TaskAddedDate from "../cells/index-discovery/TaskAddedDate";

import SelectDocument from "../dialogs/SelectDocument";

export default {
  components: {
    SlickTable,
    TaskViewDetail,
    TaskCreatedBy,
    TaskFavorable,
    TaskLinkedRecords,
    TaskName,
    TaskProvidedBy,
    TaskTags,
    TaskAttachment,
    TaskType,
    TaskAuthoredBy,
    TaskAddedDate,
    SelectDocument
  },
  props: {
    dataIndex: Array
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "viewDetail") {
        return TaskViewDetail;
      }
      if (columnName === "name") {
        return TaskName;
      }
      if (columnName === "createby") {
        return TaskCreatedBy;
      }
      if (columnName === "providedBy") {
        return TaskProvidedBy;
      }
      if (columnName === "favorable") {
        return TaskFavorable;
      }
      if (columnName === "tags") {
        return TaskTags;
      }
      if (columnName === "linkedrecords") {
        return TaskLinkedRecords;
      }
      if (columnName === "attachment") {
        return TaskAttachment;
      }
      if (columnName === "type") {
        return TaskType;
      }
      if (columnName === "addeddate") {
        return TaskAddedDate;
      }
      if (columnName === "authoredBy") {
        return TaskAuthoredBy;
      }
      return "td";
    },
    onEndDragRows(data) {
      this.moveRows({ id: this.item.id, moveResult: data });
    },
    ...mapMutations("ht_store/matter/hearing", ["moveRows"])
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
