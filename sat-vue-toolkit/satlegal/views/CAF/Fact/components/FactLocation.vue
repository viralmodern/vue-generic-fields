<template>
  <v-row  no-gutters>
    <v-col v-for="(item, index) in locations" :key="index">
      <div class="mt-4 mx-2">
        <span class="subheading font-weight-bold">{{ item.name }}</span>
      </div>
      <SlickTable
        :items="dataFactLocation[item.id]"
        :headers="headers"
        @onEndDragRows="onEndDragRows"
      >
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name)"
            :column="props.column"
            :dataRow="props.dataRow"
            :characters="character"
            :index="parseInt(props.index)+1"
          />
        </template>
        <template v-slot:top>
          <AddNewFacts class="pl-3 py-2" style="width:100px"/>
        </template>
      </SlickTable>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";

import TaskCauseOfAction from "./cells/TaskCauseOfAction";
import TaskCharacters from "./cells/TaskCharacters";
import TaskFavorable from "./cells/TaskFavorable";
import TaskIssue from "./cells/TaskIssue";
import TaskLinkedRecords from "./cells/TaskLinkedRecords";
import TaskRelevant from "./cells/TaskRelevant";
import TaskReliefSought from "./cells/TaskReliefSought";
import TaskSubjectMatter from "./cells/TaskSubjectMatter";
import TaskTime from "./cells/TaskTime";
import TaskType from "./cells/TaskType";
import TaskValueImportant from "./cells/TaskValueImportant";
import TdFactView from "./cells/TdFactView";
import TaskNote from "./cells/TaskNote";
import TaskAttachment from "./cells/TaskAttachment";
import TaskLabel from "./cells/TaskLabel";
import TaskTitle from "./cells/TaskTitle";
import AddNewFacts from "../../dialogs/AddNewFacts";

export default {
  props: {
    item: Array,
    character: Array
  },
  components: {
    SlickTable,
    AddNewFacts,
    TaskCauseOfAction,
    TaskCharacters,
    TaskFavorable,
    TaskIssue,
    TaskLinkedRecords,
    TaskRelevant,
    TaskReliefSought,
    TaskSubjectMatter,
    TaskTime,
    TaskType,
    TaskValueImportant,
    TdFactView,
    TaskNote,
    TaskAttachment,
    TaskLabel,
    TaskTitle
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "view") {
        return TdFactView;
      }
      if (columnName === "time") {
        return TaskTime;
      }
      if (columnName === "title") {
        return TaskTitle;
      }
      if (columnName === "subjectMatter") {
        return TaskSubjectMatter;
      }
      if (columnName === "characters") {
        return TaskCharacters;
      }
      if (columnName === "causeOfAction") {
        return TaskCauseOfAction;
      }
      if (columnName === "type") {
        return TaskType;
      }
      if (columnName === "issue") {
        return TaskIssue;
      }
      if (columnName === "linkedRecords") {
        return TaskLinkedRecords;
      }
      if (columnName === "reliefSought") {
        return TaskReliefSought;
      }
      if (columnName === "favorable") {
        return TaskFavorable;
      }
      if (columnName === "valueImportant") {
        return TaskValueImportant;
      }
      if (columnName === "relevant") {
        return TaskRelevant;
      }
      if (columnName === "note") {
        return TaskNote;
      }
      if (columnName === "attachment") {
        return TaskAttachment;
      }
      if (columnName === "label") {
        return TaskLabel;
      }
      return "td";
    },
    onEndDragRows() {},
    ...mapMutations("ht_store/matter/hearing", ["moveRows"])
  },
  computed: {
    ...mapGetters("ht_store/project/research/facts", ["dataFactLocation"]),
    ...mapGetters("ht_store/matter/location", ["locations"]),
    ...mapGetters("ht_store/slick", ["visibleColumns"]),
    headers() {
      return this.visibleColumns
        .map(x => ({
          text: x.title,
          value: x.name,
          name: x.name,
          sortable: false
        }))
        .filter(x => x.name !== "location");
    }
  }
};
</script>
