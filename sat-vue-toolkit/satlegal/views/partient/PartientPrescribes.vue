<template>
  <div class="px-2">
    <v-row justify="end" no-gutters class="ma-2">
      <ConfigurationColumnTable
        :columns="headers"
        keyText="text"
        @turnOnOffColumn="turnOnOffColumn"
      />
    </v-row>
    <SlickTable :items="dataPrescribes" :headers="headers.filter(x=> x.visible)">
      <template slot="cell" slot-scope="props">
        <component
          :is="getDisplayComponent(props.column.name)"
          :column="props.column"
          :dataRow="props.dataRow"
          @update="updatePrescribesRequest({id: props.dataRow.id, [props.column.name] : $event})"
          @remove="removePrescribesRequest(props.dataRow.id)"
        />
      </template>
      <template v-slot:top>
        <v-row justify="end" no-gutters class="ma-2">
          <div>
            <v-btn outlined color="primary" @click="isShowCreate = true">
              Add new
              <v-icon>mdi-add</v-icon>
            </v-btn>
            <FormCreatePrescribes
              :isShowPopup="isShowCreate"
              header="Add new question to answer"
              @closeModal="isShowCreate = false"
              @submit="addPrescribes"
            />
          </div>
        </v-row>
      </template>
    </SlickTable>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SlickTable from "../../ht_components/slick-table/SlickTable2";
