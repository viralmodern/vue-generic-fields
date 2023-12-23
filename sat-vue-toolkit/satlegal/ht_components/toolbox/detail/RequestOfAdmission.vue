<template>
  <div>
    <div class="font-weight-medium subheading">Request Of Admission</div>
    <SlickTable
      @update:pagination="updatePagination"
      :totals="totals"
      :items="dataAdmission"
      :headers="headers.filter(x=> x.visible)"
      class="py-2"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateAdmission(props.dataRow.id, props.column.name, $event)"
          @remove="removeAdmission(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>mdi-add</v-icon>
          </v-btn>
          <FormCreateAdmission
            :isShowPopup="isShowCreate"
            :tags="tag"
            header="Add new request of admission"
            @closeModal="isShowCreate = false"
            @submit="addAdmission"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdAdmissionDes from "./cells/TdAdmissionDes";
import TdAdmissionResDes from "./cells/TdAdmissionResDes";
import TdAdmit from "./cells/TdAdmit";
import TdCharacters from "./cells/TdCharacters";
import TdTags from "./cells/TdTags";
import TdAction from "./cells/TdAction";
import FormCreateAdmission from "../../dialogs/FormCreateAdmission";

export default {
  components: {
    SlickTable,
    TdAdmissionDes,
    TdAdmissionResDes,
    TdAdmit,
    TdCharacters,
    TdTags,
    TdAction,
    FormCreateAdmission
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Admission description",
          value: "admissionDes",
          name: "admissionDes"
        },
        {
          visible: true,
          sortable: false,
          text: "Response description",
          value: "admissionResDes",
          name: "admissionResDes"
        },
        {
          visible: true,
          sortable: false,
          text: "Admit",
          value: "admit",
          name: "admit"
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
    ...mapGetters("ht_store/matter/discovery/toolbox/detail/requestOfAdmission", [
      "dataAdmission",
      "totals"
    ]),
    ...mapGetters("ht_store/matter/tags", ["tag"]),
    ...mapGetters("ht_store/matter/discovery/toolbox/detail", ["dataToolboxDetail"])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "admissionDes") {
        return TdAdmissionDes;
      }
      if (columnName === "admissionResDes") {
        return TdAdmissionResDes;
      }
      if (columnName === "admit") {
        return TdAdmit;
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
    addAdmission(dataForm) {
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id
        },
        body: dataForm
      };
      this.addAdmissionRequest(data);
      this.isShowCreate = false;
    },
    updateAdmission(admissionId, name, value) {
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id,
          admissionId
        },
        body: {
          [name]: value
        }
      };
      this.updateAdmissionRequest(data);
    },
    removeAdmission(admissionId) {
      const data = {
        matterId: this.dataToolboxDetail.matter,
        toolboxId: this.dataToolboxDetail.id,
        admissionId
      };
      this.removeAdmissionRequest(data);
    },
    updatePagination({ page }) {
      const matterId = this.dataToolboxDetail.matter;
      const toolboxId = this.dataToolboxDetail.id;
      this.getDataAdmissionRequest({ matterId, toolboxId, page });
    },
    ...mapActions("ht_store/matter/discovery/toolbox/detail/requestOfAdmission", [
      "getDataAdmissionRequest",
      "addAdmissionRequest",
      "updateAdmissionRequest",
      "removeAdmissionRequest"
    ])
  }
};
</script>
