<template>
  <v-row no-gutters>
    <v-col cols="12">
      <TypePlaintiff />
      <router-view></router-view>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from "vuex";
import TypePlaintiff from "./TypePlaintiff";

export default {
  components: {
    TypePlaintiff
  },
  methods: {
    ...mapActions("ht_store/matter/plaintiff", ["getDataPlaintiff"]),
    ...mapActions("ht_store/matter/plaintiff/plaintiffGroup", ["getDataPlaintiffGroup"])
  },
  mounted() {
    this.getDataPlaintiff();
    this.getDataPlaintiffGroup();
  }
};
</script>
