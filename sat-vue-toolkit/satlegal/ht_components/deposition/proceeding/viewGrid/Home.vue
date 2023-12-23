<template>
  <div>
    <v-row no-gutters>
      <DropDown :item="item" :list="list" key-text="name" @click="handleGroupBy" />
      <v-spacer></v-spacer>
      <ConfigurationColumnTable
        :columns="headersFilter"
        keyText="text"
        @turnOnOffColumn="turnOnOffColumn"
      />
    </v-row>
    <div class="pa-2" v-for="stage in item.list" :key="stage.value">
      <div class="title" v-if="stage.name !== 'All'">{{stage.name}}</div>
      <SlickTable
        class="py-2"
        :totals="(dataQuestionStatus[stage.value] || {}).totals"
        :items="(dataQuestionStatus[stage.value] || {}).list"
        :headers="headersFilter.filter(x => x.visible)"
        :idGroup="stage.value+''"
        :group="stage"
        @watchPagination="updatePagination(stage, $event)"
        @onEndDragRows="onEndDragRows"
      >
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name, props.dataRow)"
            :column="props.column"
            :dataRow="props.dataRow"
            @openEmoji="openEmoji({stageId: stage.value ,dataRow: props.dataRow, column: props.column})"
            @update="updateQuestionStatus(stage.value, props.dataRow.id, props.column.name, $event)"
            @remove="removeQuestionStatus(stage.value, props.dataRow.id)"
          />
        </template>
        <template v-slot:top>
          <div>
            <v-btn outlined color="primary" @click="stageAdd = stage; isShowCreate = true">
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
      :stageAdd="{field: this.item.field, ...this.stageAdd}"
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
import SlickTable from "../../../slick-table/SlickTable2";
import FormCreateQuestionStatus from "../../../dialogs/FormCreateQuestionStatus";
import ConfigurationColumnTable from "../../../menus/ConfigurationColumnTable";
import DropDown from "../../../menus/DropDown";
import TdTextArea from "../../../cells/TdTextArea";
import TdSubject from "../../../cells/TdSubject";
import TdSwitch from "../../../cells/TdSwitch";
import TdRedFlag from "../../../cells/TdRedFlag";
import TdBookmark from "../../../cells/TdBookmark";
import TdFlash from "../../../cells/TdFlash";
import TdEmoji from "../../../cells/TdEmoji";
import TdFacts from "../../../cells/TdFacts";
import TdCharacters from "../../../cells/TdCharacters";
import SelectEmoji from "../../../dialogs/SelectEmoji";
import { valueNoGroup, stageNoGroup } from "../../../../config";

import TdAction from "./cells/TdAction";
import TdExhibit from "./cells/TdExhibit";
import TdPriorStatement from "./cells/TdPriorStatement";
import TdAffidavit from "./cells/TdAffidavit";
import TdRequest from "./cells/TdRequest";
import TdPleadings from "./cells/TdPleadings";
import TdDoesNotExist from "./cells/TdDoesNotExist";

export default {
  components: {
    SlickTable,
    SelectEmoji,
    FormCreateQuestionStatus,
    ConfigurationColumnTable,
    DropDown
  },
  data() {
    return {
      valueNoGroup,
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
      item: {},
      stageAdd: {},
      dataEditEmoji: {},
      list: [
        {
          id: 1,
          field: "all",
          name: "All",
          list: [{ value: valueNoGroup, name: "All" }]
        },
        {
          id: 2,
          field: "objection",
          name: "Objection",
          list: [{ name: "true", value: true }, { name: "false", value: false }]
        }
      ],
      isShowCreate: false,
      isShowEmoji: false,
      stageNoGroup
    };
  },
  created() {
    this.item = this.list[0];
  },
  computed: {
    headersFilter() {
      return this.headers.filter(x => x.name !== this.item.field);
    },
    ...mapGetters("ht_store/matter/discovery/deposition/questionStatus", [
      "dataQuestionStatus"
    ]),
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail",
      "deponentType"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"])
  },
  methods: {
    handleGroupBy(item) {
      if (this.item.name !== item.name) {
        this.item = item;
        this.updatePagination(
          {
            field: this.item.field,
            name: this.item.name,
            value: this.item.list.map(x => x.value)
          },
          { page: 1 }
        );
        this.cleanUpPageData();
      }
    },
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
      const { page } = pagination;
      const searchObject = {
        [this.item.field]: stage.value,
        page
      };
      this.getDataQuestionStatusRequest({ stage, searchObject });
    },
    onEndDragRows(event) {
      const {
        taskId,
        fromListName,
        fromListId,
        newIndex,
        oldIndex,
        toListName,
        toListId
      } = event;
      const drag = {
        taskId,
        fromListId,
        fromListName,
        newIndex,
        oldIndex,
        toListName,
        toListId
      };
      let data = {
        drag,
        idParams: {
          exhibitsId: drag.taskId
        }
      };
      const fromTask = this.dataQuestionStatus[fromListName].list.find(
        x => x.id == taskId
      )[this.item.field];
      if (Array.isArray(fromTask)) {
        // nếu row kéo là 1 mảng thì lấy giá trị cũ + giá trị mới
        const oldValueField = fromTask.filter(pk => pk != fromListId);
        data.body = { [this.item.field]: [...oldValueField, toListId] };
      } else {
        data.body = { [this.item.field]: toListId };
      }
      this.updateQuestionStatusRequest(data);
    },
    getMultipleDataRelated() {
      if (!this.dataDepositionDetail.pk || this.deponentType !== "type1")
        return;
      const idParams = {
        matterId: this.dataDepositionDetail.matter,
        keyPleadingsId: this.dataDepositionDetail.pk
      };
      this.getDataAffidavitStatementRequest({
        stage: this.stageNoGroup,
        idParams
      });
      this.getDataExhibitsRequest({ stage: this.stageNoGroup, idParams });
      this.getDataPriorStatementRequest({ stage: this.stageNoGroup, idParams });
      this.getDataKeyPleadingsRequest({
        stage: this.stageNoGroup,
        idParams
      });
      this.getDataRFPRequest({
        stage: this.stageNoGroup,
        idParams
      });
    },
    ...mapMutations("ht_store/matter/discovery/deposition/questionStatus", [
      "cleanUpPageData"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/questionStatus", [
      "getDataQuestionStatusRequest",
      "addQuestionStatusRequest",
      "updateQuestionStatusRequest",
      "removeQuestionStatusRequest"
    ]),
    ...mapActions(
      "matter/discovery/deposition/preparation/affidavitStatement",
      ["getDataAffidavitStatementRequest"]
    ),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/exhibits", [
      "getDataExhibitsRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/priorStatement", [
      "getDataPriorStatementRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/keyPleadings", [
      "getDataKeyPleadingsRequest"
    ]),
    ...mapActions(
      "matter/discovery/deposition/preparation/requestForProduction",
      ["getDataRFPRequest"]
    )
  },
  mounted() {
    this.updatePagination(this.item, { page: 1 });
    this.getMultipleDataRelated();
  }
};
</script>
