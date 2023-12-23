<template>
  <div>
    <div class="font-weight-medium subheading">Question To Answer</div>
    <SlickTable :items="dataQuestionToAnswer" :headers="headers.filter(x=> x.visible)" class="py-2">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateQuestionToAnswerRequest({id: props.dataRow.id, [props.column.name] : $event})"
          @remove="removeQuestionToAnswerRequest(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <v-row justify="end" no-gutters class="ma-2">
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>add</v-icon>
          </v-btn>
          <FormCreateQuestionToAnswer
            :isShowPopup="isShowCreate"
            header="Add new question to answer"
            @closeModal="isShowCreate = false"
            @submit="addQuestionToAnswer"
          />
        </v-row>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdQuestion from "../../toolbox/detail/cells/TdQuestion";
import TdAnswer from "../../toolbox/detail/cells/TdAnswer";
import TdCitation from "../../cells/TdCitation";
import TdRuleOfLaw from "./cells/TdRuleOfLaw";
import TdAction from "../../toolbox/detail/cells/TdAction";
import FormCreateQuestionToAnswer from "../../dialogs/FormCreateQuestionToAnswer";

export default {
  components: {
    SlickTable,
    TdQuestion,
    TdAnswer,
    TdCitation,
    TdRuleOfLaw,
    FormCreateQuestionToAnswer
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Question",
          value: "question",
          name: "question"
        },
        {
          visible: true,
          sortable: false,
          text: "Answer",
          value: "answer",
          name: "answer"
        },
        {
          visible: true,
          sortable: false,
          text: "Citation",
          value: "citations",
          name: "citations"
        },
        {
          visible: true,
          sortable: false,
          text: "RuleOfLaw",
          value: "ruleOfLaw",
          name: "ruleOfLaw"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
        }
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/citations/citationsIssue/detail/questionToAnswer", [
      "dataQuestionToAnswer"
    ])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "question") {
        return TdQuestion;
      }
      if (columnName === "answer") {
        return TdAnswer;
      }
      if (columnName === "citations") {
        return TdCitation;
      }
      if (columnName === "ruleOfLaw") {
        return TdRuleOfLaw;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addQuestionToAnswer(data) {
      this.addQuestionToAnswerRequest(data);
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/matter/citations/citationsIssue/detail/questionToAnswer", [
      "getDataQuestionToAnswerRequest",
      "addQuestionToAnswerRequest",
      "updateQuestionToAnswerRequest",
      "removeQuestionToAnswerRequest"
    ]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  mounted() {
    this.getDataQuestionToAnswerRequest();
  }
};
</script>
