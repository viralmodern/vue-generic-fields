<template>
  <div class="mb-3 mx-2">
    <v-row no-gutters>
      <v-col cols="12" sm="6" lg="6" v-for="item in dataSummaryGroup" :key="item.id" class="pa-2">
        <CardFactSummaryItem
          :type="item.type"
          :total="item.fact"
          :characters="item.character"
          :location="item.location"
          :issues="item.issue"
        />
      </v-col>
      <v-col cols="12" class="pa-2">
        <CardFactSummary
          :involvedCharacters="dataSummaryOverview.character"
          :locations="dataSummaryOverview.location"
          :issuses="dataSummaryOverview.issue"
        />
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import CardFactSummaryItem from "../cards/CardFactSummaryItem";
import CardFactSummary from "../cards/CardFactSummary";

export default {
  components: {
    CardFactSummary,
    CardFactSummaryItem
  },
  computed: {
    ...mapGetters("ht_store/project/research/facts", ["dataSummaryGroup", "dataSummaryOverview"])
  }
};
</script>
