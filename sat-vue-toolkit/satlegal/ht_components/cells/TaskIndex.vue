<template>
  <td>{{dataIndexDiscovery}}</td>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    dataRow: Object,
    colum: Object
  },
  computed: {
    ...mapGetters("ht_store/matter/discovery/index", ["dataIndexDiscovery"])
  }
};
</script>
