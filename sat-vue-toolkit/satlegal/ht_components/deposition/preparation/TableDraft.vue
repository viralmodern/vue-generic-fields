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
        :totals="(dataDraft[stage.name] || {}).totals"
        :items="(dataDraft[stage.name] || {}).list"
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
              updateDraft(
                stage.name,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeDraft(stage.name, props.dataRow.id)"
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
    <FormCreateDraft
      :isShowPopup="isShowCreate"
      header="Add new"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      :dataLabels="dataLabels"
      :dataCharacters="character"
      @closeModal="isShowCreate = false"
      @submit="addDraft"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdTextArea from "../../cells/TdTextArea";
import TdDateMonthPicker from "../../cells/TdDateMonthPicker";
import TdCharacters from "../../cells/TdCharacters";
import TdLabel from "../../cells/TdLabel";
import FormCreateDraft from "../../dialogs/FormCreateDraft";
import DropDown from "../../menus/DropDown";

import TdDelete from "./cells/TdDelete";
import TdAttachment from "./cells/table-draft/TdAttachment";

export default {
  components: {
    SlickTable,
    FormCreateDraft,
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
          text: "Draft Name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Who read it?",
          value: "characters",
          name: "characters"
        },
        {
          visible: true,
          sortable: false,
          text: "Draft Date",
          value: "date",
          name: "date"
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
          text: "Draft Description",
          value: "draft_des",
          name: "draft_des"
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
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/draft", [
      "dataDraft"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    ...mapGetters("ht_store/matter/labels", ["dataLabels"]),
    ...mapGetters("ht_store/matter/character", ["character"])
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
      if (columnName === "characters") {
        return TdCharacters;
      }
      if (columnName === "date") {
        return TdDateMonthPicker;
      }
      if (columnName === "labels") {
        return TdLabel;
      }
      if (columnName === "draft_des") {
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
    addDraft(data) {
      this.addDraftRequest({ name: this.stageAdd.name, data });
      this.isShowCreate = false;
    },
    updateDraft(item, draftId, name, value) {
      const data = {
        name: item,
        idParams: {
          draftId
        },
        body: {
          [name]: value
        }
      };
      this.updateDraftRequest(data);
    },
    removeDraft(name, draftId) {
      const data = {
        name,
        draftId
      };
      this.removeDraftRequest(data);
    },
    updatePagination(stage) {
      if (this.panel === this.index) {
        const searchObject = {
          [this.item.field]: stage.value
        };
        this.getDataDraftRequest({ stage, searchObject });
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
      // const fromTask = this.dataDraft[fromListName].list.find(
      //   x => x.id === taskId
      // );
      // if (toListName) {
      //   const tasks = this.dataDraft[toListName].list;
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
      //   const tasks = this.dataDraft[fromListName].list;
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
          draftId: drag.taskId
        },
        body: {
          [this.item.field]: toListId
          // order: drag.order
        }
      };
      this.updateDraftRequest(data);
    },
    getByField(data) {
      return data.map(x => ({ value: x.id, ...x }));
    },
    ...mapMutations("ht_store/matter/discovery/deposition/preparation/draft", [
      "clearData"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/draft", [
      "getDataDraftRequest",
      "addDraftRequest",
      "updateDraftRequest",
      "removeDraftRequest"
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
