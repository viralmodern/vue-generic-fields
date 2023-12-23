<template>
  <div>
    <div class="font-weight-medium subheading">Related Facts</div>
    <SlickTable :items="dataRelatedFacts" :headers="headers.filter(x=> x.visible)" class="py-2">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateRelatedFactsRequest({id: props.dataRow.id, [props.column.name] : $event})"
          @remove="removeRelatedFactsRequest(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <v-row justify="end" no-gutters class="ma-2">
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>add</v-icon>
          </v-btn>
          <FormCreateRelatedFacts
            :isShowPopup="isShowCreate"
            header="Add new related fact"
            @closeModal="isShowCreate = false"
            @submit="addDeposition"
          />
        </v-row>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdFacts from "../../cells/TdFacts";
import TdAnswer from "./cells/TdAnswer";
import TdRuleOfLaw from "./cells/TdRuleOfLaw";
import TdRelevance from "./cells/TdRelevance";
import TdAction from "../../toolbox/detail/cells/TdAction";
import FormCreateRelatedFacts from "../../dialogs/FormCreateRelatedFacts";

export default {
  components: {
    SlickTable,
    TdFacts,
    TdAnswer,
    TdRuleOfLaw,
    TdRelevance,
    FormCreateRelatedFacts
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Facts",
          value: "facts",
          name: "facts"
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
          text: "How this fact satisfy this rule?",
          value: "answer",
          name: "answer"
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
    ...mapGetters("ht_store/matter/citations/citationsIssue/detail/relatedFacts", [
      "dataRelatedFacts"
    ])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "facts") {
        return TdFacts;
      }
      if (columnName === "answer") {
        return TdAnswer;
      }
      if (columnName === "relevance") {
        return TdRelevance;
      }
      if (columnName === "ruleOfLaw") {
        return TdRuleOfLaw;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addDeposition(data) {
      this.addRelatedFactsRequest(data);
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/matter/citations/citationsIssue/detail/relatedFacts", [
      "getDataRelatedFactsRequest",
      "addRelatedFactsRequest",
      "updateRelatedFactsRequest",
      "removeRelatedFactsRequest"
    ])
  },
  mounted() {
    this.getDataRelatedFactsRequest();
  }
};
</script>
