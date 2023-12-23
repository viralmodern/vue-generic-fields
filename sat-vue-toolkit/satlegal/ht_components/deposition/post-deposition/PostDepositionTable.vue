<template>
  <div>
    <v-row no-gutters>
      <v-spacer></v-spacer>
      <ConfigurationColumnTable
        :columns="headersFilter"
        keyText="text"
        @turnOnOffColumn="turnOnOffColumn"
      />
    </v-row>
    <div class="pa-2" v-for="stage in item.list" :key="stage.value">
      <SlickTable
        class="py-2"
        :totals="(dataQuestionStatus[stage.value] || {}).totals"
        :items="(dataQuestionStatus[stage.value] || {}).list"
        :headers="headersFilter.filter(x => x.visible)"
        :idGroup="stage.value + ''"
        :group="stage"
        @watchPagination="updatePagination(stage, $event)"
      >
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name, props.dataRow)"
            :column="props.column"
            :dataRow="props.dataRow"
            @openEmoji="
              openEmoji({
                stageId: stage.value,
                dataRow: props.dataRow,
                column: props.column
              })
            "
            @update="
              updateQuestionStatus(
                stage.value,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeQuestionStatus(stage.value, props.dataRow.id)"
          />
        </template>
        <template v-slot:top>
          <div>
            <v-btn
              outlined
              color="primary"
              @click="
                stageAdd = stage;
                isShowCreate = true;
              "
            >
              Add new
              <v-icon dark>add</v-icon>
            </v-btn>
          </div>
        </template>
      </SlickTable>
    </div>
    <FormCreateQuestionStatus
      :isShowFieldRequestSet="true"
      :isShowPopup="isShowCreate"
      header="Add new request item"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      @closeModal="isShowCreate = false"
      @submit="addQuestionStatus"
    />
    <SelectEmoji
      @select="updateEmoji"
      :isShowPopup="isShowEmoji"
      @closeModal="isShowEmoji = false"
    />
    <!-- bỏ vào từng row thì lag quá nên bỏ 1 cái dùng chung cho nhiều row -->
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import FormCreateQuestionStatus from "../../dialogs/FormCreateQuestionStatus";
import ConfigurationColumnTable from "../../menus/ConfigurationColumnTable";
import DropDown from "../../menus/DropDown";
import TdTextArea from "../../cells/TdTextArea";
import TdSubject from "../../cells/TdSubject";
import TdSwitch from "../../cells/TdSwitch";
import TdRedFlag from "../../cells/TdRedFlag";
import TdBookmark from "../../cells/TdBookmark";
import TdFlash from "../../cells/TdFlash";
import TdEmoji from "../../cells/TdEmoji";
import SelectEmoji from "../../dialogs/SelectEmoji";
import TdFacts from "../../cells/TdFacts";
import TdCharacters from "../../cells/TdCharacters";

import TdAction from "../proceeding/viewGrid/cells/TdAction";
import TdExhibit from "../proceeding/viewGrid/cells/TdExhibit";
import TdPriorStatement from "../proceeding/viewGrid/cells/TdPriorStatement";
import TdAffidavit from "../proceeding/viewGrid/cells/TdAffidavit";
import TdRequest from "../proceeding/viewGrid/cells/TdRequest";
import TdPleadings from "../proceeding/viewGrid/cells/TdPleadings";
import TdDoesNotExist from "../proceeding/viewGrid/cells/TdDoesNotExist";

export default {
  components: {
    SlickTable,
    ConfigurationColumnTable,
    DropDown,
    SelectEmoji,
    FormCreateQuestionStatus
  },
  props: {
    item: Object,
    index: [Number, String],
    panel: [Number, String]
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Question",
          value: "question",
          name: "question",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Answer",
          value: "answer",
          name: "answer",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Key Testimony",
          value: "key_testimony",
          name: "key_testimony",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Follow up",
          value: "follow_up",
          name: "follow_up",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Alert?",
          value: "alert",
          name: "alert",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Attorney Objection",
          value: "attorney_objection",
          name: "attorney_objection",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Objection",
          value: "objection",
          name: "objection",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Subject",
          value: "subject",
          name: "subject",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Deponent Emotion",
          value: "deponent_emotion",
          name: "deponent_emotion",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Related Exhibit",
          value: "related_exhibit",
          name: "related_exhibit",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Related Prior Statement",
          value: "related_prior_statement",
          name: "related_prior_statement",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Related Affidavit",
          value: "related_affidavit",
          name: "related_affidavit",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Related Request",
          value: "related_request",
          name: "related_request",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Related Pleadings",
          value: "related_pleadings",
          name: "related_pleadings",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Related Facts",
          value: "related_facts",
          name: "related_facts",
          type: "cell 2"
        },
        {
          visible: false,
          sortable: false,
          text: "Related Characters",
          value: "related_characters",
          name: "related_characters",
          type: "cell 2"
        }
      ],
      stageAdd: {},
      dataEditEmoji: {},
      isShowCreate: false,
      isShowEmoji: false
    };
  },
  computed: {
    headersFilter() {
      return this.headers.filter(x => x.name !== this.item.field);
    },
    ...mapGetters("ht_store/matter/discovery/deposition/questionStatus", [
      "dataQuestionStatus"
    ]),
    ...mapGetters("ht_store/matter/discovery/deposition/detail", ["deponentType"])
  },
  methods: {
    openEmoji({ stageId, column, dataRow }) {
      this.dataEditEmoji = {
        stageId,
        id: dataRow.id,
        name: column.name,
        value: dataRow[column.name]
      };
      this.isShowEmoji = true;
    },
    updateEmoji(emoji) {
      const stageId = this.dataEditEmoji.stageId;
      const id = this.dataEditEmoji.id;
      const name = this.dataEditEmoji.name;
      const value = this.dataEditEmoji.value + "" + emoji;
      this.updateQuestionStatus(stageId, id, name, value);
      this.isShowEmoji = false;
      this.dataEditEmoji = {};
    },
    turnOnOffColumn({ name, visible }) {
      this.headers.find(x => x.name === name).visible = visible;
    },
    getDisplayComponent(columnName, dataRow) {
      if (columnName === "action") {
        return TdAction;
      }
      if (columnName === "question") {
        return TdTextArea;
      }
      if (columnName === "answer") {
        return TdTextArea;
      }
      if (columnName === "key_testimony") {
        return TdBookmark;
      }
      if (columnName === "follow_up") {
        return TdFlash;
      }
      if (columnName === "alert") {
        return TdRedFlag;
      }
      if (columnName === "attorney_objection") {
        return TdSwitch;
      }
      if (columnName === "objection") {
        return TdSwitch;
      }
      if (columnName === "subject" && dataRow.objection) {
        return TdSubject;
      }
      if (columnName === "deponent_emotion") {
        return TdEmoji;
      }
      if (columnName === "related_exhibit") {
        if (this.deponentType === "type1") return TdExhibit;
        return TdDoesNotExist;
      }
      if (columnName === "related_prior_statement") {
        if (this.deponentType === "type1") return TdPriorStatement;
        return TdDoesNotExist;
      }
      if (columnName === "related_affidavit") {
        if (this.deponentType === "type1") return TdAffidavit;
        return TdDoesNotExist;
      }
      if (columnName === "related_request") {
        if (this.deponentType === "type1") return TdRequest;
        return TdDoesNotExist;
      }
      if (columnName === "related_pleadings") {
        if (this.deponentType === "type1") return TdPleadings;
        return TdDoesNotExist;
      }
      if (columnName === "related_facts") {
        return TdFacts;
      }
      if (columnName === "related_characters") {
        return TdCharacters;
      }
      return "td";
    },
    addQuestionStatus(data) {
      this.addQuestionStatusRequest({ name: this.stageAdd.value, data });
      this.isShowCreate = false;
    },
    updateQuestionStatus(item, questionStatusId, name, value) {
      const data = {
        name: item,
        idParams: {
          questionStatusId
        },
        body: {
          [name]: value
        }
      };
      this.updateQuestionStatusRequest(data);
    },
    removeQuestionStatus(name, questionStatusId) {
      const data = {
        name,
        questionStatusId
      };
      this.removeQuestionStatusRequest(data);
    },
    updatePagination(stage, pagination = {}) {
      if (this.panel === this.index) {
        const { page } = pagination;
        const searchObject = {
          [this.item.field]: stage.value,
          page
        };
        this.getDataQuestionStatusRequest({ stage, searchObject });
      }
    },
    ...mapMutations("ht_store/matter/discovery/deposition/questionStatus", [
      "cleanUpPageData"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/questionStatus", [
      "getDataQuestionStatusRequest",
      "addQuestionStatusRequest",
      "updateQuestionStatusRequest",
      "removeQuestionStatusRequest"
    ])
  },
  mounted() {
    this.updatePagination(
      {
        field: this.item.field,
        name: this.item.name,
        value: this.item.list.map(x => x.value)
      },
      { page: 1 }
    );
  },
  watch: {
    panel() {
      this.updatePagination(
        {
          field: this.item.field,
          name: this.item.name,
          value: this.item.list.map(x => x.value)
        },
        { page: 1 }
      );
    }
  }
};
</script>
