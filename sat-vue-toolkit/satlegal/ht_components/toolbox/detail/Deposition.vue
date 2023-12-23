<template>
  <div>
    <div class="font-weight-medium subheading">Deposition</div>
    <SlickTable
      @update:pagination="updatePagination"
      :totals="totals"
      :items="dataDeposition"
      :headers="headers.filter(x=> x.visible)"
      class="py-2"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateDeposition(props.dataRow.id, props.column.name, $event)"
          @remove="removeDeposition(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>mdi-add</v-icon>
          </v-btn>
          <FormCreateDeposition
            :isShowPopup="isShowCreate"
            :listMembers="members"
            :listCharacters="character"
            :tags="tag"
            header="Add new deposition"
            @closeModal="isShowCreate = false"
            @submit="addDeposition"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdTime from "./cells/TdTime";
import TdQuestion from "./cells/TdQuestion";
import TdAsker from "./cells/TdAsker";
import TdAnswer from "./cells/TdAnswer";
import TdRespondent from "./cells/TdRespondent";
import TdCharacters from "./cells/TdCharacters";
import TdTags from "./cells/TdTags";
import TdAction from "./cells/TdAction";
import FormCreateDeposition from "../../dialogs/FormCreateDeposition";

export default {
  components: {
    SlickTable,
    TdTime,
    TdQuestion,
    TdAsker,
    TdAnswer,
    TdRespondent,
    TdCharacters,
    TdTags,
    FormCreateDeposition
  },
  data() {
    return {
      headers: [
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
          text: "Asker",
          value: "asker",
          name: "asker"
        },
        {
          visible: true,
          sortable: false,
          text: "Respondent",
          value: "respondent",
          name: "respondent"
        },
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
          text: "Characters",
          value: "characters",
          name: "characters"
        },
        {
          visible: true,
          sortable: false,
          text: "Tags",
          value: "tags",
          name: "tags"
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
    ...mapGetters("ht_store/matter/discovery/toolbox/detail/deposition", [
      "dataDeposition",
      "totals"
    ]),
    ...mapGetters("ht_store/matter/tags", ["tag"]),
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/matter/discovery/toolbox/detail", ["dataToolboxDetail"])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "time") {
        return TdTime;
      }
      if (columnName === "asker") {
        return TdAsker;
      }
      if (columnName === "respondent") {
        return TdRespondent;
      }
      if (columnName === "question") {
        return TdQuestion;
      }
      if (columnName === "answer") {
        return TdAnswer;
      }
      if (columnName === "characters") {
        return TdCharacters;
      }
      if (columnName === "tags") {
        return TdTags;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addDeposition(dataForm) {
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id
        },
        body: dataForm
      };
      this.addDepositionRequest(data);
      this.isShowCreate = false;
    },
    updateDeposition(depositionId, name, value) {
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id,
          depositionId
        },
        body: {
          [name]: value
        }
      };
      this.updateDepositionRequest(data);
    },
    removeDeposition(depositionId) {
      const data = {
        matterId: this.dataToolboxDetail.matter,
        toolboxId: this.dataToolboxDetail.id,
        depositionId
      };
      this.removeDepositionRequest(data);
    },
    updatePagination({ page }) {
      const matterId = this.dataToolboxDetail.matter;
      const toolboxId = this.dataToolboxDetail.id;
      this.getDataDepositionRequest({ matterId, toolboxId, page });
    },
    ...mapActions("ht_store/matter/discovery/toolbox/detail/deposition", [
      "getDataDepositionRequest",
      "addDepositionRequest",
      "updateDepositionRequest",
      "removeDepositionRequest"
    ])
  }
};
</script>
