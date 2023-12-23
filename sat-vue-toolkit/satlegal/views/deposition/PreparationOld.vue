<template>
  <div class="pa-3">
    <DeponentType1 v-if="deponentType === 1" />
    <DeponentType2 v-if="deponentType === 2" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DeponentType1 from "./DeponentType1";
import DeponentType2 from "./DeponentType2";
export default {
  components: {
    DeponentType1,
    DeponentType2
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [
      "dataDepositionDetail",
      "deponentType"
    ])
  }
};
</script>
