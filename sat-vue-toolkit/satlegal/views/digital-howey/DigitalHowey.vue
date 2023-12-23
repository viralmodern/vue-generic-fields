<template>
  <v-row no-gutters>
    <v-col cols="12">
      <TableDigital :items="dataDigitalHowey" />
    </v-col>
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import TableDigital from "./TableDigital";

export default {
  components: {
    TableDigital
  },
  methods: {
    ...mapActions("ht_store/matter/digitalHowey", ["getDataDigitalHowey"])
  },
  computed: {
    ...mapGetters("ht_store/matter/digitalHowey", ["dataDigitalHowey"])
  },
  mounted() {
    this.getDataDigitalHowey();
  }
};
</script>
