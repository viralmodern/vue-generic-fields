<template>
  <div>
    <div class="font-weight-medium subheading">Instruction</div>
    <SlickTable
      @update:pagination="updatePagination"
      :totals="totals"
      :items="dataInstruction"
      :headers="headers.filter(x=> x.visible)"
      class="py-2"
      groupRows="instruction"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateInstruction(props.dataRow.id, props.column.name, $event)"
          @remove="removeInstruction(props.dataRow.id)"
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
            disabled-filed-one
            labelFieldTwo="Short description"
            labelFieldThree="Description"
            header="Add new instruction"
            @closeModal="isShowCreate = false"
            @submit="addInstruction"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdShortDescription from "./cells/TdShortDescription";
import TdIntructionDes from "./cells/TdDefinitionDes";
import TdAction from "./cells/TdAction";
import FormCreateDefinition from "../../dialogs/FormCreateDefinition";

export default {
  components: {
    SlickTable,
    TdShortDescription,
    TdIntructionDes,
    FormCreateDefinition
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Short description",
          value: "shortDescription",
          name: "shortDescription"
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
    ...mapGetters("ht_store/matter/discovery/toolbox/detail/instruction", [
      "dataInstruction",
      "totals"
    ]),
    ...mapGetters("ht_store/matter/discovery/toolbox/detail", ["dataToolboxDetail"])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "description") {
        return TdIntructionDes;
      }
      if (columnName === "shortDescription") {
        return TdShortDescription;
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
    addInstruction(dataForm) {
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id,
          urlByType
        },
        body: {
          shortDescription: dataForm.definition,
          description: dataForm.description
        }
      };
      this.addInstructionRequest(data);
      this.isShowCreate = false;
    },
    updateInstruction(instructionId, name, value) {
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id,
          instructionId,
          urlByType
        },
        body: {
          [name]: value
        }
      };
      this.updateInstructionRequest(data);
    },
    removeInstruction(instructionId) {
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const data = {
        matterId: this.dataToolboxDetail.matter,
        toolboxId: this.dataToolboxDetail.id,
        instructionId,
        urlByType
      };
      this.removeInstructionRequest(data);
    },
    updatePagination({ page }) {
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const matterId = this.dataToolboxDetail.matter;
      const toolboxId = this.dataToolboxDetail.id;
      this.getDataInstructionRequest({ urlByType, matterId, toolboxId, page });
    },
    ...mapActions("ht_store/matter/discovery/toolbox/detail/instruction", [
      "getDataInstructionRequest",
      "addInstructionRequest",
      "updateInstructionRequest",
      "removeInstructionRequest"
    ])
  }
};
</script>
