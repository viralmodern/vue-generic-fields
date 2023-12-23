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
import TableExpertMethod from "../../ht_components/deposition/preparation/TableExpertMethod";
import TableExpertOpinion from "../../ht_components/deposition/preparation/TableExpertOpinion";
export default {
  components: {
    TableExpertMethod,
    TableExpertOpinion
  },
  data() {
    return {
      panel: 0,
      items: ["Expert Method", "Expert Opinion"]
    };
  },
  methods: {
    getDisplayComponent(i) {
      switch (i) {
        case 0:
          return TableExpertMethod;
        case 1:
          return TableExpertOpinion;
        default:
          return TableExpertMethod;
      }
    }
  }
};
</script>
