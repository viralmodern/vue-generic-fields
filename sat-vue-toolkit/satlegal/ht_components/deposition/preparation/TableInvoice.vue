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
    <div class="pa-2" v-for="stage in item.list" :key="stage.name">
      <div class="font-weight-medium text-body-2" v-if="stage.name !== 'all'">
        {{ stage.name }}
      </div>
      <SlickTable
        class="py-2"
        :totals="(dataInvoice[stage.name] || {}).totals"
        :items="(dataInvoice[stage.name] || {}).list"
        :headers="headersFilter"
        :idGroup="stage.value"
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
              updateInvoice(
                stage.name,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeInvoice(stage.name, props.dataRow.id)"
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
    <FormCreatePreparationInvoice
      :isShowPopup="isShowCreate"
      header="Add new"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      :dataLabels="dataLabels"
      @closeModal="isShowCreate = false"
      @submit="addInvoice"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdTextArea from "../../cells/TdTextArea";
import TdDateMonthPicker from "../../cells/TdDateMonthPicker";
import TdName from "../../cells/TdName";
import TdLabel from "../../cells/TdLabel";
import FormCreatePreparationInvoice from "../../dialogs/FormCreatePreparationInvoice";
import DropDown from "../../menus/DropDown";

import TdDelete from "./cells/TdDelete";
import TdAttachment from "./cells/table-invoice/TdAttachment";

export default {
  components: {
    SlickTable,
    FormCreatePreparationInvoice,
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
          text: "Invoice Name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Invoice Date",
          value: "date",
          name: "date"
        },
        {
          visible: true,
          sortable: false,
          text: "Invoice Description",
          value: "invoice_des",
          name: "invoice_des"
        },
        {
          visible: true,
          sortable: false,
          text: "Invoice Value",
          value: "invoice_value",
          name: "invoice_value"
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
          text: "Description",
          value: "description",
          name: "description"
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
          list: [{ id: 1, name: "all" }]
        },
        {
          id: 2,
          field: "labels",
          name: "Label"
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
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/invoice", [
      "dataInvoice"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    ...mapGetters("ht_store/matter/labels", ["dataLabels"])
  },
  methods: {
    handleGroupBy(item) {
      if (this.item.name !== item.name) {
        this.item = item;
        this.clearData();
      }
    },
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdTextArea;
      }
      if (columnName === "date") {
        return TdDateMonthPicker;
      }
      if (columnName === "invoice_des") {
        return TdTextArea;
      }
      if (columnName === "invoice_value") {
        return TdName;
      }
      if (columnName === "labels") {
        return TdLabel;
      }
      if (columnName === "description") {
        return TdTextArea;
      }
      if (columnName === "attachments") {
        return TdAttachment;
      }
      if (columnName === "action") {
        return TdDelete;
      }
      return "td";
    },
    addInvoice(data) {
      this.addInvoiceRequest({ name: this.stageAdd.name, data });
      this.isShowCreate = false;
    },
    updateInvoice(item, invoiceId, name, value) {
      const data = {
        name: item,
        idParams: {
          invoiceId
        },
        body: {
          [name]: value
        }
      };
      this.updateInvoiceRequest(data);
    },
    removeInvoice(name, invoiceId) {
      const data = {
        name,
        invoiceId
      };
      this.removeInvoiceRequest(data);
    },
    updatePagination(stage) {
      if (this.panel === this.index) {
        const searchObject = {
          [this.item.field]: stage.value
        };
        this.getDataInvoiceRequest({ stage, searchObject });
      }
    },
    onEndDragRows(event) {
      const {
        taskId,
        fromListName,
        newIndex,
        oldIndex,
        toListName,
        toListId
      } = event;
      // let order = 0;
      const drag = {
        taskId,
        fromListName,
        newIndex,
        oldIndex,
        toListName
      };
      // const fromTask = this.dataInvoice[fromListName].list.find(
      //   x => x.id === taskId
      // );
      // if (toListName) {
      //   const tasks = this.dataInvoice[toListName].list;
      //   if (!tasks.length) {
      //     order = fromTask.order;
      //   } else {
      //     if (newIndex == 0) {
      //       order = fromTask.order - 1000000;
      //     } else {
      //       if (newIndex === tasks.length) {
      //         order = fromTask.order + 1000000;
      //       } else {
      //         order = (tasks[newIndex].order + tasks[newIndex - 1].order) / 2;
      //       }
      //     }
      //   }
      //   drag.order = order;
      // } else {
      //   const tasks = this.dataInvoice[fromListName].list;
      //   if (newIndex > oldIndex) {
      //     if (newIndex == tasks.length - 1) {
      //       order = fromTask.order + 1000000;
      //     } else {
      //       order = (tasks[newIndex].order + tasks[newIndex + 1].order) / 2;
      //     }
      //   } else {
      //     if (newIndex == 0) {
      //       order = fromTask.order - 1000000;
      //     } else {
      //       order = (tasks[newIndex].order + tasks[newIndex + 1].order) / 2;
      //     }
      //   }
      //   drag.order = order;
      // }
      let data = {
        drag,
        idParams: {
          invoiceId: drag.taskId
        },
        body: {
          [this.item.field]: toListId
          // order: drag.order
        }
      };
      this.updateInvoiceRequest(data);
    },
    getByField(data) {
      return data.map(x => ({ value: x.id, ...x }));
    },
    ...mapMutations("ht_store/matter/discovery/deposition/preparation/invoice", [
      "clearData"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/invoice", [
      "getDataInvoiceRequest",
      "addInvoiceRequest",
      "updateInvoiceRequest",
      "removeInvoiceRequest"
    ])
  },
  mounted() {
    this.list[1].list = this.getByField(this.dataLabels);
  },
  watch: {
    dataLabels(labels) {
      this.list[1].list = this.getByField(labels);
    },
    panel() {
      if (this.item.field === "all") {
        this.updatePagination({ name: "all" });
      }
    }
  }
};
</script>
