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
    <div class="pa-2" v-for="stage in item.list" :key="stage.name">
      <div class="title text--secondary" v-if="stage.name !== 'all'">
        {{ stage.name }}
      </div>
      <SlickTable
        class="py-2"
        :totals="(dataIndex[stage.name] || {}).totals"
        :items="(dataIndex[stage.name] || {}).list"
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
              updateIndex(
                stage.name,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeIndex(stage.name, props.dataRow.id)"
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
    <FormCreateIndex
      :isShowPopup="isShowCreate"
      header="Add new index deposition"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      @closeModal="isShowCreate = false"
      @submit="addIndex"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdTextArea from "../../cells/TdTextArea";
import TdIssue from "../../cells/TdIssue";
import TdSubject from "../../cells/TdSubject";
import TdNumber from "./cells/TdNumber";
import TdAction from "./cells/TdAction";
import FormCreateIndex from "../../dialogs/FormCreateIndex";
import DropDown from "../../menus/DropDown";

export default {
  components: {
    SlickTable,
    FormCreateIndex,
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
          text: "Page",
          value: "page",
          name: "page"
        },
        {
          visible: true,
          sortable: false,
          text: "Subject",
          value: "subject",
          name: "subject"
        },
        {
          visible: true,
          sortable: false,
          text: "Comment",
          value: "comment",
          name: "comment"
        },
        {
          visible: true,
          sortable: false,
          text: "Line",
          value: "line",
          name: "line"
        },
        {
          visible: true,
          sortable: false,
          text: "Testimony",
          value: "testimony",
          name: "testimony"
        },
        {
          visible: true,
          sortable: false,
          text: "Issues",
          value: "issues",
          name: "issues"
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
          field: "issues",
          name: "Issues"
        },
        {
          id: 3,
          field: "subject",
          name: "Subject"
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
    ...mapGetters("ht_store/matter/discovery/deposition/index", ["dataIndex"]),
    ...mapGetters("ht_store/matter/subjects", ["dataSubjects"]),
    ...mapGetters("ht_store/matter/issues", ["dataIssues"])
  },
  methods: {
    handleGroupBy(item) {
      if (this.item.name !== item.name) {
        this.item = item;
        this.clearData();
      }
    },
    getDisplayComponent(columnName) {
      if (columnName === "page") {
        return TdNumber;
      }
      if (columnName === "subject") {
        return TdSubject;
      }
      if (columnName === "comment") {
        return TdTextArea;
      }
      if (columnName === "line") {
        return TdNumber;
      }
      if (columnName === "testimony") {
        return TdTextArea;
      }
      if (columnName === "issues") {
        return TdIssue;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addIndex(data) {
      this.addIndexRequest({ name: this.stageAdd.name, data });
      this.isShowCreate = false;
    },
    updateIndex(item, indexId, name, value) {
      const data = {
        name: item,
        idParams: {
          indexId
        },
        body: {
          [name]: value
        }
      };
      this.updateIndexRequest(data);
    },
    removeIndex(name, indexId) {
      const data = {
        name,
        indexId
      };
      this.removeIndexRequest(data);
    },
    updatePagination(stage) {
      if (this.panel === this.index) {
        const searchObject = {
          [this.item.field]: stage.value
        };
        this.getDataIndexRequest({ stage, searchObject });
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
      let order = 0;
      const drag = {
        taskId,
        fromListName,
        newIndex,
        oldIndex,
        toListName
      };
      const fromTask = this.dataIndex[fromListName].list.find(
        x => x.id === taskId
      );
      if (toListName) {
        const tasks = this.dataIndex[toListName].list;
        if (!tasks.length) {
          order = fromTask.order;
        } else {
          if (newIndex == 0) {
            order = fromTask.order - 1000000;
          } else {
            if (newIndex === tasks.length) {
              order = fromTask.order + 1000000;
            } else {
              order = (tasks[newIndex].order + tasks[newIndex - 1].order) / 2;
            }
          }
        }
        drag.order = order;
      } else {
        const tasks = this.dataIndex[fromListName].list;
        if (newIndex > oldIndex) {
          if (newIndex == tasks.length - 1) {
            order = fromTask.order + 1000000;
          } else {
            order = (tasks[newIndex].order + tasks[newIndex + 1].order) / 2;
          }
        } else {
          if (newIndex == 0) {
            order = fromTask.order - 1000000;
          } else {
            order = (tasks[newIndex].order + tasks[newIndex + 1].order) / 2;
          }
        }
        drag.order = order;
      }
      let data = {
        drag,
        idParams: {
          indexId: drag.taskId
        },
        body: {
          [this.item.field]: toListId,
          order: drag.order
        }
      };
      this.updateIndexRequest(data);
    },
    getByField(data) {
      return data.map(x => ({ value: x.id, ...x }));
    },
    ...mapMutations("ht_store/matter/discovery/deposition/index", ["clearData"]),
    ...mapActions("ht_store/matter/discovery/deposition/index", [
      "getDataIndexRequest",
      "addIndexRequest",
      "updateIndexRequest",
      "removeIndexRequest"
    ])
  },
  mounted() {
    this.list[1].list = this.getByField(this.dataIssues);
    this.list[2].list = this.getByField(this.dataSubjects);
  },
  watch: {
    dataIssues(source) {
      this.list[1].list = this.getByField(source);
    },
    dataSubjects(source) {
      this.list[2].list = this.getByField(source);
    },
    panel() {
      if (this.item.field === "all") {
        this.updatePagination({ name: "all" });
      }
    }
  }
};
</script>
