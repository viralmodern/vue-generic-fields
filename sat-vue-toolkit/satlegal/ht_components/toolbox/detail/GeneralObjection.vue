<template>
  <div>
    <div class="font-weight-medium subheading">General Objection</div>
    <SlickTable
      @update:pagination="updatePagination"
      :totals="totals"
      :items="dataGeneralObjection"
      :headers="headers.filter(x=> x.visible)"
      class="py-2"
      groupRows="generalObject"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateGeneralObjection(props.dataRow.id, props.column.name, $event)"
          @remove="removeGeneralObjection(props.dataRow.id)"
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
            labelFieldTwo="Objection comment"
            labelFieldThree="General objection"
            header="Add new general objection"
            @closeModal="isShowCreate = false"
            @submit="addGeneralObjection"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdObjectionComment from "./cells/TdObjectionComment";
import TdGeneralObjection from "./cells/TdGeneralObjection";
import TdAction from "./cells/TdAction";
import FormCreateDefinition from "../../dialogs/FormCreateDefinition";

export default {
  components: {
    SlickTable,
    TdGeneralObjection,
    TdObjectionComment,
    FormCreateDefinition
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Objection comment",
          value: "comment",
          name: "comment"
        },
        {
          visible: true,
          sortable: false,
          text: "General objection",
          value: "generalObjection",
          name: "generalObjection"
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
    ...mapGetters("ht_store/matter/discovery/toolbox/detail/generalObjection", [
      "dataGeneralObjection",
      "totals"
    ]),
    ...mapGetters("ht_store/matter/discovery/toolbox/detail", ["dataToolboxDetail"])
  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "comment") {
        return TdObjectionComment;
      }
      if (columnName === "generalObjection") {
        return TdGeneralObjection;
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
    addGeneralObjection(dataForm) {
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id,
          urlByType
        },
        body: {
          generalObjection: dataForm.description,
          comment: dataForm.definition
        }
      };
      this.addGeneralObjectionRequest(data);
      this.isShowCreate = false;
    },
    updateGeneralObjection(generalObjectId, name, value) {
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id,
          generalObjectId,
          urlByType
        },
        body: {
          [name]: value
        }
      };
      this.updateGeneralObjectionRequest(data);
    },
    removeGeneralObjection(generalObjectId) {
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const data = {
        matterId: this.dataToolboxDetail.matter,
        toolboxId: this.dataToolboxDetail.id,
        generalObjectId,
        urlByType
      };
      this.removeGeneralObjectionRequest(data);
    },
    updatePagination({ page }) {
      const urlByType = this.getUrlByType(this.dataToolboxDetail.type);
      const matterId = this.dataToolboxDetail.matter;
      const toolboxId = this.dataToolboxDetail.id;
      this.getDataGeneralObjectionRequest({ urlByType, matterId, toolboxId, page });
    },
    ...mapActions("ht_store/matter/discovery/toolbox/detail/generalObjection", [
      "getDataGeneralObjectionRequest",
      "addGeneralObjectionRequest",
      "updateGeneralObjectionRequest",
      "removeGeneralObjectionRequest"
    ])
  }
};
</script>
