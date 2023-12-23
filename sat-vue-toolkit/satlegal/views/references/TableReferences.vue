<template>
  <v-col cols="12" class="pa-0">
    <div>
      <v-row no-gutters class="mt-2">
        <DropDown :item="item" :list="list" key-text="name" @click="handleGroupBy" />
      </v-row>

      <div v-for="stage in item.list" :key="stage.name">
        <div class="title text--secondary" v-if="stage.name !== 'all'">{{ stage.name }}</div>

        <SlickTable
          class="py-2"
          :totals="(dataReferences[stage.name] || {}).totals"
          :items="(dataReferences[stage.name] || {}).list"
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
              updateReferences(
                stage.name,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
              @remove="removeReferences(stage.name, props.dataRow.id)"
            />
          </template>
          <template v-slot:top>
            <v-row justify="end" no-gutters>
              <v-btn
                outlined
                color="primary"
                @click="
                stageAdd = stage;
                isShowCreate = true;
              "
              >
                Add new
                <v-icon dark>mdi-add</v-icon>
              </v-btn>
            </v-row>
          </template>
        </SlickTable>
      </div>
      <FormCreateReferences
        :isShowPopup="isShowCreate"
        header="Add new references"
        :stageAdd="{ field: this.item.field, ...this.stageAdd }"
        @closeModal="isShowCreate = false"
        @submit="addReferences"
      />
    </div>
  </v-col>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import SlickTable from "../../ht_components/slick-table/SlickTable2";
import TdTag from "../../ht_components/cells/TdTag";
import TdInlineEdit from "../../ht_components/cells/TdInlineEdit";
import TdDateFullPicker from "../../ht_components/cells/TdDateFullPicker";
import TdSubject from "../../ht_components/cells/TdSubject";
import FormCreateReferences from "../../ht_components/dialogs/FormCreateReferences";
import DropDown from "../../ht_components/menus/DropDown";
import TdAction from "../../ht_components/references/cells/TdAction";
import TdType from "../../ht_components/references/cells/TdType";
import TdBy from "../../ht_components/references/cells/TdBy";
import TdExpertWitness from "../../ht_components/references/cells/TdExpertWitness";
import TdAttachment from "../../ht_components/references/cells/TdAttachment";
export default {
  components: {
    SlickTable,
    FormCreateReferences,
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
          text: "Action",
          value: "action",
          name: "action"
        },
        {
          visible: true,
          sortable: false,
          text: "References",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Type",
          value: "type",
          name: "type"
        },
        {
          visible: true,
          sortable: false,
          text: "Date",
          value: "date",
          name: "date"
        },
        {
          visible: true,
          sortable: false,
          text: "By",
          value: "by",
          name: "by"
        },
        {
          visible: true,
          sortable: false,
          text: "Expert witness",
          value: "expert_witness",
          name: "expert_witness"
        },
        {
          visible: true,
          sortable: false,
          text: "Subject master",
          value: "subject_master",
          name: "subject_master"
        },
        {
          visible: true,
          sortable: false,
          text: "Tags",
          value: "tags",
          name: "tags"
        },
        {
          visible: true,
          sortable: false,
          text: "Attachment",
          value: "attachments",
          name: "attachments"
        }
      ],
      item: {},
      stageAdd: {},
      list: [
        {
          id: 1,
          field: "all",
          name: "All references",
          list: [{ id: 1, name: "all" }]
        },
        {
          id: 2,
          field: "subject_master",
          name: "By subject master"
        },
        {
          id: 3,
          field: "tags",
          name: "Tags"
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
    ...mapGetters("ht_store/matter/references", ["dataReferences"]), // eslint-disable-line
    ...mapGetters("ht_store/workspace/appConfigs", ["appConfigs"]), // eslint-disable-line
    ...mapGetters("ht_store/matter/subjects", ["dataSubjects"]), // eslint-disable-line
    ...mapGetters("ht_store/matter/tags", ["tag"]) // eslint-disable-line
  },
  methods: {
    handleGroupBy(item) {
      if (this.item.name !== item.name) {
        this.item = item;
        this.clearData();
      }
    },
    getDisplayComponent(columnName) {
      if (columnName === "date") {
        return TdDateFullPicker;
      }
      if (columnName === "name") {
        return TdInlineEdit;
      }
      if (columnName === "type") {
        return TdType;
      }
      if (columnName === "by") {
        return TdBy;
      }
      if (columnName === "expert_witness") {
        return TdExpertWitness;
      }
      if (columnName === "subject_master") {
        return TdSubject;
      }
      if (columnName === "tags") {
        return TdTag;
      }
      if (columnName === "attachments") {
        return TdAttachment;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addReferences(data) {
      this.addReferencesRequest({ name: this.stageAdd.name, data });
      this.isShowCreate = false;
    },
    updateReferences(item, referencesId, name, value) {
      const data = {
        name: item,
        idParams: {
          referencesId
        },
        body: {
          [name]: value
        }
      };
      this.updateReferencesRequest(data);
    },
    removeReferences(name, referencesId) {
      const data = {
        name,
        referencesId
      };
      this.removeReferencesRequest(data);
    },
    updatePagination(stage) {
      if (this.panel === this.index) {
        const searchObject = {
          [this.item.field]: stage.value
        };
        this.getDataReferencesRequest({ stage, searchObject });
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
      const fromTask = this.dataReferences[fromListName].list.find(
        x => x.id === taskId
      );
      if (toListName) {
        const tasks = this.dataReferences[toListName].list;
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
        const tasks = this.dataReferences[fromListName].list;
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
          referencesId: drag.taskId
        },
        body: {
          [this.item.field]: toListId,
          order: drag.order
        }
      };
      this.updateReferencesRequest(data);
    },
    getByField(data) {
      return (data || []).map(x => ({ value: x.id, ...x }));
    },
    ...mapMutations("ht_store/matter/references", ["clearData"]), // eslint-disable-line
    ...mapActions("ht_store/matter/references", [ // eslint-disable-line
      "getDataReferencesRequest",
      "addReferencesRequest",
      "updateReferencesRequest",
      "removeReferencesRequest"
    ]),
    ...mapActions("ht_store/matter/subjects", ["getDataSubjectsRequest"]), // eslint-disable-line
    ...mapActions("ht_store/matter/tags", ["getDataTagsRequest"]) // eslint-disable-line
  },
  mounted() {
    const matterId = this.$route.params.matter || this.$route.params.projectId;
    this.getDataSubjectsRequest(this.$route.params.matter || this.$route.params.projectId);
    this.list[1].list = this.getByField(this.dataSubjects);
    this.list[2].list = this.getByField(this.dataTags);
    this.getDataTagsRequest({ matterId, type: "tag" });
  },
  watch: {
    dataSubjects(source) {
      this.list[1].list = this.getByField(source);
    },
    dataTags(source) {
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
