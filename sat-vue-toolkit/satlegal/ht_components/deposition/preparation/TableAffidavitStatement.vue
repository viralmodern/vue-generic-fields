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
    <div class="py-2" v-for="(stage, index) in item.list" :key="stage.name">
      <div class="font-weight-medium text-body-2" v-if="stage.name !== 'all'">
        <Tags :color="stage.color" :text="stage.name"/>
      </div>
      <SlickTable
        ref="refSlickTable"
        class="py-2"
        :totals="(dataAffidavitStatement[stage.value] || {}).totals"
        :items="(dataAffidavitStatement[stage.value] || {}).list"
        :headers="headersFilter.filter(x => x.visible)"
        :idGroup="stage.value"
        :group="stage"
        :loading="isLoadingGet[stage.value]"
        @watchPagination="watchPaginationTable($event, {...stage, field: item.field}, index)"
        @onEndDragRows="onEndDragRows"
      >
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name)"
            :column="props.column"
            :dataRow="props.dataRow"
            :matterId="dataDepositionDetail.matter"
            :depositionId="dataDepositionDetail.pk"
            @update="
              updateAffidavitStatement(
                stage.value,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeAffidavitStatement(stage.name, props.dataRow, $event)"
          />
        </template>
        <template v-slot:top>
          <div class="pa-2 text-right">
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
    <FormCreateAffidavitStatement
      ref="refFormCreateAffidavitStatement"
      :isLoadingAdd="isLoadingAdd"
      :isShowPopup="isShowCreate"
      header="Add new"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      :dataCharacters="character"
      @closeModal="isShowCreate = false"
      @submit="addAffidavitStatement"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Tags from "../../chips/Tags";
import SlickTable from "../../slick-table/SlickTable2";
import TdTextArea from "../../cells/TdTextArea";
import TdCharacters from "../../cells/TdCharacterSingle";
import TdRedFlag from "../../cells/TdRedFlag";
import TdDateMonthPicker from "../../cells/TdDateMonthPicker";
import FormCreateAffidavitStatement from "../../dialogs/FormCreateAffidavitStatement";
import DropDown from "../../menus/DropDown";
import ConfigurationColumnTable from "../../menus/ConfigurationColumnTable";

import TdDelete from "./cells/TdDelete";
import TdComment from "./cells/table-affs/TdComment";

export default {
  components: {
    Tags,
    SlickTable,
    FormCreateAffidavitStatement,
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
          text: "Affidavit Statement",
          value: "name",
          name: "name",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Date Statement Made",
          value: "date",
          name: "date",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Perjury Riks?",
          value: "perjury_risk",
          name: "perjury_risk",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Who made this Affidavit Statement?",
          value: "make_by",
          name: "make_by",
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
          text: "Follow up?",
          value: "follow_up",
          name: "follow_up",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Comment",
          value: "comment",
          name: "comment",
          type: "cell"
        }
      ],
      item: {},
      stageAdd: {},
      list: [
        {
          id: 1,
          field: "all",
          name: "All",
          list: [{ id: 1, value: "all", name: "all" }]
        },
        {
          id: 2,
          field: "make_by",
          name: "Characters"
        }
      ],
      isShowCreate: false,
      isLoadingAdd: false,
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
    ...mapGetters(
      "matter/discovery/deposition/preparation/affidavitStatement",
      ["dataAffidavitStatement", "isLoadingGet"]
    ),
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail"
    ]),
  },
  methods: {
    watchPaginationTable(pagination, stage, index) {
      this.$refs.refSlickTable[index].$el.scrollIntoView({top: 0, behavior: 'smooth'});
      setTimeout(() => {
        this.updatePagination({
          page: pagination.page,
          ungroup: stage.value === 'all',
          group_items: stage.value === 'all' ? undefined : [stage.value],
          group_by: stage.value === 'all' ? undefined : stage.field,
        });
      }, 0);
    },
    handleGroupBy(item) {
      if (this.item.name !== item.name) {
        this.item = item;
        const searchObject = {
          page: 1,
          group_by: this.item.field,
          group_items: this.item.list.map(x => x.value),
          ungroup: this.item.field === "all"
        };
        this.updatePagination(searchObject);
        this.clearData();
      }
    },
    turnOnOffColumn({ name, visible }) {
      this.headers.find(x => x.name === name).visible = visible;
    },
    getDisplayComponent(columnName, nameGroupByCurrent) {
      if (columnName === "action") {
        return TdDelete;
      }
      if (columnName === "name") {
        return TdTextArea;
      }
      if (columnName === "date") {
        return TdDateMonthPicker;
      }
      if (columnName === "perjury_risk") {
        return TdRedFlag;
      }
      if (columnName === "make_by" && columnName !== nameGroupByCurrent) {
        return TdCharacters;
      }
      if (columnName === "question") {
        return TdTextArea;
      }
      if (columnName === "answer") {
        return TdTextArea;
      }
      if (columnName === "follow_up") {
        return TdRedFlag;
      }
      if (columnName === "comment") {
        return TdComment;
      }
      return "td";
    },
    async addAffidavitStatement(dataForm) {
      try {
        this.isLoadingAdd = true;
        const data = {
          name: this.stageAdd.value,
          idParams: {
            matterId: this.dataDepositionDetail.matter,
            depositionId: this.dataDepositionDetail.pk
          },
          body: dataForm
        };
        await this.addAffidavitStatementRequest(data);
        this.$refs.refFormCreateAffidavitStatement.clear();
        this.isLoadingAdd = false;
        this.isShowCreate = false;
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    updateAffidavitStatement(item, affidavitStatementId, name, value) {
      const data = {
        name: item,
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          affidavitStatementId
        },
        body: {
          [name]: value
        }
      };
      this.updateAffidavitStatementRequest(data);
    },
    async removeAffidavitStatement(name, row, close) {
      const data = {
        name,
        matterId: this.dataDepositionDetail.matter,
        depositionId: this.dataDepositionDetail.pk,
        affidavitStatementId: row.id
      };
      data.isFieldArray = Array.isArray(row[this.item.field]);
      await this.removeAffidavitStatementRequest(data);
      close();
    },
    updatePagination({ page, ungroup, group_by, group_items }) {
      if (this.panel === this.index) {
        const searchObject = {
          page,
          group_by,
          ungroup,
          group_items,
        };
        const idParams = {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk
        };
        this.getDataAffidavitStatementRequest({ idParams, searchObject });
      }
    },
    onEndDragRows(event) {
      const {
        taskId,
        fromListId,
        newIndex,
        oldIndex,
        toListId
      } = event;
      const drag = {
        taskId,
        fromListId,
        newIndex,
        oldIndex,
        toListId
      };
      let data = {
        drag,
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          affidavitStatementId: drag.taskId
        }
      };
      const fromTask = this.dataAffidavitStatement[fromListId].list.find(
        x => x.id == taskId
      )[this.item.field];
      if (Array.isArray(fromTask)) {
        // nếu row kéo là 1 mảng thì lấy giá trị cũ + giá trị mới
        const oldValueField = fromTask.filter(pk => pk != fromListId);
        data.body = { [this.item.field]: [...oldValueField, toListId] };
      } else {
        data.body = { [this.item.field]: toListId };
      }
      this.updateAffidavitStatementRequest(data);
    },
    ...mapMutations(
      "matter/discovery/deposition/preparation/affidavitStatement",
      ["clearData"]
    ),
    ...mapActions(
      "matter/discovery/deposition/preparation/affidavitStatement",
      [
        "getDataAffidavitStatementRequest",
        "addAffidavitStatementRequest",
        "updateAffidavitStatementRequest",
        "removeAffidavitStatementRequest"
      ]
    )
  },
  mounted() {
    this.list[1].list = this.character.map(x => ({ value: x.id, ...x }));
  },
  watch: {
    character(data) {
      this.list[1].list = data.map(x => ({ value: x.id, ...x }));
    },
    panel() {
      if (this.item.field === "all") {
        this.updatePagination({ page: 1, ungroup: true });
      }
    }
  }
};
</script>
