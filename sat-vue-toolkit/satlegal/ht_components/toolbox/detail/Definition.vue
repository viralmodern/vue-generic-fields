<template>
  <div>
    <div class="font-weight-medium subheading">Definition</div>
    <SlickTable
      @update:pagination="updatePagination"
      :totals="totals"
      :items="dataDefinition"
      :headers="headers.filter(x=> x.visible)"
      class="py-2"
      groupRows="definition"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateDefinition(props.dataRow.id, props.column.name, $event)"
          @remove="removeDefinition(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>mdi-add</v-icon>
          </v-btn>
          <FormCreateDefinition
            :isShowPopup="isShowCreate"
            labelFieldTwo="Short definition"
            labelFieldThree="Description"
            header="Add new definition"
            @closeModal="isShowCreate = false"
            @submit="addDefinition"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdDefinitionName from "./cells/TdDefinitionName";
import TdDefinitionDes from "./cells/TdDefinitionDes";
import TdDefinitionShort from "./cells/TdDefinitionShort";
import FormCreateDefinition from "../../dialogs/FormCreateDefinition";
import TdAction from "./cells/TdAction";

export default {
  components: {
    SlickTable,
    TdDefinitionName,
    TdDefinitionDes,
    TdDefinitionShort,
    FormCreateDefinition,
    TdAction
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Term",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Short definition",
          value: "definition",
          name: "definition"
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
          text: "Action",
          value: "action",
          name: "action"
        }
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/toolbox/detail/definition", [
      "dataDefinition",
      "totals"
    ]),
    ...mapGetters("ht_store/matter/discovery/toolbox/detail", ["dataToolboxDetail"])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "name") {
        return TdDefinitionName;
      }
      if (columnName === "definition") {
        return TdDefinitionShort;
      }
      if (columnName === "description") {
        return TdDefinitionDes;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    getUrlByType(type) {
      switch (type) {
        case 2:
          return "request-for-prods";
        case 3:
          return "request-for-admissions";
        case 5:
          return "interrogatories";
        default:
          break;
      }
    },
    addDefinition(dataForm) {
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id,
          urlByType
        },
        body: dataForm
      };
      this.addDefinitionRequest(data);
      this.isShowCreate = false;
    },
    updateDefinition(definitionId, name, value){
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id,
          definitionId,
          urlByType
        },
        body: {
          [name]: value
        }
      };
      this.updateDefinitionRequest(data);
    },
    removeDefinition(definitionId) {
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const data = {
        matterId: this.dataToolboxDetail.matter,
        toolboxId: this.dataToolboxDetail.id,
        definitionId,
        urlByType
      };
      this.removeDefinitionRequest(data);
    },
    updatePagination({ page }) {
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const matterId = this.dataToolboxDetail.matter;
      const toolboxId = this.dataToolboxDetail.id;
      this.getDataDefinitionRequest({ urlByType, matterId, toolboxId, page });
    },
    ...mapActions("ht_store/matter/discovery/toolbox/detail/definition", [
      "getDataDefinitionRequest",
      "addDefinitionRequest",
      "updateDefinitionRequest",
      "removeDefinitionRequest"
    ])
  }
};
</script>

<style scoped>
.add {
  position: fixed;
  z-index: 10;
  right: 10px;
  bottom: 10px;
}
</style>
