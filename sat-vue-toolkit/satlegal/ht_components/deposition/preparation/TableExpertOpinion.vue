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
        :totals="(dataExpertOpinion[stage.name] || {}).totals"
        :items="(dataExpertOpinion[stage.name] || {}).list"
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
              updateExpertOpinion(
                stage.name,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeExpertOpinion(stage.name, props.dataRow.id)"
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
    <FormCreateExpertOpinion
      :isShowPopup="isShowCreate"
      header="Add new"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      :dataLabels="dataLabels"
      :dataCharacters="character"
      @closeModal="isShowCreate = false"
      @submit="addExpertOpinion"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdTextArea from "../../cells/TdTextArea";
import TdLabel from "../../cells/TdLabel";
import TdSource from "./cells/table-RFP/TdSource";
import FormCreateExpertOpinion from "../../dialogs/FormCreateExpertOpinion";
import DropDown from "../../menus/DropDown";

import TdDelete from "./cells/TdDelete";
import TdExpertMethodName from "./cells/table-expertOpinon/TdExpertMethodName";
import TdAttachment from "./cells/table-expertOpinon/TdAttachment";

export default {
  components: {
    SlickTable,
    FormCreateExpertOpinion,
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
          text: "Expert Opinion",
          value: "expert_opinion",
          name: "expert_opinion"
        },
        {
          visible: true,
          sortable: false,
          text: "Expert Method Name",
          value: "expert_method_name",
          name: "expert_method_name"
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
          text: "Assumptions",
          value: "assumptions",
          name: "assumptions"
        },
        {
          visible: true,
          sortable: false,
          text: "Labels",
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
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/expertOpinion", [
      "dataExpertOpinion"
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
      if (columnName === "expert_opinion") {
        return TdTextArea;
      }
      if (columnName === "expert_method_name") {
        return TdExpertMethodName;
      }
      if (columnName === "description") {
        return TdTextArea;
      }
      if (columnName === "assumptions") {
        return TdSource;
      }
      if (columnName === "labels") {
        return TdLabel;
      }
      if (columnName === "attachments") {
        return TdAttachment;
      }
      if (columnName === "action") {
        return TdDelete;
      }
      return "td";
    },
    addExpertOpinion(data) {
      this.addExpertOpinionRequest({ name: this.stageAdd.name, data });
      this.isShowCreate = false;
    },
    updateExpertOpinion(item, expertOpinionId, name, value) {
      const data = {
        name: item,
        idParams: {
          expertOpinionId
        },
        body: {
          [name]: value
        }
      };
      this.updateExpertOpinionRequest(data);
    },
    removeExpertOpinion(name, expertOpinionId) {
      const data = {
        name,
        expertOpinionId
      };
      this.removeExpertOpinionRequest(data);
    },
    updatePagination(stage) {
      if (this.panel === this.index) {
        const searchObject = {
          [this.item.field]: stage.value
        };
        this.getDataExpertOpinionRequest({ stage, searchObject });
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
      // const fromTask = this.dataExpertOpinion[fromListName].list.find(
      //   x => x.id === taskId
      // );
      // if (toListName) {
      //   const tasks = this.dataExpertOpinion[toListName].list;
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
      //   const tasks = this.dataExpertOpinion[fromListName].list;
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
          expertOpinionId: drag.taskId
        },
        body: {
          [this.item.field]: toListId
          // order: drag.order
        }
      };
      this.updateExpertOpinionRequest(data);
    },
    getByField(data) {
      return data.map(x => ({ value: x.id, ...x }));
    },
    ...mapMutations("ht_store/matter/discovery/deposition/preparation/expertOpinion", [
      "clearData"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/expertOpinion", [
      "getDataExpertOpinionRequest",
      "addExpertOpinionRequest",
      "updateExpertOpinionRequest",
      "removeExpertOpinionRequest"
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
