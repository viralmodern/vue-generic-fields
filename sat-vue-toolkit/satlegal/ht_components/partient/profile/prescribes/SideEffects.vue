<template>
  <div class="px-2">
    <SlickTable :items="dataSideEffects" :headers="headers.filter(x=> x.visible)">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateSideEffectsRequest({id: props.dataRow.id, [props.column.name] : $event})"
          @remove="removeSideEffectsRequest(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-row justify="end" no-gutters >
            <v-btn dark color="primary" @click="isShowCreate = true">
              Add new
              <v-icon dark>add</v-icon>
            </v-btn>
          </v-row>
          <FormCreateSideEffects
            :isShowPopup="isShowCreate"
            header="Add new side effects"
            @closeModal="isShowCreate = false"
            @submit="addSideEffects"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../../slick-table/SlickTable2";
import TdTextArea from "../../../invoice/cells/TdTextArea";
import TdDate from "../../../invoice/cells/TdDate";
import TdProgress from "./cells/TdProgress";
import TdSwitch from "./cells/TdSwitch";
import TdProximateCause from "./cells/TdProximateCause";
import TdAction from "../../../toolbox/detail/cells/TdAction";
import FormCreateSideEffects from "../../../dialogs/FormCreateSideEffects";

export default {
  components: {
    SlickTable,
    TdTextArea,
    TdDate,
    TdProgress,
    TdProximateCause,
    TdSwitch,
    TdAction,
    FormCreateSideEffects
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
          text: "Side Effect",
          value: "sideEffect",
          name: "sideEffect"
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
          text: "Does patient have this side effect",
          value: "status",
          name: "status"
        },
        {
          visible: true,
          sortable: false,
          text: "Date Discovered",
          value: "dateDiscovered",
          name: "dateDiscovered"
        },
        {
          visible: true,
          sortable: false,
          text: "Severity",
          value: "severity",
          name: "severity"
        },
        {
          visible: true,
          sortable: false,
          text: "Proximate Cause",
          value: "proximateCause",
          name: "proximateCause"
        }
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters(
      "matter/partient/profile/detail/prescribes/detail/sideEffects",
      ["dataSideEffects"]
    )
  },
  methods: {
    turnOnOffColumn({ name, visible }) {
      this.headers.find(x => x.name === name).visible = visible;
    },
    getDisplayComponent(columnName) {
      if (columnName === "action") {
        return TdAction;
      }
      if (columnName === "sideEffect") {
        return TdTextArea;
      }
      if (columnName === "description") {
        return TdTextArea;
      }
      if (columnName === "status") {
        return TdSwitch;
      }
      if (columnName === "dateDiscovered") {
        return TdDate;
      }
      if (columnName === "severity") {
        return TdProgress;
      }
      if (columnName === "proximateCause") {
        return TdProximateCause;
      }
      return "td";
    },
    addSideEffects(data) {
      this.addSideEffectsRequest(data);
      this.isShowCreate = false;
    },
    ...mapActions(
      "matter/partient/profile/detail/prescribes/detail/sideEffects",
      [
        "getDataSideEffectsRequest",
        "addSideEffectsRequest",
        "updateSideEffectsRequest",
        "removeSideEffectsRequest"
      ]
    ),
    ...mapActions("ht_store/matter/partient/injury/detail/proximate", [
      "getDataProximateRequest"
    ])
  },
  mounted() {
    this.getDataSideEffectsRequest();
    this.getDataProximateRequest();
  }
};
</script>
