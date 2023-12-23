<template>
  <div class="px-2">
    <v-row justify="end" class="ma-2" no-gutters>
      <ConfigurationColumnTable
        header="Cell"
        :columns="headers"
        keyText="text"
        @turnOnOffColumn="turnOnOffColumn"
      />
    </v-row>
    <SlickTable :items="dataSymptomLog" :headers="headers.filter(x=> x.visible)">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updateSymptomLogRequest({id: props.dataRow.id, [props.column.name] : $event})"
          @remove="removeSymptomLogRequest(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <div>
          <v-row justify="end" no-gutters>
            <v-btn outlined color="primary" @click="isShowCreate = true">
              Add new
              <v-icon>mdi-add</v-icon>
            </v-btn>
          </v-row>
          <FormCreateSymptomLog
            :isShowPopup="isShowCreate"
            header="Add new question to answer"
            @closeModal="isShowCreate = false"
            @submit="addSymptomLog"
          />
        </div>
      </template>
    </SlickTable>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../ht_components/slick-table/SlickTable2";
import TdTextArea from "../../ht_components/invoice/cells/TdTextArea";
import TdStartDate from "../../ht_components/partient/profile/symptom-log/cells/TdStartDate";
import TdEndDate from "../../ht_components/partient/profile/symptom-log/cells/TdEndDate";
import TdSwitch from "../../ht_components/partient/profile/prescribes/cells/TdSwitch";
import TdProgress from "../../ht_components/partient/profile/symptom-log/cells/TdProgress";
import TdTags from "../../ht_components/partient/profile/prescribes/cells/TdTags";
import TdCitation from "../../ht_components/cells/TdCitation";
import TdFacts from "../../ht_components/cells/TdFacts";
import TdCharacters from "../../ht_components/cells/TdCharacters";
import TdTreatby from "../../ht_components/partient/profile/symptom-log/cells/TrdTreatby";
import ConfigurationColumnTable from "../../ht_components/menus/ConfigurationColumnTable";
import TdLinkRecords from "../../ht_components/partient/profile/cells/TdLinkRecords";
import TdAction from "../../ht_components/toolbox/detail/cells/TdAction";
import FormCreateSymptomLog from "../../ht_components/dialogs/FormCreateSymptomLog";

export default {
  components: {
    SlickTable,
    TdTextArea,
    TdTags,
    TdStartDate,
    TdEndDate,
    TdCitation,
    TdFacts,
    TdCharacters,
    TdTreatby,
    TdProgress,
    TdLinkRecords,
    TdAction,
    ConfigurationColumnTable,
    FormCreateSymptomLog
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
          text: "Symptom name",
          value: "name",
          name: "name"
        },
        {
          visible: true,
          sortable: false,
          text: "Start date",
          value: "startDate",
          name: "startDate"
        },
        {
          visible: true,
          sortable: false,
          text: "End date",
          value: "endDate",
          name: "endDate"
        },
        {
          visible: true,
          sortable: false,
          text: "Treatment taken",
          value: "treatmentTaken",
          name: "treatmentTaken"
        },
        {
          visible: true,
          sortable: false,
          text: "Treat by",
          value: "treatBy",
          name: "treatBy"
        },
        {
          visible: true,
          sortable: false,
          text: "Severity",
          value: "severity",
          name: "severity"
        },
        {
          visible: false,
          sortable: false,
          text: "Occurence",
          value: "occurence",
          name: "occurence"
        },
        {
          visible: false,
          sortable: false,
          text: "Description",
          value: "description",
          name: "description"
        },
        {
          visible: false,
          sortable: false,
          text: "Tags",
          value: "tags",
          name: "tags"
        },
        {
          visible: false,
          sortable: false,
          text: "Facts",
          value: "facts",
          name: "facts"
        },
        {
          visible: false,
          sortable: false,
          text: "Characters",
          value: "characters",
          name: "characters"
        },
        {
          visible: false,
          sortable: false,
          text: "Citations",
          value: "citations",
          name: "citations"
        },
        {
          visible: false,
          sortable: false,
          text: "LinkRecords",
          value: "linkRecords",
          name: "linkRecords"
        }
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile/detail/symptomLog", [
      "dataSymptomLog"
    ])
  },
  methods: {
    turnOnOffColumn({ name, visible }) {
      this.headers.find(x => x.name === name).visible = visible;
    },
    getDisplayComponent(columnName) {
      if (columnName === "action") {
        return TdAction;
      }
      if (columnName === "name") {
        return TdTextArea;
      }
      if (columnName === "startDate") {
        return TdStartDate;
      }
      if (columnName === "endDate") {
        return TdEndDate;
      }
      if (columnName === "treatmentTaken") {
        return TdSwitch;
      }
      if (columnName === "treatBy") {
        return TdTreatby;
      }
      if (columnName === "severity") {
        return TdProgress;
      }
      if (columnName === "occurence") {
        return TdSwitch;
      }
      if (columnName === "description") {
        return TdTextArea;
      }
      if (columnName === "tags") {
        return TdTags;
      }
      if (columnName === "facts") {
        return TdFacts;
      }
      if (columnName === "citations") {
        return TdCitation;
      }
      if (columnName === "characters") {
        return TdCharacters;
      }
      if (columnName === "linkRecords") {
        return TdLinkRecords;
      }
      return "td";
    },
    addSymptomLog(data) {
      this.addSymptomLogRequest(data);
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/matter/partient/profile/detail/symptomLog", [
      "addSymptomLogRequest",
      "updateSymptomLogRequest",
      "removeSymptomLogRequest"
    ])
  }
};
</script>
