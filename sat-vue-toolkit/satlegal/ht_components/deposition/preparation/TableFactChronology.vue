<template>
  <div class="px-2">
    <v-row no-gutters>
      <DropDown
        :item="item"
        :list="list"
        key-text="name"
        @click="handleGroupBy"
      />
      <v-spacer></v-spacer>
      <ConfigurationColumnTable
        :columns="headersFilter"
        keyText="text"
        @turnOnOffColumn="turnOnOffColumn"
      />
    </v-row>
    <div class="pa-2" v-for="stage in item.list" :key="stage.name">
      <div class="font-weight-medium text-body-2" v-if="stage.name !== 'all'">
        {{ stage.name }}
      </div>
      <SlickTable
        class="py-2"
        :totals="(dataFactChronology[stage.name] || {}).totals"
        :items="(dataFactChronology[stage.name] || {}).list"
        :headers="headersFilter.filter(x => x.visible)"
        :idGroup="stage.value + ''"
        :group="stage"
        @update:pagination="updatePagination(stage, $event)"
        @onEndDragRows="onEndDragRows"
      >
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name)"
            :column="props.column"
            :dataRow="props.dataRow"
            @update="
              updateFactChronology(
                stage.name,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeFactChronology(stage.name, props.dataRow)"
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
    <FormCreateFactChronology
      :isShowPopup="isShowCreate"
      header="Add new"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      :appConfigs="appConfigs"
      :dataCharacters="character"
      @closeModal="isShowCreate = false"
      @submit="addFactChronology"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdCharacters from "../../cells/TdCharacters";
import TdSwitch from "../../cells/TdSwitch";
import TdTextArea from "../../cells/TdTextArea";
import TdInlineEdit from "../../cells/TdInlineEdit";
import TdCircular from "../../cells/TdCircular";
import TdSubject from "../../cells/TdSubject";
import TdIssue from "../../cells/TdIssue";
import TdDateMonthPicker from "../../cells/TdDateMonthPicker";
import TdTimePicker from "../../cells/TdTimePicker";
import FormCreateFactChronology from "../../dialogs/FormCreateFactChronology";
import DropDown from "../../menus/DropDown";
import ConfigurationColumnTable from "../../menus/ConfigurationColumnTable";

import TdType from "./cells/TdType";
import TdNote from "./cells/table-fact/TdNote";
import TdAttachment from "./cells/table-fact/TdAttachment";
import TdFavorable from "./cells/table-fact/TdFavorable";
import TdDelete from "./cells/TdDelete";

export default {
  components: {
    SlickTable,
    FormCreateFactChronology,
    DropDown,
    ConfigurationColumnTable
  },
  props: {
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
          text: "Title",
          value: "title",
          name: "title",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Date",
          value: "date",
          name: "date",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Time",
          value: "time",
          name: "time",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Subject Matter",
          value: "subject",
          name: "subject",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Characters",
          value: "characters",
          name: "characters",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Cause Of Action",
          value: "cause_of_action",
          name: "cause_of_action",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Location",
          value: "location",
          name: "location",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Type",
          value: "type",
          name: "type",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Disputed",
          value: "disputed",
          name: "disputed",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Issue",
          value: "issues",
          name: "issues",
          type: "cell2"
        },
        {
          visible: false,
          sortable: false,
          text: "Relief Sought",
          value: "relief_sought",
          name: "relief_sought",
          type: "cell2"
        },
        {
          visible: false,
          sortable: false,
          text: "Favorable",
          value: "favorable",
          name: "favorable",
          type: "cell2"
        },
        {
          visible: false,
          sortable: false,
          text: "Important",
          value: "important",
          name: "important",
          type: "cell2"
        },
        {
          visible: false,
          sortable: false,
          text: "Relevant",
          value: "relevant",
          name: "relevant",
          type: "cell2"
        },
        {
          visible: false,
          sortable: false,
          text: "Note",
          value: "notes",
          name: "notes",
          type: "cell2"
        },
        {
          visible: false,
          sortable: false,
          text: "Attachment",
          value: "attachments",
          name: "attachments",
          type: "cell2"
        }
      ],
      item: {},
      stageAdd: {},
      list: [
        {
          id: 1,
          field: "all",
          name: "All",
          list: [{ id: 1, name: "all" }]
        },
        {
          id: 2,
          field: "characters",
          name: "Characters"
        },
        {
          id: 3,
          field: "location",
          name: "Location"
        },
        {
          id: 4,
          field: "disputed",
          name: "Disputed",
          list: [
            { id: 4, name: "true", value: true },
            { id: 5, name: "false", value: false }
          ]
        },
        {
          id: 5,
          field: "issues",
          name: "Issues"
        },
        {
          id: 6,
          field: "type",
          name: "Type"
        }
      ],
      isShowCreate: false
    };
  },
  created() {
    this.item = this.list[0];
  },
  computed: {
    headersFilter() {
      return this.headers.filter(x => x.name !== this.item.field);
    },
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/factChronology", [
      "dataFactChronology"
    ]),
    ...mapGetters("ht_store/matter/issues", ["dataIssues"])
  },
  methods: {
    handleGroupBy(item) {
      if (this.item.name !== item.name) {
        this.item = item;
        this.clearData();
      }
    },
    turnOnOffColumn({ name, visible }) {
      this.headers.find(x => x.name === name).visible = visible;
    },
    getDisplayComponent(columnName) {
      if (columnName === "action") {
        return TdDelete;
      }
      if (columnName === "title") {
        return TdInlineEdit;
      }
      if (columnName === "date") {
        return TdDateMonthPicker;
      }
      if (columnName === "time") {
        return TdTimePicker;
      }
      if (columnName === "subject") {
        return TdSubject;
      }
      if (columnName === "characters") {
        return TdCharacters;
      }
      if (columnName === "cause_of_action") {
        return TdTextArea;
      }
      // if (columnName === "location") {
      //   return TdType;
      // }
      if (columnName === "type") {
        return TdType;
      }
      if (columnName === "disputed") {
        return TdSwitch;
      }
      if (columnName === "issues") {
        return TdIssue;
      }
      if (columnName === "relief_sought") {
        return TdTextArea;
      }
      if (columnName === "favorable") {
        return TdFavorable;
      }
      if (columnName === "important") {
        return TdCircular;
      }
      if (columnName === "relevant") {
        return TdCircular;
      }
      if (columnName === "notes") {
        return TdNote;
      }
      if (columnName === "attachments") {
        return TdAttachment;
      }
      return "td";
    },
    addFactChronology(data) {
      this.addFactChronologyRequest({ name: this.stageAdd.name, data });
      this.isShowCreate = false;
    },
    updateFactChronology(item, factChronologyId, name, value) {
      const data = {
        name: item,
        idParams: {
          factChronologyId
        },
        body: {
          [name]: value
        }
      };
      this.updateFactChronologyRequest(data);
    },
    removeFactChronology(name, row) {
      const data = {
        name,
        factChronologyId: row.id
      };
      data.isFieldArray = Array.isArray(row[this.item.field]);
      this.removeFactChronologyRequest(data);
    },
    updatePagination(stage) {
      if (this.panel === this.index) {
        const searchObject = {
          [this.item.field]: stage.value
        };
        this.getDataFactChronologyRequest({ stage, searchObject });
      }
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
        fromListName,
        newIndex,
        oldIndex,
        toListName
      };
      let data = {
        drag,
        idParams: {
          factChronologyId: drag.taskId
        }
      };
      const fromTask = this.dataFactChronology[fromListName].list.find(
        x => x.id == taskId
      )[this.item.field];
      if (Array.isArray(fromTask)) {
        // nếu row kéo là 1 mảng thì lấy giá trị cũ + giá trị mới
        const oldValueField = fromTask.filter(pk => pk != fromListId);
        data.body = { [this.item.field]: [...oldValueField, toListId] };
      } else {
        data.body = { [this.item.field]: toListId };
      }
      this.updateFactChronologyRequest(data);
    },
    ...mapMutations("ht_store/matter/discovery/deposition/preparation/factChronology", [
      "clearData"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/factChronology", [
      "getDataFactChronologyRequest",
      "addFactChronologyRequest",
      "updateFactChronologyRequest",
      "removeFactChronologyRequest"
    ])
  },
  mounted() {
    this.list[5].list = this.appConfigs.factType;
    this.list[1].list = this.character.map(x => ({ value: x.id, ...x }));
    this.list[4].list = this.dataIssues.map(x => ({ value: x.id, ...x }));
  },
  watch: {
    dataIssues(data) {
      this.list[4].list = data.map(x => ({ value: x.id, ...x }));
    },
    character(data) {
      this.list[1].list = data.map(x => ({ value: x.id, ...x }));
    },
    panel() {
      if (this.item.field === "all") {
        this.updatePagination({ name: "all" });
      }
    }
  }
};
</script>
