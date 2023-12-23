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
import TablePublication from "../../ht_components/deposition/preparation/TablePublication";
import TableCorrespondence from "../../ht_components/deposition/preparation/TableCorrespondence";
import TableInvoice from "../../ht_components/deposition/preparation/TableInvoice";
import TableDraft from "../../ht_components/deposition/preparation/TableDraft";
import TableTestimony from "../../ht_components/deposition/preparation/TableTestimony";
export default {
  components: {
    TablePublication,
    TableCorrespondence,
    TableInvoice,
    TableDraft,
    TableTestimony
  },
  data() {
    return {
      panel: 0,
      items: [
        "Published Literature of textbook relied upon or consulted by the expert",
        "Correspondence between the expert and counsel for the opposing party",
        "Time and Billing Records for the expert for the case",
        "Drafts prepared by the expert",
        "Testimonies givan by the expert prior deposition over past 4 years",
      ]
    };
  },
  methods: {
    getDisplayComponent(i) {
      switch (i) {
        case 0:
          return TablePublication;
        case 1:
          return TableCorrespondence;
        case 2:
          return TableInvoice;
        case 3:
          return TableDraft;
        case 4:
          return TableTestimony;
        default:
          return TablePublication;
      }
    }
  }
};
</script>
