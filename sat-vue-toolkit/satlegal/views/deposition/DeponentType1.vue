<template>
  <div>
    <v-expansion-panels v-model="panel" accordion>
      <v-expansion-panel v-for="(item, i) in items" :key="i">
        <v-expansion-panel-header>
          <div class="font-weight-medium text-body-2">{{item}}</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
            <component :is="getDisplayComponent(i)" :index="i" :panel="panel" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import TableKeyPleadings from "../../ht_components/deposition/preparation/TableKeyPleadings";
import TableFactChronology from "../../ht_components/deposition/preparation/TableFactChronology";
import TableRequestForProduction from "../../ht_components/deposition/preparation/TableRequestForProduction";
import TableExhibits from "../../ht_components/deposition/preparation/TableExhibits";
import TableAffidavitStatement from "../../ht_components/deposition/preparation/TableAffidavitStatement";
import TablePriorStatement from "../../ht_components/deposition/preparation/TablePriorStatement";
export default {
  components: {
    TableKeyPleadings,
    TableFactChronology,
    TableRequestForProduction,
    TableExhibits,
    TableAffidavitStatement,
    TablePriorStatement,
  },
  data() {
    return {
      panel: 0,
      items: [
        "Key Pleadings",
        "Fact Chronology",
        "Request for Production Document",
        "Exhibits",
        "Affidavit Statement",
        "Prior Statement"
      ]
    };
  },
  methods: {
    getDisplayComponent(i) {
      switch (i) {
        case 0:
          return TableKeyPleadings;
        case 1:
          return TableFactChronology;
        case 2:
          return TableRequestForProduction;
        case 3:
          return TableExhibits;
        case 4:
          return TableAffidavitStatement;
        case 5:
          return TablePriorStatement;
        default:
          return TableKeyPleadings;
      }
    }
  }
};
</script>
