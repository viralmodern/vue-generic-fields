<template>
  <div>
    <SlickTable
      :items="item"
      :headers="headers"
      :totals="totals"
      :rowsPerPage="20"
      @update:pagination="paging => $emit('updatePagination', paging)"
      @onEndDragRows="onEndDragRows"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :characters="character"
          :index="parseInt(props.index)+1"
          @remove="remove"
        />
      </template>
      <template v-slot:top>
        <v-row justify="end" no-gutters class="ma-2">
          <AddNewFacts class="pl-3 py-2" style="width:100px" />
        </v-row>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";

import TaskCauseOfAction from "./cells/TaskCauseOfAction";
import TaskCharacters from "./cells/TaskCharacters";
import TaskDisputed from "./cells/TaskDisputed";
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
import TdFactView from "./cells/TdFactView";
import TaskNote from "./cells/TaskNote";
import TaskAttachment from "./cells/TaskAttachment";
import TaskLabel from "./cells/TaskLabel";
import TaskTitle from "./cells/TaskTitle";

import AddNewFacts from "../../dialogs/AddNewFacts";

export default {
  props: {
    item: Array,
    character: Array,
    totals: Number
  },
  components: {
    SlickTable,
    AddNewFacts,
    TaskCauseOfAction,
    TaskCharacters,
    TaskDisputed,
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
    TaskAttachment,
    TaskLabel,
    TaskTitle,
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
      if (columnName === "location") {
        return TaskLocation;
      }
      if (columnName === "type") {
        return TaskType;
      }
      if (columnName === "disputed") {
        return TaskDisputed;
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
    ...mapMutations("ht_store/matter/hearing", ["moveRows"]),
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"]),
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
  },
  mounted() {
    this.getDataTagsRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      type: "tag"
    });
    this.getDataTagsRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      type: "issue"
    });
    this.getDataTagsRequest({
      matterId: this.$route.params.matter || this.$route.params.projectId,
      type: "subject"
    });
  }
};
</script>
