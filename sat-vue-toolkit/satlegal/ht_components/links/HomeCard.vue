<template>
  <div>
    <div>
      <CardViewItem
        v-for="(item, index) in compileDataFacts"
        :key="index"
        :types="types"
        :items="item"
        :character="character"
        :creator="members"
        :location="locations"
        class="ma-3"
      />
    </div>
  </div>
</template>
<script>
import moment from "moment";
import { mapGetters } from "vuex";
import CardViewItem from "../cards/CardViewItem";
export default {
  components: {
    CardViewItem
  },
  data() {
    return {
      selectedDay: ""
    };
  },
  computed: {
    ...mapGetters("ht_store/project/research/facts", ["dataFactsReSearch"]),
    ...mapGetters("ht_store/matter/character", ["character"]),
    ...mapGetters("ht_store/project/members", ["members"]),
    ...mapGetters("ht_store/matter/location", ["locations"]),
    ...mapGetters("ht_store/matter/type", ["types"]),
    compileDataFacts() {
      if (this.selectedDay) {
        return (this.dataFactsReSearch || []).filter(x => {
          return (
            moment(x.dateTime.from).format("YYYY-MM-DD") === this.selectedDay
          );
        });
      } else {
        return (this.dataFactsReSearch || []);
      }
    }
  }
};
</script>
