<template>
  <v-row  no-gutters>
    <v-col v-for="(item, index) in favorable" :key="index">
      <div class="mt-4 mx-2">
        <span class="subheading font-weight-bold">{{ item.name }}</span>
      </div>
      <SlickTable
        :items="dataFavorableGroup[item.id]"
        :headers="headers"
        @onEndDragRows="onEndDragRows"
        :idGroup="item.id"
        :totals="totals"
        :rowsPerPage="20"
        @update:pagination="paging => $emit('updatePagination', paging)"
      >
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name)"
            :column="props.column"
            :characters="character"
            :dataRow="props.dataRow"
            :index="parseInt(props.index)+1"
            @remove="remove"
          />
        </template>
        <template v-slot:top>
          <AddNewFacts class="pl-3 py-2" style="width:100px" />
        </template>
      </SlickTable>
    </v-col>
  </v-row>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";

import TaskCauseOfAction from "./cells/TaskCauseOfAction";
import TaskCharacters from "./cells/TaskCharacters";
import TaskFavorable from "./cells/TaskFavorable";
import TaskIssue from "./cells/TaskIssue";
import TaskLinkedRecords from "./cells/TaskLinkedRecords";
import TaskLocation from "./cells/TaskLocation";
import TaskRelevant from "./cells/TaskRelevant";
import TaskReliefSought from "./cells/TaskReliefSought";
import TaskSubjectMatter from "./cells/TaskSubjectMatter";
import TaskTime from "./cells/TaskTime";
import TaskType from "./cells/TaskType";
import TaskValueImportant from "./cells/TaskValueImportant";
import TaskNote from "./cells/TaskNote";
import TaskAttachment from "./cells/TaskAttachment";
import TaskLabel from "./cells/TaskLabel";
import TaskTitle from "./cells/TaskTitle";
import TaskDisputed from "./cells/TaskDisputed";
import TdFactView from "./cells/TdFactView";

import AddNewFacts from "../../dialogs/AddNewFacts";

export default {
  props: {
    item: Array,
    character: Array,
    favorable: Array,
    totals: Number
  },
  components: {
    SlickTable,
    AddNewFacts,
    TaskCauseOfAction,
    TaskCharacters,
    TaskFavorable,
    TaskIssue,
    TaskLinkedRecords,
    TaskLocation,
    TaskRelevant,
    TaskReliefSought,
    TaskSubjectMatter,
    TaskTime,
    TaskType,
    TaskValueImportant,
    TaskNote,
    TaskAttachment,
    TaskLabel,
    TaskTitle,
    TaskDisputed,
    TdFactView
  },
  methods: {
    ...mapActions("ht_store/project/research/facts", ["removeFacts"]),
    remove(id) {
      const facts = {
        id,
        matterId: this.$route.params.matter || this.$route.params.projectId
      };
      this.removeFacts(facts);
    },
    getDisplayComponent(columnName) {
      if (columnName === "view") {
        return TdFactView;
      }
      if (columnName === "time") {
        return TaskTime;
      }
      if (columnName === "subjectMatter") {
        return TaskSubjectMatter;
      }
      if (columnName === "title") {
        return TaskTitle;
      }
      if (columnName === "characters") {
        return TaskCharacters;
      }
      if (columnName === "causeOfAction") {
        return TaskCauseOfAction;
      }
      if (columnName === "location") {
        return TaskLocation;
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
      if (columnName === "disputed") {
        return TaskDisputed;
      }
      return "td";
    },
    onEndDragRows(event) {
      if (event.otherArray) {
        const data = {
          taskId: event.idDragging,
          newValue: event.toId,
          columnName: "favorable"
        };
        this.updateTask(data);
      }
    },
    ...mapMutations("ht_store/matter/hearing", ["moveRows"]),
    ...mapActions("ht_store/project/research/facts", ["updateTask"])
  },
  computed: {
    ...mapGetters("ht_store/project/research/facts", ["dataFavorableGroup"]),
    ...mapGetters("ht_store/slick", ["visibleColumns"]),
    headers() {
      return this.visibleColumns
        .map(x => ({
          text: x.title,
          value: x.name,
          name: x.name,
          sortable: false
        }))
        .filter(x => x.name !== "favorable");
    }
  }
};
</script>
