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
        :totals="(dataExpertMethod[stage.name] || {}).totals"
        :items="(dataExpertMethod[stage.name] || {}).list"
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
              updateExpertMethod(
                stage.name,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeExpertMethod(stage.name, props.dataRow.id)"
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
    <FormCreateExpertMethod
      :isShowPopup="isShowCreate"
      header="Add new"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      @closeModal="isShowCreate = false"
      @submit="addExpertMethod"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdTextArea from "../../cells/TdTextArea";
import TdSwitch from "../../cells/TdSwitch";
import TdRedFlag from "../../cells/TdRedFlag";
import FormCreateExpertMethod from "../../dialogs/FormCreateExpertMethod";
import DropDown from "../../menus/DropDown";

import TdDelete from "./cells/TdDelete";
import TdPeerReviewProof from "./cells/table-expertMethod/TdPeerReviewProof";

export default {
  components: {
    SlickTable,
    FormCreateExpertMethod,
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
          text: "Expert Method Name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Is it Tested",
          value: "tested",
          name: "tested"
        },
        {
          visible: true,
          sortable: false,
          text: "Is this method peer reviewed?",
          value: "reviewed",
          name: "reviewed"
        },
        {
          visible: true,
          sortable: false,
          text: "Peer Review Proof",
          value: "peer_review_proof",
          name: "peer_review_proof"
        },
        {
          visible: true,
          sortable: false,
          text: "Error Potential?",
          value: "error_potential",
          name: "error_potential"
        },
        {
          visible: true,
          sortable: false,
          text: "Is this method generally accepted in the field?",
          value: "accepted",
          name: "accepted"
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
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/expertMethod", [
      "dataExpertMethod"
    ])
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
      if (columnName === "tested") {
        return TdSwitch;
      }
      if (columnName === "reviewed") {
        return TdSwitch;
      }
      if (columnName === "peer_review_proof") {
        return TdPeerReviewProof;
      }
      if (columnName === "error_potential") {
        return TdRedFlag;
      }
      if (columnName === "accepted") {
        return TdSwitch;
      }
      if (columnName === "action") {
        return TdDelete;
      }
      return "td";
    },
    addExpertMethod(data) {
      this.addExpertMethodRequest({ name: this.stageAdd.name, data });
      this.isShowCreate = false;
    },
    updateExpertMethod(item, expertMethodId, name, value) {
      const data = {
        name: item,
        idParams: {
          expertMethodId
        },
        body: {
          [name]: value
        }
      };
      this.updateExpertMethodRequest(data);
    },
    removeExpertMethod(name, expertMethodId) {
      const data = {
        name,
        expertMethodId
      };
      this.removeExpertMethodRequest(data);
    },
    updatePagination(stage) {
      if (this.panel === this.index) {
        const searchObject = {
          [this.item.field]: stage.value
        };
        this.getDataExpertMethodRequest({ stage, searchObject });
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
      // const fromTask = this.dataExpertMethod[fromListName].list.find(
      //   x => x.id === taskId
      // );
      // if (toListName) {
      //   const tasks = this.dataExpertMethod[toListName].list;
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
      //   const tasks = this.dataExpertMethod[fromListName].list;
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
          expertMethodId: drag.taskId
        },
        body: {
          [this.item.field]: toListId
          // order: drag.order
        }
      };
      this.updateExpertMethodRequest(data);
    },
    getByField(data) {
      return data.map(x => ({ value: x.id, ...x }));
    },
    ...mapMutations("ht_store/matter/discovery/deposition/preparation/expertMethod", [
      "clearData"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/expertMethod", [
      "getDataExpertMethodRequest",
      "addExpertMethodRequest",
      "updateExpertMethodRequest",
      "removeExpertMethodRequest"
    ])
  },
  watch: {
    panel() {
      if (this.item.field === "all") {
        this.updatePagination({ name: "all" });
      }
    }
  }
};
</script>
