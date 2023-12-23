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
    <div v-for="(stage, index) in item.list" :key="stage.name" class="py-2">
      <div class="font-weight-medium text-body-2" v-if="stage.name !== 'all'">
        <Tags :color="stage.color" :text="stage.name"/>
      </div>
      <SlickTable
        ref="refSlickTable"
        class="py-2"
        :totals="(dataKeyPleadings[stage.value] || {}).totals"
        :items="(dataKeyPleadings[stage.value] || {}).list"
        :headers="headersFilter"
        :idGroup="stage.value"
        :group="stage"
        :loading="isLoadingGet[stage.value]"
        @watchPagination="watchPaginationTable($event, {...stage, field: item.field}, index)"
        @onEndDragRows="onEndDragRows"
      >
        <template slot="cell" slot-scope="props">
          <component
            :is="getDisplayComponent(props.column.name, stage.field)"
            :column="props.column"
            :dataRow="props.dataRow"
            @update="
              updateKeyPleadings(
                stage.name,
                props.dataRow.id,
                props.column.name,
                $event
              )
            "
            @remove="removeKeyPleadings(stage.name, props.dataRow, close)"
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
    <FormCreateKeyPleadings
      ref="refFormCreateKeyPleadings"
      :isLoadingAdd="isLoadingAdd"
      :isShowPopup="isShowCreate"
      header="Add new"
      :stageAdd="{ field: this.item.field, ...this.stageAdd }"
      :dataGoals="dataGoals"
      @closeModal="isShowCreate = false"
      @submit="addKeyPleadings"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import Tags from "../../chips/Tags";
import SlickTable from "../../slick-table/SlickTable2";
import TdTipTap from "../../cells/TdTipTap";
import TdGoal from "../../cells/TdGoal";
import AddTaskTaskBoard from "../../inputs/AddInlineEnter";
import FormCreateKeyPleadings from "../../dialogs/FormCreateKeyPleadings";
import DropDown from "../../menus/DropDown";

import TdDelete from "./cells/TdDelete";

export default {
  components: {
    Tags,
    SlickTable,
    AddTaskTaskBoard,
    FormCreateKeyPleadings,
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
          text: "Pleading",
          value: "pleading",
          name: "pleading"
        },
        {
          visible: true,
          sortable: false,
          text: "Counter claim",
          value: "counter_claim",
          name: "counter_claim"
        },
        {
          visible: true,
          sortable: false,
          text: "Goals",
          value: "goals",
          name: "goals"
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
          field: "goals",
          name: "Goals"
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
    ...mapGetters("ht_store/matter/discovery/deposition/preparation/keyPleadings", [
      "dataKeyPleadings",
      "isLoadingGet",
    ]),
    ...mapGetters("ht_store/matter/goals", ["dataGoals"]),
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail"
    ])
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
      if (columnName === "pleading") {
        return TdTipTap;
      }
      if (columnName === "counter_claim") {
        return TdTipTap;
      }
      if (columnName === "goals" && columnName !== nameGroupByCurrent) {
        return TdGoal;
      }
      if (columnName === "action") {
        return TdDelete;
      }
      return "td";
    },
    async addKeyPleadings(dataForm) {
      try {
        const data = {
          name: this.stageAdd.value,
          idParams: {
            matterId: this.dataDepositionDetail.matter,
            depositionId: this.dataDepositionDetail.pk
          },
          body: dataForm
        };
        this.isLoadingAdd = true;
        await this.addKeyPleadingsRequest(data);
        this.$refs.refFormCreateKeyPleadings.clear();
        this.isLoadingAdd = false;
        this.isShowCreate = false;
      } catch (error) {
        this.isLoadingAdd = false;
      }
    },
    updateKeyPleadings(item, keyPleadingsId, name, value) {
      const data = {
        name: item,
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          keyPleadingsId
        },
        body: {
          [name]: value
        }
      };
      this.updateKeyPleadingsRequest(data);
    },
    async removeKeyPleadings(name, row, close) {
      const data = {
        name,
        matterId: this.dataDepositionDetail.matter,
        depositionId: this.dataDepositionDetail.pk,
        keyPleadingsId: row.id
      };
      data.isFieldArray = Array.isArray(row[this.item.field]);
      await this.removeKeyPleadingsRequest(data);
      close();
    },
    updatePagination({ page, ungroup, group_by, group_items }) {
      if (this.panel === this.index) {
        const searchObject = {
          page,
          group_by,
          ungroup,
          group_items,
        };
        const idParams = {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
        };
        this.getDataKeyPleadingsRequest({ idParams, searchObject });
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
      const data = {
        drag,
        name: toListId,
        idParams: {
          matterId: this.dataDepositionDetail.matter,
          depositionId: this.dataDepositionDetail.pk,
          keyPleadingsId: drag.taskId
        }
      };
      const fromTask = this.dataKeyPleadings[fromListId].list.find(
        x => x.id == taskId
      )[this.item.field];
      if (Array.isArray(fromTask)) {
        // nếu row kéo là 1 mảng thì lấy giá trị cũ + giá trị mới
        const oldValueField = fromTask.filter(pk => pk != fromListId);
        data.body = { [this.item.field]: [...oldValueField, toListId] };
      } else {
        data.body = { [this.item.field]: toListId };
      }
      this.updateKeyPleadingsRequest(data);
    },
    ...mapMutations("ht_store/matter/discovery/deposition/preparation/keyPleadings", [
      "clearData"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/keyPleadings", [
      "getDataKeyPleadingsRequest",
      "addKeyPleadingsRequest",
      "updateKeyPleadingsRequest",
      "removeKeyPleadingsRequest"
    ])
  },
  mounted() {
    this.list[1].list = this.dataGoals.map(x => ({ value: x.id, ...x }));
    this.updatePagination({ page: 1, ungroup: true });
  },
  watch: {
    dataGoals(goals) {
      this.list[1].list = goals.map(x => ({ value: x.id, ...x }));
    },
    panel() {
      if (this.item.field === "all") {
        this.updatePagination({ page: 1, ungroup: true });
      }
    }
  }
};
</script>
