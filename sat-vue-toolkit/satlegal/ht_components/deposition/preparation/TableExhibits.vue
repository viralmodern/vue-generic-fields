<template>
  <div>
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
        :totals="(dataExhibits[stage.value] || {}).totals"
        :items="(dataExhibits[stage.value] || {}).list"
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
              updateExhibits(
                stage.value,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @updateAsync="
              updateExhibitsAsync(
                stage.value,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeExhibits(stage.name, props.dataRow, $event)"
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
    <FormCreateExhibits
      ref="refFormCreateExhibits"
      :isLoadingAdd="isLoadingAdd"
      :isShowPopup="isShowCreate"
      header="Add new"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      @closeModal="isShowCreate = false"
      @submit="addExhibits"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Tags from "../../chips/Tags";
import SlickTable from "../../slick-table/SlickTable2";
import TdName from "../../cells/TdName";
import TdTextArea from "../../cells/TdTextArea";
import TdInlineEdit from "../../cells/TdInlineEdit";
import TdLabel from "../../cells/TdLabel";
import TdRedFlag from "../../cells/TdRedFlag";
import TdDateMonthPicker from "../../cells/TdDateMonthPicker";
import FormCreateExhibits from "../../dialogs/FormCreateExhibits";
import DropDown from "../../menus/DropDown";
import ConfigurationColumnTable from "../../menus/ConfigurationColumnTable";

import TdDelete from "./cells/TdDelete";
import TdAttachmentLink from "./cells/TdAttachmentLink";
import TdComment from "./cells/table-exhibits/TdComment";

export default {
  components: {
    Tags,
    SlickTable,
    FormCreateExhibits,
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
          text: "Order",
          value: "order",
          name: "order",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Name",
          value: "name",
          name: "name",
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
          text: "Description",
          value: "desc",
          name: "desc",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Exhibit Document",
          value: "attachment",
          name: "attachment",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Hightlight",
          value: "highlight",
          name: "highlight",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Label",
          value: "labels",
          name: "labels",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Page",
          value: "page",
          name: "page",
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
          type: "cell2"
        },
        {
          visible: true,
          sortable: false,
          text: "Follow up?",
          value: "follow_up",
          name: "follow_up",
          type: "cell2"
        },
        {
          visible: true,
          sortable: false,
          text: "Comment",
          value: "comment",
          name: "comment",
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
          list: [{ id: 1, value: "all", name: "all" }]
        },
        {
          id: 2,
          field: "labels",
          name: "Labels"
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
    ...mapGetters("ht_store/matter/labels", ["dataLabels"]),
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/exhibits", [
      "dataExhibits", "isLoadingGet"
    ]),
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
      if (columnName === "order") {
        return TdName;
      }
      if (columnName === "name") {
        return TdInlineEdit;
      }
      if (columnName === "date") {
        return TdDateMonthPicker;
      }
      if (columnName === "desc") {
        return TdTextArea;
      }
      if (columnName === "attachment") {
        return TdAttachmentLink;
      }
      if (columnName === "highlight") {
        return TdInlineEdit;
      }
      if (columnName === "labels" && columnName !== nameGroupByCurrent) {
        return TdLabel;
      }
      if (columnName === "page") {
        return TdInlineEdit;
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
    async addExhibits(dataForm) {
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
        await this.addExhibitsRequest(data);
        this.$refs.refFormCreateExhibits.clear();
        this.isLoadingAdd = false;
        this.isShowCreate = false;
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    updateExhibits(item, exhibitsId, name, value) {
      const data = {
        name: item,
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          exhibitsId
        },
        body: {
          [name]: value
        }
      };
      this.updateExhibitsRequest(data);
    },
    async updateExhibitsAsync(item, exhibitsId, name, {value, setLoading}) {
      try {
        const data = {
          name: item,
          idParams: {
            matterId: this.dataDepositionDetail.matter,
            depositionId: this.dataDepositionDetail.pk,
            exhibitsId
          },
          body: {
            [name]: value
          }
        };
        setLoading(true);
        await this.updateExhibitsAsyncRequest(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    async removeExhibits(name, row, close) {
      const data = {
        name,
        matterId: this.dataDepositionDetail.matter,
        depositionId: this.dataDepositionDetail.pk,
        exhibitsId: row.id
      };
      data.isFieldArray = Array.isArray(row[this.item.field]);
      await this.removeExhibitsRequest(data);
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
        this.getDataExhibitsRequest({ idParams, searchObject });
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
          exhibitsId: drag.taskId
        }
      };
      const fromTask = this.dataExhibits[fromListId].list.find(
        x => x.id == taskId
      )[this.item.field];
      if (Array.isArray(fromTask)) {
        // nếu row kéo là 1 mảng thì lấy giá trị cũ + giá trị mới
        const oldValueField = fromTask.filter(pk => pk != fromListId);
        data.body = { [this.item.field]: [...oldValueField, toListId] };
      } else {
        data.body = { [this.item.field]: toListId };
      }
      this.updateExhibitsRequest(data);
    },
    ...mapMutations("ht_store/matter/discovery/deposition/preparation/exhibits", [
      "clearData"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/exhibits", [
      "getDataExhibitsRequest",
      "addExhibitsRequest",
      "updateExhibitsRequest",
      "updateExhibitsAsyncRequest",
      "removeExhibitsRequest"
    ])
  },
  mounted() {
    this.list[1].list = this.dataLabels.map(x => ({ value: x.id, ...x }));
  },
  watch: {
    dataLabels(data) {
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
