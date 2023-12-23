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
        :totals="(dataPublication[stage.name] || {}).totals"
        :items="(dataPublication[stage.name] || {}).list"
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
              updatePublication(
                stage.name,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removePublication(stage.name, props.dataRow.id)"
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
    <FormCreatePublication
      :isShowPopup="isShowCreate"
      header="Add new"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      :appConfigs="appConfigs"
      :dataSource="dataSource"
      @closeModal="isShowCreate = false"
      @submit="addPublication"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdTextArea from "../../cells/TdTextArea";
import TdYear from "../../cells/TdYear";
import TdLabel from "../../cells/TdLabel";
import FormCreatePublication from "../../dialogs/FormCreatePublication";
import DropDown from "../../menus/DropDown";

import TdDelete from "./cells/TdDelete";
import TdSource from "./cells/table-RFP/TdSource";
import TdAttachment from "./cells/table-publication/TdAttachment";

export default {
  components: {
    SlickTable,
    FormCreatePublication,
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
          text: "Publication Name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Author",
          value: "author",
          name: "author"
        },
        {
          visible: true,
          sortable: false,
          text: "Publication Year",
          value: "year",
          name: "year"
        },
        {
          visible: true,
          sortable: false,
          text: "Bibilography",
          value: "bibilography",
          name: "bibilography"
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
          field: "author",
          name: "Author"
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
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/publication", [
      "dataPublication"
    ]),
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]),
    ...mapGetters("ht_store/matter/discovery/deposition/source", ["dataSource"])
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
      if (columnName === "author") {
        return TdSource;
      }
      if (columnName === "year") {
        return TdYear;
      }
      if (columnName === "bibilography") {
        return TdTextArea;
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
    addPublication(data) {
      this.addPublicationRequest({ name: this.stageAdd.name, data });
      this.isShowCreate = false;
    },
    updatePublication(item, publicationId, name, value) {
      const data = {
        name: item,
        idParams: {
          publicationId
        },
        body: {
          [name]: value
        }
      };
      this.updatePublicationRequest(data);
    },
    removePublication(name, publicationId) {
      const data = {
        name,
        publicationId
      };
      this.removePublicationRequest(data);
    },
    updatePagination(stage) {
      if (this.panel === this.index) {
        const searchObject = {
          [this.item.field]: stage.value
        };
        this.getDataPublicationRequest({ stage, searchObject });
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
      // const fromTask = this.dataPublication[fromListName].list.find(
      //   x => x.id === taskId
      // );
      // if (toListName) {
      //   const tasks = this.dataPublication[toListName].list;
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
      //   const tasks = this.dataPublication[fromListName].list;
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
          publicationId: drag.taskId
        },
        body: {
          [this.item.field]: toListId
          // order: drag.order
        }
      };
      this.updatePublicationRequest(data);
    },
    getByField(data) {
      return data.map(x => ({ value: x.id, ...x }));
    },
    ...mapMutations("ht_store/matter/discovery/deposition/preparation/publication", [
      "clearData"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/publication", [
      "getDataPublicationRequest",
      "addPublicationRequest",
      "updatePublicationRequest",
      "removePublicationRequest"
    ])
  },
  mounted() {
    this.list[1].list = this.getByField(this.dataSource);
  },
  watch: {
    dataSource(source) {
      this.list[1].list = this.getByField(source);
    },
    panel() {
      if (this.item.field === "all") {
        this.updatePagination({ name: "all" });
      }
    }
  }
};
</script>
