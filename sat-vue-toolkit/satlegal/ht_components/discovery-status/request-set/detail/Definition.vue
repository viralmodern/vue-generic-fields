<template>
  <div>
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
            <v-icon dark>add</v-icon>
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
import SlickTable from "../../../slick-table/SlickTable2";
import TdDefinitionName from "../../../toolbox/detail/cells/TdDefinitionName";
import TdDefinitionDes from "../../../toolbox/detail/cells/TdDefinitionDes";
import TdDefinitionShort from "../../../toolbox/detail/cells/TdDefinitionShort";
import FormCreateDefinition from "../../../dialogs/FormCreateDefinition";
import TdAction from "../../../toolbox/detail/cells/TdAction";

export default {
  components: {
    SlickTable,
    TdDefinitionName,
    TdDefinitionDes,
    TdDefinitionShort,
    FormCreateDefinition,
    TdAction
  },
  props: {
    dataRequestDetail: Object
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
    ...mapGetters("ht_store/matter/discovery/status/requestSets/definition", [
      "dataDefinition",
      "totals"
    ])
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
    addDefinition(dataForm) {
      const data = {
        idParams: {
          matterId: this.dataRequestDetail.matter,
          requestSetId: this.dataRequestDetail.pk
        },
        body: dataForm
      };
      this.addDefinitionRequest(data);
      this.isShowCreate = false;
    },
    updateDefinition(definitionId, name, value){
      const data = {
        idParams: {
          matterId: this.dataRequestDetail.matter,
          requestSetId: this.dataRequestDetail.pk,
          definitionId
        },
        body: {
          [name]: value
        }
      };
      this.updateDefinitionRequest(data);
    },
    removeDefinition(definitionId) {
      const data = {
        matterId: this.dataRequestDetail.matter,
        requestSetId: this.dataRequestDetail.pk,
        definitionId
      };
      this.removeDefinitionRequest(data);
    },
    updatePagination({ page }) {
      const matterId = this.dataRequestDetail.matter;
      const requestSetId = this.dataRequestDetail.pk;
      this.getDataDefinitionRequest({ matterId, requestSetId, page });
    },
    ...mapActions("ht_store/matter/discovery/status/requestSets/definition", [
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
