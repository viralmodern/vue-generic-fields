<template>
  <div>
    <div class="font-weight-medium subheading">Set of Interrogatory</div>
    <SlickTable
      @update:pagination="updatePagination"
      :totals="totals"
      :items="dataInterrogatory"
      :headers="headers.filter(x=> x.visible)"
      class="py-2"
    >
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateInterrogatory(props.dataRow.id, props.column.name, $event)"
          @remove="removeInterrogatory(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-btn dark color="primary" @click="isShowCreate = true">
            Add new
            <v-icon dark>mdi-add</v-icon>
          </v-btn>
          <FormCreateInterrogatory
            :isShowPopup="isShowCreate"
            :tags="tag"
            header="Add new set of interrogatory"
            @closeModal="isShowCreate = false"
            @submit="addInterrogatory"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../slick-table/SlickTable2";
import TdInterrogatory from "./cells/TdInterrogatory";
import TdInterrogatoryResDes from "./cells/TdInterrogatoryResDes";
import TdObjection from "./cells/TdObjection";
import TdCharacters from "./cells/TdCharacters";
import TdTags from "./cells/TdTags";
import TdAction from "./cells/TdAction";
import FormCreateInterrogatory from "../../dialogs/FormCreateInterrogatory";

export default {
  components: {
    SlickTable,
    TdInterrogatory,
    TdInterrogatoryResDes,
    TdObjection,
    TdCharacters,
    TdTags,
    TdAction,
    FormCreateInterrogatory
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Interrogatory",
          value: "interrogatory",
          name: "interrogatory"
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
    ...mapGetters("ht_store/matter/discovery/toolbox/detail/interrogatory", [
      "dataInterrogatory",
      "totals"
    ]),
    ...mapGetters("ht_store/matter/tags", ["tag"]),
    ...mapGetters("ht_store/matter/discovery/toolbox/detail", ["dataToolboxDetail"])

  },
  methods: {
    getDisplayComponent(columnName) {
      if (columnName === "interrogatory") {
        return TdInterrogatory;
      }
      if (columnName === "resDes") {
        return TdInterrogatoryResDes;
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
    addInterrogatory(dataForm) {
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id
        },
        body: dataForm
      };
      this.addInterrogatoryRequest(data);
      this.isShowCreate = false;
    },
    updateInterrogatory(interrogatoryId, name, value) {
      const data = {
        idParams: {
          matterId: this.dataToolboxDetail.matter,
          toolboxId: this.dataToolboxDetail.id,
          interrogatoryId
        },
        body: {
          [name]: value
        }
      };
      this.updateInterrogatoryRequest(data);
    },
    removeInterrogatory(interrogatoryId) {
      const data = {
        matterId: this.dataToolboxDetail.matter,
        toolboxId: this.dataToolboxDetail.id,
        interrogatoryId
      };
      this.removeInterrogatoryRequest(data);
    },
    updatePagination({ page }) {
      const matterId = this.dataToolboxDetail.matter;
      const toolboxId = this.dataToolboxDetail.id;
      this.getDataInterrogatoryRequest({ matterId, toolboxId, page });
    },
    ...mapActions("ht_store/matter/discovery/toolbox/detail/interrogatory", [
      "getDataInterrogatoryRequest",
      "addInterrogatoryRequest",
      "updateInterrogatoryRequest",
      "removeInterrogatoryRequest"
    ])
  }
};
</script>
