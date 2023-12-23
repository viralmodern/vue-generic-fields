<template>
  <div>
    <div class="font-weight-medium subheading">Hight light</div>
    <SlickTable :items="dataHighlight" :headers="headers.filter(x=> x.visible)" class="py-2">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateHighlightRequest({id: props.dataRow.id, [props.column.name] : $event})"
          @remove="removeHighlightRequest(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <v-row justify="end" class="ma-2">
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>add</v-icon>
          </v-btn>
          <FormCreateHighlight
            :isShowPopup="isShowCreate"
            header="Add new question to answer"
            @closeModal="isShowCreate = false"
            @submit="addHighlight"
          />
        </v-row>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../../slick-table/SlickTable2";
import TdTextArea from "../../../invoice/cells/TdTextArea";
import TdTags from "../cells/TdTags2";
import TdCitation from "../../../cells/TdCitation";
import TdFacts from "../../../cells/TdFacts";
import TdLinkRecords from "../cells/TdLinkRecords";
import TdAction from "../../../toolbox/detail/cells/TdAction";
import FormCreateHighlight from "../../../dialogs/FormCreateHighlight";

export default {
  components: {
    SlickTable,
    TdTextArea,
    TdTags,
    TdCitation,
    TdFacts,
    TdLinkRecords,
    TdAction,
    FormCreateHighlight
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Hightlight from this Agreement",
          value: "hightlight",
          name: "hightlight"
        },
        {
          visible: true,
          sortable: false,
          text: "Implication",
          value: "implication",
          name: "implication"
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
          text: "Citation",
          value: "citations",
          name: "citations"
        },
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
          text: "LinkRecords",
          value: "linkRecords",
          name: "linkRecords"
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
    ...mapGetters("ht_store/matter/partient/profile/detail/agreementDetail/hightlight", [
      "dataHighlight"
    ])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "hightlight") {
        return TdTextArea;
      }
      if (columnName === "implication") {
        return TdTextArea;
      }
      if (columnName === "tags") {
        return TdTags;
      }
      if (columnName === "citations") {
        return TdCitation;
      }
      if (columnName === "facts") {
        return TdFacts;
      }
      if (columnName === "linkRecords") {
        return TdLinkRecords;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addHighlight(data) {
      this.addHighlightRequest(data);
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/matter/partient/profile/detail/agreementDetail/hightlight", [
      "getDataHighlightRequest",
      "addHighlightRequest",
      "updateHighlightRequest",
      "removeHighlightRequest"
    ]),
    ...mapActions("ht_store/matter/citations", ["getDataCitationsFromApi"]),
    ...mapActions("ht_store/project/research/facts", ["getDataFactsResearchRequest"]),
    ...mapActions("ht_store/project/members", ["getDataMembersRequest"])
  },
  mounted() {
    this.getDataHighlightRequest();
    this.getDataCitationsFromApi();
    this.getDataFactsResearchRequest({matterId: this.$route.params.matter || this.$route.params.projectId, page: 1});
  }
};
</script>
