<template>
  <div>
    <v-expansion-panels v-model="panel" accordion>
      <v-expansion-panel v-for="(item, i) in items" :key="i">
        <v-expansion-panel-header>
          <div class="text-body-2">{{item}}</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <component :is="getDisplayComponent(i)" :index="i" :panel="panel" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
//type 4
import PriorExperience from "../../ht_components/deposition/preparation/PriorExperience";
import TableWrittenArticle from "../../ht_components/deposition/preparation/TableWrittenArticle";
import TablePriorEmployment from "../../ht_components/deposition/preparation/TablePriorEmployment";
import TableGivenDeposition from "../../ht_components/deposition/preparation/TableGivenDeposition";
import TableAuthoriative from "../../ht_components/deposition/preparation/TableAuthoriative";
import TableInformationAndDocument from "../../ht_components/deposition/preparation/TableInformationAndDocument";
import TableRendered from "../../ht_components/deposition/preparation/TableRendered";

export default {
  components: {
    PriorExperience,
    TableWrittenArticle,
    TablePriorEmployment,
    TableGivenDeposition,
    TableAuthoriative,
    TableInformationAndDocument,
    TableRendered
  },
  data() {
    return {
      panel: 0,
      items: [
        "Prior Experience ",
        "Prior Employment as Expert Witness",
        "Written Articles",
        "Given Desposition",
        "Authoriative",
        "Information and Document Expert Withness has received conceming the case",
        "Rendered Notes and Reports",
      ]
    };
  },
  methods: {
    getDisplayComponent(i) {
      switch (i) {
        case 0:
          return PriorExperience;
        case 1:
          return TablePriorEmployment;
        case 2:
          return TableWrittenArticle;
        case 3:
          return TableGivenDeposition;
        case 4:
          return TableAuthoriative;
        case 5:
          return TableInformationAndDocument;
        case 6:
          return TableRendered;
        default:
          return PriorExperience;
      }
    }
  }
};
</script>
