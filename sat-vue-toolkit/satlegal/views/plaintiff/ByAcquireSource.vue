<template>
  <v-row no-gutters>
    <v-col cols="12" v-for="(item, index) in groupAcquireSource" :key="index">
      <div class="title pa-2">{{ index }}</div>
      <TablePlaintiff :items="item" />
    </v-col>
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
import TablePlaintiff from "./TablePlaintiff";
export default {
  components: {
    TablePlaintiff
  },
  computed: {
    ...mapGetters("ht_store/matter/plaintiff", ["groupAcquireSource"])
  }
};
</script>
