<template>
  <div>
    <div class="font-weight-medium subheading">Request Of Production</div>
    <SlickTable
      @update:pagination="updatePagination"
      :totals="totals"
      :items="dataProduction"
      :headers="headers.filter(x=> x.visible)"
      class="py-2"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateProduction(props.dataRow.id, props.column.name, $event)"
          @remove="removeProduction(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>mdi-add</v-icon>
          </v-btn>
          <FormCreateProduction
            :isShowPopup="isShowCreate"
            :tags="tag"
            header="Add new request of production"
            @closeModal="isShowCreate = false"
            @submit="addProduction"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdProductionReqDes from "./cells/TdProductionReqDes";
import TdProductionResDes from "./cells/TdProductionResDes";
import TdObjection from "./cells/TdObjection";
import TdCharacters from "./cells/TdCharacters";
import TdTags from "./cells/TdTags";
import TdAction from "./cells/TdAction";
import FormCreateProduction from "../../dialogs/FormCreateProduction";

export default {
  components: {
    SlickTable,
    TdProductionReqDes,
    TdProductionResDes,
    TdObjection,
    TdCharacters,
    TdTags,
    TdAction,
    FormCreateProduction
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Request Description",
          value: "reqDes",
          name: "reqDes"
        },
        {
          visible: true,
          sortable: false,
          text: "Response Description",
          value: "resDes",
          name: "resDes"
        },
        {
          visible: true,
          sortable: false,
          text: "Objection",
          value: "objection",
          name: "objection"
        },
        {
          visible: true,
          sortable: false,
          text: "Characters",
          value: "characters",
          name: "characters"
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
          text: "Action",
          value: "action",
          name: "action"
        }
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/toolbox/detail/requestOfProduction", [
      "dataProduction",
      "totals"
    ]),
    ...mapGetters("ht_store/matter/tags", ["tag"]),
    ...mapGetters("ht_store/matter/discovery/toolbox/detail", ["dataToolboxDetail"])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "reqDes") {
        return TdProductionReqDes;
      }
      if (columnName === "resDes") {
        return TdProductionResDes;
      }
      if (columnName === "objection") {
        return TdObjection;
      }
      if (columnName === "characters") {
        return TdCharacters;
      }
      if (columnName === "tags") {
        return TdTags;
      }
      if (columnName === "action") {
        return TdAction;
      }
      return "td";
    },
    addProduction(dataForm) {
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id
        },
        body: dataForm
      };
      this.addProductionRequest(data);
      this.isShowCreate = false;
    },
    updateProduction(productionId, name, value) {
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id,
          productionId
        },
        body: {
          [name]: value
        }
      };
      this.updateProductionRequest(data);
    },
    removeProduction(productionId) {
      const data = {
        matterId: this.dataToolboxDetail.matter,
        toolboxId: this.dataToolboxDetail.id,
        productionId
      };
      this.removeProductionRequest(data);
    },
    updatePagination({ page }) {
      const matterId = this.dataToolboxDetail.matter;
      const toolboxId = this.dataToolboxDetail.id;
      this.getDataProductionRequest({ matterId, toolboxId, page });
    },
    ...mapActions("ht_store/matter/discovery/toolbox/detail/requestOfProduction", [
      "getDataProductionRequest",
      "addProductionRequest",
      "updateProductionRequest",
      "removeProductionRequest"
    ])
  }
};
</script>
