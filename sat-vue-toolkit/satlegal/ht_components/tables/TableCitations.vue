<template>
  <div>
    <SlickTable groupRows="tableCitation" :items="items" :headers="headers">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @remove="$emit('remove',props.dataRow.id)"
          :index="parseInt(props.index)+1"
        />
      </template>
      <template v-slot:top>
        <v-row justify="end" no-gutters class="ma-2">
          <v-btn outlined dark @click="$emit('openAdd')" color="primary">
            Add new
            <v-icon dark>mdi-add</v-icon>
          </v-btn>
        </v-row>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SlickTable from "../slick-table/SlickTable2";

import TaskCreatedBy from "../cells/citations/TaskCreatedBy";
import TaskFavorable from "../cells/citations/TaskFavorable";
import TaskIssue from "../cells/citations/TaskIssue";
import TaskName from "../cells/citations/TaskName";
import TaskVulnerablity from "../cells/citations/TaskVulnerablity";
import TaskTremeant from "../cells/citations/TaskTremeant";
import TaskLastTimeUser from "../cells/citations/TaskLastTimeUser";
import TaskViewDetail from "../cells/citations/TaskViewDetail";
import TaskLimitation from "../cells/citations/TaskLimitation";

export default {
  components: {
    SlickTable,
    TaskViewDetail,
    TaskCreatedBy,
    TaskFavorable,
    TaskIssue,
    TaskName,
    TaskVulnerablity,
    TaskTremeant,
    TaskLimitation,
    TaskLastTimeUser
  },
  props: {
    items: Array
  },
  data() {
    return {
      isShowAdd: false,
      isShowMessage: false
    };
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
      if (columnName === "vulnerablity") {
        return TaskVulnerablity;
      }
      if (columnName === "limitation") {
        return TaskLimitation;
      }
      if (columnName === "favorable") {
        return TaskFavorable;
      }
      if (columnName === "tremeant") {
        return TaskTremeant;
      }
      if (columnName === "issue") {
        return TaskIssue;
      }
      if (columnName === "lastTimeUser") {
        return TaskLastTimeUser;
      }
      return "td";
    },
    addCitation(data) {
      this.$emit("add", data);
      this.isShowAdd = false;
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