import TdTextArea from "../../ht_components/invoice/cells/TdTextArea";
import TdStartDate from "../../ht_components/partient/profile/prescribes/cells/TdStartDate";
import TdEndDate from "../../ht_components/partient/profile/prescribes/cells/TdEndDate";
import TdTags from "../../ht_components/partient/profile/prescribes/cells/TdTags";
import TdAction from "../../ht_components/partient/profile/prescribes/cells/TdAction";
// link recoreds
import TdFacts from "../../ht_components/cells/TdFacts";
import TdCitation from "../../ht_components/cells/TdCitation";
import TdCharacters from "../../ht_components/cells/TdCharacters";
import TaskEvidences from "../../ht_components/cells/TaskEvidences";
import TaskHearsays from "../../ht_components/cells/TaskHearsays";
import TaskTestimonials from "../../ht_components/cells/TaskTestimonials";
import TdIndex from "../../ht_components/cells/TdIndex";
import TaskMatterHearing from "../../ht_components/cells/TaskMatterHearing";
import TdDocumentRequest from "../../ht_components/cells/TdDocumentRequest";
import TaskDocket from "../../ht_components/cells/TaskDocket";
// logs
import TaskPrivilegeLog from "../../ht_components/cells/TaskPrivilegeLog";
import TaskChainOfCustody from "../../ht_components/cells/TaskChainOfCustody";
import TaskCommunicationLog from "../../ht_components/cells/TaskCommunicationLog";
import TaskExhibitLog from "../../ht_components/cells/TaskExhibitLog";
//  toolbox
import TaskWishlist from "../../ht_components/cells/TaskWishlist";
import TaskRequestForAdmission from "../../ht_components/cells/TaskRequestForAdmission";
import TaskRequestForProduction from "../../ht_components/cells/TaskRequestForProduction";
import TaskInterrogatory from "../../ht_components/cells/TaskInterrogatory";
import TaskDeposition from "../../ht_components/cells/TaskDeposition";
// end link recoreds
import FormCreatePrescribes from "../../ht_components/dialogs/FormCreatePrescribes";
import ConfigurationColumnTable from "../../ht_components/menus/ConfigurationColumnTable";

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
    TdAction,
    ConfigurationColumnTable,
    FormCreatePrescribes
  },
  data() {
    return {
      headers: [
        {
          visible: true,
          sortable: false,
          text: "Action",
          value: "action",
          name: "action",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Name",
          value: "name",
          name: "name",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Date Started",
          value: "dateStarted",
          name: "dateStarted",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Date Stopped",
          value: "dateStopped",
          name: "dateStopped",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Dosage And Time",
          value: "dosageAndTime",
          name: "dosageAndTime",
          type: "cell"
        },
        {
          visible: true,
          sortable: false,
          text: "Prescribing Physician",
          value: "prescribingPhysician",
          name: "prescribingPhysician",
          type: "cell"
        },
        {
          visible: false,
          sortable: false,
          text: "Tags",
          value: "tags",
          name: "tags",
          type: "cell"
        },
        // link Records
        {
          visible: false,
          sortable: false,
          text: "Facts",
          value: "facts",
          name: "facts",
          type: "linked"
        },
        {
          visible: false,
          sortable: false,
          text: "Citations",
          value: "citations",
          name: "citations",
          type: "linked"
        },
        {
          visible: false,
          sortable: false,
          text: "Character",
          value: "character",
          name: "character",
          type: "linked"
        },
        {
          visible: false,
          sortable: false,
          text: "Evidences",
          value: "evidences",
          name: "evidences",
          type: "linked"
        },
        {
          visible: false,
          sortable: false,
          text: "Hearsays",
          value: "hearsays",
          name: "hearsays",
          type: "linked"
        },
        {
          visible: false,
          sortable: false,
          text: "Testimony",
          value: "testimony",
          name: "testimony",
          type: "linked"
        },
        {
          visible: false,
          sortable: false,
          text: "Index",
          value: "index",
          name: "index",
          type: "linked"
        },
        {
          visible: false,
          sortable: false,
          text: "Matter Hearning",
          value: "matterHearing",
          name: "matterHearing",
          type: "linked"
        },
        {
          visible: false,
          sortable: false,
          text: "Document Request",
          value: "documentRequest",
          name: "documentRequest",
          type: "linked"
        },
        {
          visible: false,
          sortable: false,
          text: "Docket",
          value: "docket",
          name: "docket",
          type: "linked"
        },
        // log
        {
          visible: false,
          sortable: false,
          text: "Privilege Log",
          value: "privilegeLog",
          name: "privilegeLog",
          type: "log"
        },
        {
          visible: false,
          sortable: false,
          text: "Chain Of Custody",
          value: "chainOfCustody",
          name: "chainOfCustody",
          type: "log"
        },
        {
          visible: false,
          sortable: false,
          text: "Commuication Log",
          value: "commuicationLog",
          name: "commuicationLog",
          type: "log"
        },
        {
          visible: false,
          sortable: false,
          text: "Exhibit Log",
          value: "exhibitLog",
          name: "exhibitLog",
          type: "log"
        },
        // Toolbox
        {
          visible: false,
          sortable: false,
          text: "Wishlist",
          value: "wishlist",
          name: "wishlist",
          type: "toolbox"
        },
        {
          visible: false,
          sortable: false,
          text: "Request Of Admissions",
          value: "requestOfAdmission",
          name: "requestOfAdmission",
          type: "toolbox"
        },
        {
          visible: false,
          sortable: false,
          text: "Request Of Production",
          value: "requestOfProduction",
          name: "requestOfProduction",
          type: "toolbox"
        },
        {
          visible: false,
          sortable: false,
          text: "Set of Interrogatory",
          value: "interrogatory",
          name: "interrogatory",
          type: "toolbox"
        },
        {
          visible: false,
          sortable: false,
          text: "Deposition",
          value: "deposition",
          name: "deposition",
          type: "toolbox"
        }
        // end link recoreds
      ],
      isShowCreate: false
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/partient/profile/detail/prescribes", [
      "dataPrescribes"
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
      if (columnName === "dateStarted") {
        return TdStartDate;
      }
      if (columnName === "dateStopped") {
        return TdEndDate;
      }
      if (columnName === "dosageAndTime") {
        return TdTextArea;
      }
      if (columnName === "tags") {
        return TdTags;
      }
      if (columnName === "prescribingPhysician") {
        return TdCharacters;
      }
      // link Records
      if (columnName === "facts") {
        return TdFacts;
      }
      if (columnName === "citations") {
        return TdCitation;
      }
      if (columnName === "character") {
        return TdCharacters;
      }
      if (columnName === "evidences") {
        return TaskEvidences;
      }
      if (columnName === "hearsays") {
        return TaskHearsays;
      }
      if (columnName === "testimony") {
        return TaskTestimonials;
      }
      if (columnName === "index") {
        return TdIndex;
      }
      if (columnName === "matterHearing") {
        return TaskMatterHearing;
      }
      if (columnName === "documentRequest") {
        return TdDocumentRequest;
      }
      if (columnName === "docket") {
        return TaskDocket;
      }
      if (columnName === "privilegeLog") {
        return TaskPrivilegeLog;
      }
      if (columnName === "chainOfCustody") {
        return TaskChainOfCustody;
      }
      if (columnName === "commuicationLog") {
        return TaskCommunicationLog;
      }
      if (columnName === "exhibitLog") {
        return TaskExhibitLog;
      }
      if (columnName === "wishlist") {
        return TaskWishlist;
      }
      if (columnName === "requestOfAdmission") {
        return TaskRequestForAdmission;
      }
      if (columnName === "requestOfProduction") {
        return TaskRequestForProduction;
      }
      if (columnName === "interrogatory") {
        return TaskInterrogatory;
      }
      if (columnName === "deposition") {
        return TaskDeposition;
      }
      return "td";
    },
    addPrescribes(data) {
      this.addPrescribesRequest(data);
      this.isShowCreate = false;
    },
    ...mapActions("ht_store/matter/partient/profile/detail/prescribes", [
      "getDataPrescribesRequest",
      "addPrescribesRequest",
      "updatePrescribesRequest",
      "removePrescribesRequest"
    ]),
    ...mapActions("ht_store/matter/partient/profile/tag", ["getDataTagsRequest"])
  },
  mounted() {
    this.getDataPrescribesRequest();
    this.getDataTagsRequest();
  }
};
</script>
