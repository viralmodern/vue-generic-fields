<template>
  <td>
    <a href="#" @click="getPeerReviewProof">{{ dataRow[column.name] }}</a>
    <v-dialog v-model="showDialog" width="1100" style="width: 130px">
      <v-card>
        <v-card-text>
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
              <div
                class="font-weight-medium text-body-2"
                v-if="stage.name !== 'all'"
              >
                {{ stage.name }}
              </div>
              <SlickTable
                class="py-2"
                :totals="(dataPeerReviewProof[stage.name] || {}).totals"
                :items="(dataPeerReviewProof[stage.name] || {}).list"
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
                      updatePeerReviewProof(
                        stage.name,
                        props.dataRow.id,
                        props.column.name,
                        $event
                      )
                    "
                    @remove="
                      removePeerReviewProof(stage.name, props.dataRow.id)
                    "
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
            <FormCreatePeerReviewProof
              :isShowPopup="isShowCreate"
              header="Add new"
              :stageAdd="{ field: this.item.field, ...this.stageAdd }"
              :dataLabels="dataLabels"
              @closeModal="isShowCreate = false"
              @submit="addPeerReviewProof"
            />
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </td>
</template>
<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../../../slick-table/SlickTable2";
import TdDateMonthPicker from "../../../../cells/TdDateMonthPicker";
import TdTextArea from "../../../../cells/TdTextArea";
import TdLabel from "../../../../cells/TdLabel";
import FormCreatePeerReviewProof from "../../../../dialogs/FormCreatePeerReviewProof";
import DropDown from "../../../../menus/DropDown";

import TdDelete from "../TdDelete";
import TdAttachment from "./TdAttachment";

export default {
  components: {
    SlickTable,
    FormCreatePeerReviewProof,
    DropDown
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Publication Date",
          value: "publication_date",
          name: "publication_date"
        },
        {
          visible: true,
          sortable: false,
          text: "Publication Name",
          value: "publication_name",
          name: "publication_name"
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
          text: "Description",
          value: "description",
          name: "description"
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
      isShowCreate: false,
      showDialog: false
    };
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    headersFilter() {
      return this.headers.filter(x => x.name !== this.item.field);
    },
    ...mapGetters("ht_store/matter/labels", ["dataLabels"]),
    ...mapGetters(
      "matter/discovery/deposition/preparation/expertMethod/peerReviewProof",
      ["dataPeerReviewProof"]
    )
  },
  methods: {
    handleGroupBy(item) {
      if (this.item.name !== item.name) {
        this.item = item;
        this.clearData();
      }
    },
    getDisplayComponent(columnName) {
      if (columnName === "publication_date") {
        return TdDateMonthPicker;
      }
      if (columnName === "publication_name") {
        return TdTextArea;
      }
      if (columnName === "publisher") {
        return TdTextArea;
      }
      if (columnName === "description") {
        return TdTextArea;
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
    addPeerReviewProof(data) {
      this.addPeerReviewProofRequest({ name: this.stageAdd.name, data });
      this.isShowCreate = false;
    },
    updatePeerReviewProof(item, peerReviewProofId, name, value) {
      const data = {
        name: item,
        idParams: {
          peerReviewProofId
        },
        body: {
          [name]: value
        }
      };
      this.updatePeerReviewProofRequest(data);
    },
    removePeerReviewProof(name, peerReviewProofId) {
      const data = {
        name,
        peerReviewProofId
      };
      this.removePeerReviewProofRequest(data);
    },
    updatePagination(stage) {
      const searchObject = {
        [this.item.field]: stage.value
      };
      this.getDataPeerReviewProofRequest({ stage, searchObject });
    },
    getPeerReviewProof() {
      this.showDialog = true;
      this.item = this.list[0];
      // this.updatePagination({ name: "all" });
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
      // const fromTask = this.dataPeerReviewProof[fromListName].list.find(
      //   x => x.id === taskId
      // );
      // if (toListName) {
      //   const tasks = this.dataPeerReviewProof[toListName].list;
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
      //   const tasks = this.dataPeerReviewProof[fromListName].list;
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
          peerReviewProofId: drag.taskId
        },
        body: {
          [this.item.field]: toListId
          // order: drag.order
        }
      };
      this.updatePeerReviewProofRequest(data);
    },
    getByField(data) {
      return data.map(x => ({ value: x.id, ...x }));
    },
    ...mapMutations(
      "matter/discovery/deposition/preparation/expertMethod/peerReviewProof",
      ["clearData"]
    ),
    ...mapActions(
      "matter/discovery/deposition/preparation/expertMethod/peerReviewProof",
      [
        "getDataPeerReviewProofRequest",
        "addPeerReviewProofRequest",
        "updatePeerReviewProofRequest",
        "removePeerReviewProofRequest"
      ]
    )
  },
  watch: {
    dataLabels(labels) {
      this.list[1].list = this.getByField(labels);
    }
  }
};
</script>
