<template>
  <v-btn rounded color="success" :outlined="!hasFilters" @click="openRight('filterBoard')">
    Filter is {{hasFilters ? 'on' : 'off'}}
    <v-icon right>mdi-filter_list</v-icon>
  </v-btn>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import {$$STORE_PREFIX} from "../../utils";
export default {
  computed: {
    ...mapGetters("ht_store/project/board/filter", ["hasFilters"])
  },
  methods: {
    ...mapMutations("ht_store/layout", ["openRight"])
  }
};
</script>
