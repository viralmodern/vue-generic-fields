<template>
  <div class="px-2">
    <v-row no-gutters>
      <DropDown
        :item="item"
        :list="list"
        key-text="name"
        @click="handleGroupBy"
      />
    </v-row>
    <div class="py-2" v-for="stage in item.list" :key="stage.name">
      <div class="title text--secondary" v-if="stage.name !== 'all'">
        <Tags :color="stage.color" :text="stage.name"/>
      </div>
      <SlickTable
        ref="refSlickTable"
        class="py-2"
        :totals="(dataWritten[stage.value] || {}).totals"
        :items="(dataWritten[stage.value] || {}).list"
        :headers="headersFilter"
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
            @update="
              updateWritten(
                stage.value,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @updateAsync="
              updateWrittenAsync(
                stage.value,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeWritten(stage.name, props.dataRow, $event)"
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
    <FormCreateWritten
      ref="refFormCreateWritten"
      :isLoadingAdd="isLoadingAdd"
      :isShowPopup="isShowCreate"
      header="Add new written deposition"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      @closeModal="isShowCreate = false"
      @submit="addWritten"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Tags from "../../chips/Tags";
import SlickTable from "../../slick-table/SlickTable2";
import TdTextArea from "../../cells/TdTextArea";
import TdInlineEdit from "../../cells/TdInlineEdit";
import TdDateFullPicker from "../../cells/TdDateFullPicker";
import TdLabel from "../../cells/TdLabel";
import FormCreateWritten from "../../dialogs/FormCreateWritten";
import DropDown from "../../menus/DropDown";

import TdDelete from "./cells/TdDelete";
import TdAttachmentLink from "./cells/TdAttachmentLink";

export default {
  components: {
    SlickTable,
    FormCreateWritten,
    DropDown,
    Tags,
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
          text: "Publication date",
          value: "date",
          name: "date"
        },
        {
          visible: true,
          sortable: false,
          text: "Publication name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Publisher",
          value: "publisher",
          name: "publisher"
        },
        {
          visible: true,
          sortable: false,
          text: "Descrition",
          value: "description",
          name: "description"
        },
        {
          visible: true,
          sortable: false,
          text: "Label",
          value: "labels",
          name: "labels"
        },
        {
          visible: true,
          sortable: false,
          text: "Attachment",
          value: "attachments",
          name: "attachments"
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
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/written", [
      "dataWritten", "isLoadingGet"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    ...mapGetters("ht_store/matter/labels", ["dataLabels"]),
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
    getDisplayComponent(columnName, nameGroupByCurrent) {
      if (columnName === "date") {
        return TdDateFullPicker;
      }
      if (columnName === "name") {
        return TdInlineEdit;
      }
      if (columnName === "publisher") {
        return TdTextArea;
      }
      if (columnName === "labels" && columnName !== nameGroupByCurrent) {
        return TdLabel;
      }
      if (columnName === "description") {
        return TdTextArea;
      }
      if (columnName === "attachments") {
        return TdAttachmentLink;
      }
      if (columnName === "action") {
        return TdDelete;
      }
      return "td";
    },
    async addWritten(dataForm) {
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
        await this.addWrittenRequest(data);
        this.$refs.refFormCreateWritten.clear();
        this.isLoadingAdd = false;
        this.isShowCreate = false;
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    updateWritten(item, writtenId, name, value) {
      const data = {
        name: item,
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          writtenId
        },
        body: {
          [name]: value
        }
      };
      this.updateWrittenRequest(data);
    },
    async updateWrittenAsync(item, writtenId, name, {value, setLoading}) {
      try {
        const data = {
          name: item,
          idParams: {
            matterId: this.dataDepositionDetail.matter,
            depositionId: this.dataDepositionDetail.pk,
            writtenId,
          },
          body: {
            [name]: value
          }
        };
        setLoading(true);
        await this.updateWrittenAsyncRequest(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    },
    async removeWritten(name, row, close) {
      const data = {
        name,
        matterId: this.dataDepositionDetail.matter,
        depositionId: this.dataDepositionDetail.pk,
        writtenId: row.id,
      };
      data.isFieldArray = Array.isArray(row[this.item.field]);
      await this.removeWrittenRequest(data);
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
        this.getDataWrittenRequest({ idParams, searchObject });
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
        name: toListId,
        drag,
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          writtenId: drag.taskId
        },
      };
      const fromTask = this.dataWritten[fromListId].list.find(
        x => x.id == taskId
      )[this.item.field];
      if (Array.isArray(fromTask)) {
        // nếu row kéo là 1 mảng thì lấy giá trị cũ + giá trị mới
        const oldValueField = fromTask.filter(pk => pk != fromListId);
        data.body = { [this.item.field]: [...oldValueField, toListId] };
      } else {
        data.body = { [this.item.field]: toListId };
      }
      this.updateWrittenRequest(data);
    },
    getByField(data) {
      return data.map(x => ({ value: x.id, ...x }));
    },
    ...mapMutations("ht_store/matter/discovery/deposition/preparation/written", [
      "clearData"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/written", [
      "getDataWrittenRequest",
      "addWrittenRequest",
      "updateWrittenRequest",
      "updateWrittenAsyncRequest",
      "removeWrittenRequest"
    ])
  },
  mounted() {
    this.list[1].list = this.getByField(this.dataLabels);
  },
  watch: {
    dataLabels(source) {
      this.list[1].list = this.getByField(source);
    },
    panel() {
      if (this.item.field === "all") {
        this.updatePagination({ page: 1, ungroup: true });
      }
    }
  }
};
</script>
