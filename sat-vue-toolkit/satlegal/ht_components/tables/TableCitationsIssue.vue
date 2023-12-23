<template>
  <div>
    <v-row class="justify-space-between align-center" no-gutters>
      <span class="pa-2 text-xs-left title">Issue</span>
      <ConfigurationColumnTable
        header="Issue"
        :columns="headers"
        keyText="text"
        @turnOnOffColumn="turnOnOffColumn"
      />
    </v-row>
    <SlickTable
      groupRows="tableCitationIssue"
      :items="items"
      :headers="headers.filter(x => x.visible)"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          :index="parseInt(props.index) + 1"
          @update="
            $emit('update', {
              taskId: props.dataRow.id,
              columnName: props.column.name,
              newValue: $event
            })
          "
          @remove="$emit('remove', props.dataRow.id)"
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
import SlickTable from "../slick-table/SlickTable2";

import TdViewDetail from "../cells/citations/TdViewDetail";
import TaskCitationIssue from "../cells/citations/TaskCitationIssue";
import TdFacts from "../cells/TdFacts";
import TdRuleOfLaw from "../citations-issue/detail/cells/TdRuleOfLaw";
import TaskApplicationRule from "../cells/citations/TaskApplicationRule";
import TaskBriefAnswer from "../cells/citations/TaskBriefAnswer";
import ConfigurationColumnTable from "../menus/ConfigurationColumnTable";
export default {
  components: {
    SlickTable,
    TdViewDetail,
    TaskCitationIssue,
    TdFacts,
    TdRuleOfLaw,
    TaskApplicationRule,
    TaskBriefAnswer,
    ConfigurationColumnTable
  },
  props: {
    items: Array
  },
  data() {
    return {
      isShowAdd: false,
      headers: [
        {
          visible: true,
          sortable: false,
          text: "View detail",
          value: "viewDetail",
          name: "viewDetail"
        },
        {
          visible: true,
          sortable: false,
          text: "Issue",
          value: "issue",
          name: "issue"
        },
        {
          visible: true,
          sortable: false,
          text: "Linked facts",
          value: "linkedFact",
          name: "linkedFact"
        },
        {
          visible: true,
          sortable: false,
          text: "Rules Of Law",
          value: "ruleOfLaw",
          name: "ruleOfLaw"
        },
        {
          visible: true,
          sortable: false,
          text: "Application of Fact to Rule of Law",
          value: "applicationFact",
          name: "applicationFact"
        },
        {
          visible: true,
          sortable: false,
          text: "Brief Answer",
          value: "briefanswer",
          name: "briefanswer"
        }
      ]
    };
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "viewDetail") {
        return TdViewDetail;
      }
      if (columnName === "issue") {
        return TaskCitationIssue;
      }
      if (columnName === "linkedFact") {
        return TdFacts;
      }
      if (columnName === "ruleOfLaw") {
        return TdRuleOfLaw;
      }
      if (columnName === "applicationFact") {
        return TaskApplicationRule;
      }
      if (columnName === "briefanswer") {
        return TaskBriefAnswer;
      }
      return "td";
    },
    turnOnOffColumn({ name, visible }) {
      this.headers.find(x => x.name === name).visible = visible;
    }
  }
};
</script>
