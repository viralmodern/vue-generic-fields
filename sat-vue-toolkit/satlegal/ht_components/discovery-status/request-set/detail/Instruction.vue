<template>
  <div>
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
            <v-icon dark>add</v-icon>
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
import SlickTable from "../../../slick-table/SlickTable2";
import TdShortDescription from "../../../toolbox/detail/cells/TdShortDescription";
import TdIntructionDes from "../../../toolbox/detail/cells/TdDefinitionDes";
import TdAction from "../../../toolbox/detail/cells/TdAction";
import FormCreateDefinition from "../../../dialogs/FormCreateDefinition";

export default {
  components: {
    SlickTable,
    TdShortDescription,
    TdIntructionDes,
    FormCreateDefinition
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
    ...mapGetters("ht_store/matter/discovery/status/requestSets/instruction", [
      "dataInstruction",
      "totals"
    ])
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
    addInstruction(dataForm) {
      const data = {
        idParams: {
          matterId: this.dataRequestDetail.matter,
          requestSetId: this.dataRequestDetail.pk
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
      const data = {
        idParams: {
          matterId: this.dataRequestDetail.matter,
          requestSetId: this.dataRequestDetail.pk,
          instructionId
        },
        body: {
          [name]: value
        }
      };
      this.updateInstructionRequest(data);
    },
    removeInstruction(instructionId) {
      const data = {
        matterId: this.dataRequestDetail.matter,
        requestSetId: this.dataRequestDetail.pk,
        instructionId
      };
      this.removeInstructionRequest(data);
    },
    updatePagination({ page }) {
      const matterId = this.dataRequestDetail.matter;
      const requestSetId = this.dataRequestDetail.pk;
      this.getDataInstructionRequest({ matterId, requestSetId, page });
    },
    ...mapActions("ht_store/matter/discovery/status/requestSets/instruction", [
      "getDataInstructionRequest",
      "addInstructionRequest",
      "updateInstructionRequest",
      "removeInstructionRequest"
    ])
  }
};
</script>
