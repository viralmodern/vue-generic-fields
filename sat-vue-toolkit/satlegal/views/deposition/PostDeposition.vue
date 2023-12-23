<template>
  <div>
    <v-expansion-panel v-model="panel">
      <v-expansion-panel-content v-for="(item, i) in items" :key="i">
        <template v-slot:header>
          <div class="font-weight-medium text-body-2">{{item}}</div>
        </template>
        <v-card class="pa-2">
          <component :is="getDisplayComponent(i)" :index="i" :panel="panel" />
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Statistics from "../../ht_components/deposition/post-deposition/Statistics";
import WitnessEvaluation from "../../ht_components/deposition/post-deposition/WitnessEvaluation";
import TableKeyTestimony from "../../ht_components/deposition/post-deposition/TableKeyTestimony";
import TableFollowUp from "../../ht_components/deposition/post-deposition/TableFollowUp";
import TableObjection from "../../ht_components/deposition/post-deposition/TableObjection";
import TableAlert from "../../ht_components/deposition/post-deposition/TableAlert";
import NextStep from "../../ht_components/deposition/post-deposition/NextStep";

import { stageNoGroup } from "../../config";

export default {
  data() {
    return {
      panel: 0,
      items: [
        "Statistics",
        "Witness Evaluation",
        "Key Testimony",
        "Follow Up",
        "Objection",
        "Alert",
        "Next step?"
      ],
      stageNoGroup
    };
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [ // eslint-disable-line
      "dataDepositionDetail",
      "deponentType"
    ])
  },
  methods: {
    getDisplayComponent(i) {
      switch (i) {
        case 0:
          return Statistics;
        case 1:
          return WitnessEvaluation;
        case 2:
          return TableKeyTestimony;
        case 3:
          return TableFollowUp;
        case 4:
          return TableObjection;
        case 5:
          return TableAlert;
        case 6:
          return NextStep;
        default:
          return Statistics;
      }
    },
    getMultipleDataRelated() {
      if (!this.dataDepositionDetail.pk || this.deponentType !== "type1")
        return;
      const idParams = {
        matterId: this.dataDepositionDetail.matter,
        keyPleadingsId: this.dataDepositionDetail.pk
      };
      this.getDataAffidavitStatementRequest({
        stage: this.stageNoGroup,
        idParams
      });
      this.getDataExhibitsRequest({ stage: this.stageNoGroup, idParams });
      this.getDataPriorStatementRequest({ stage: this.stageNoGroup, idParams });
      this.getDataKeyPleadingsRequest({
        stage: this.stageNoGroup,
        idParams
      });
      this.getDataRFPRequest({
        stage: this.stageNoGroup,
        idParams
      });
    },
    ...mapActions(
      "matter/discovery/deposition/preparation/affidavitStatement",
      ["getDataAffidavitStatementRequest"]
    ),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/exhibits", [ // eslint-disable-line
      "getDataExhibitsRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/priorStatement", [ // eslint-disable-line
      "getDataPriorStatementRequest"
    ]),
    ...mapActions("ht_store/matter/discovery/deposition/preparation/keyPleadings", [ // eslint-disable-line
      "getDataKeyPleadingsRequest"
    ]),
    ...mapActions(
      "matter/discovery/deposition/preparation/requestForProduction",
      ["getDataRFPRequest"]
    )
  },
  mounted() {
    this.getMultipleDataRelated();
  },
  watch: {
    dataDepositionDetail() {
      this.getMultipleDataRelated();
    }
  }
};
</script>
