<template>
  <div>
    <v-row no-gutters>
      <DropDown
        :item="item"
        :list="list"
        key-text="name"
        @click="handleGroupBy"
      />
    </v-row>
    <div class="py-2" v-for="(stage, index) in item.list" :key="stage.name">
      <div class="font-weight-medium text-body-2" v-if="stage.name !== 'all'">
        <Tags :color="stage.color" :text="stage.name"/>
      </div>
      <SlickTable
        ref="refSlickTable"
        class="py-2"
        :totals="(dataRFP[stage.value] || {}).totals"
        :items="(dataRFP[stage.value] || {}).list"
        :headers="headersFilter"
        :idGroup="stage.value"
        :group="stage"
        :loading="isLoadingGet[stage.value]"
        @watchPagination="watchPaginationTable($event, {...stage, field: item.field}, index)"
        @onEndDragRows="onEndDragRows"
      >
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name, stage.field)"
            :column="props.column"
            :dataRow="props.dataRow"
            :matterId="dataDepositionDetail.matter"
            :depositionId="dataDepositionDetail.pk"
            @update="
              updateRFP(
                stage.value,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeRFP(stage.value, props.dataRow, $event)"
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
    <FormCreateRFP
      ref="refFormCreateRFP"
      :isLoadingAdd="isLoadingAdd"
      :isShowPopup="isShowCreate"
      header="Add new"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      :appConfigs="appConfigs"
      :dataSource="dataSource"
      :dataCharacters="character"
      @closeModal="isShowCreate = false"
      @submit="addRFP"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Tags from "../../chips/Tags";
import SlickTable from "../../slick-table/SlickTable2";
import TdInlineEdit from "../../cells/TdInlineEdit";
import TdSwitch from "../../cells/TdSwitch";
import TdTextArea from "../../cells/TdTextArea";
import TdCharacters from "../../cells/TdCharacters";
import FormCreateRFP from "../../dialogs/FormCreateRFP";
import DropDown from "../../menus/DropDown";
import TdSource from "./cells/table-RFP/TdSource";
import TdAttachment from "./cells/table-RFP/TdAttachment";
import TdNote from "./cells/table-RFP/TdNote";

import TdDelete from "./cells/TdDelete";
import TdDestroyed from "./cells/table-RFP/TdDestroyed";
export default {
  components: {
    Tags,
    SlickTable,
    FormCreateRFP,
    DropDown
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
          text: "Document Name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Produced",
          value: "produced",
          name: "produced"
        },
        {
          visible: true,
          sortable: false,
          text: "Source",
          value: "sources",
          name: "sources"
        },
        {
          visible: true,
          sortable: false,
          text: "Step to locate request documents",
          value: "step_to_locate",
          name: "step_to_locate"
        },
        {
          visible: true,
          sortable: false,
          text: "Destroyed",
          value: "destroyed",
          name: "destroyed"
        },
        {
          visible: true,
          sortable: false,
          text: "3rd Parties have this document",
          value: "docs_characters",
          name: "docs_characters"
        },
        {
          visible: true,
          sortable: false,
          text: "Attachments",
          value: "attachments",
          name: "attachments"
        },
        {
          visible: true,
          sortable: false,
          text: "Notes",
          value: "notes",
          name: "notes"
        },
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action"
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
          field: "sources",
          name: "Sources"
        }
      ],
      isShowCreate: false,
      isLoadingAdd: false
    };
  },
  created() {
    this.item = this.list[0];
  },
  computed: {
    headersFilter() {
      return this.headers.filter(x => x.name !== this.item.field);
    },
    ...mapGetters(
      "matter/discovery/deposition/preparation/requestForProduction",
      ["dataRFP", "isLoadingGet"]
    ),
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    ...mapGetters("ht_store/matter/discovery/deposition/source", ["dataSource"]),
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail"
    ])
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
    getDisplayComponent(columnName, nameGroupByCurrent) {

      if (columnName === "name") {
        return TdInlineEdit;
      }
      if (columnName === "produced") {
        return TdSwitch;
      }
      if (columnName === "sources" && columnName !== nameGroupByCurrent) {
        return TdSource;
      }
      if (columnName === "step_to_locate") {
        return TdTextArea;
      }
      if (columnName === "destroyed") {
        return TdDestroyed;
      }
      if (columnName === "docs_characters") {
        return TdCharacters;
      }
      if (columnName === "attachments") {
        return TdAttachment;
      }
      if (columnName === "notes") {
        return TdNote;
      }
      if (columnName === "action") {
        return TdDelete;
      }
      return "td";
    },
    async addRFP(dataForm) {
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
        await this.addRFPRequest(data);
        this.$refs.refFormCreateRFP.clear();
        this.isLoadingAdd = false;
        this.isShowCreate = false;
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    updateRFP(item, RFPId, name, value) {
      const data = {
        name: item,
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          RFPId
        },
        body: {
          [name]: value
        }
      };
      this.updateRFPRequest(data);
    },
    async removeRFP(name, row, close) {
      const data = {
        name,
        matterId: this.dataDepositionDetail.matter,
        depositionId: this.dataDepositionDetail.pk,
        RFPId: row.id
      };
      data.isFieldArray = Array.isArray(row[this.item.field]);
      await this.removeRFPRequest(data);
      close();
    },
    updatePagination({ page, ungroup, group_by, group_items }) {
      if (this.panel === this.index) {
        const searchObject = {
          page,
          group_by,
          ungroup,
          group_items
        };
        const idParams = {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk
        };
        this.getDataRFPRequest({ idParams, searchObject });
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
        name: toListId,
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          RFPId: drag.taskId
        }
      };
      const fromTask = this.dataRFP[fromListId].list.find(
        x => x.id == taskId
      )[this.item.field];
      if (Array.isArray(fromTask)) {
        // nếu row kéo là 1 mảng thì lấy giá trị cũ + giá trị mới
        const oldValueField = fromTask.filter(pk => pk != fromListId);
        data.body = { [this.item.field]: [...oldValueField, toListId] };
      } else {
        data.body = { [this.item.field]: toListId };
      }
      this.updateRFPRequest(data);
    },
    ...mapMutations(
      "matter/discovery/deposition/preparation/requestForProduction",
      ["clearData"]
    ),
    ...mapActions(
      "matter/discovery/deposition/preparation/requestForProduction",
      [
        "getDataRFPRequest",
        "addRFPRequest",
        "updateRFPRequest",
        "removeRFPRequest"
      ]
    )
  },
  mounted() {
    this.list[1].list = this.dataSource.map(x => ({ value: x.id, ...x }));
  },
  watch: {
    dataSource(source) {
      this.list[1].list = source.map(x => ({ value: x.id, ...x }));
    },
    panel() {
      if (this.item.field === "all") {
        this.updatePagination({ page: 1, ungroup: true });
      }
    },
  }
};
</script>
