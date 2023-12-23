<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("ht_store/matter/discovery/deposition/detail", [ // eslint-disable-line
      "dataDepositionDetail",
      "deponentType"
    ])
  }
};
</script>
