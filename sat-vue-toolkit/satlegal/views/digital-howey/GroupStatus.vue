<template>
  <v-row no-gutters>
    <v-col cols="12" v-for="(item, index) in arrStatusGroup" :key="index">
      <div class="title pa-2">{{ item.name }}</div>
      <TableDigital :items="item.arr" />
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
    ...mapGetters("ht_store/matter/digitalHowey", ["dataStatusGroup"]),
    arrStatusGroup() {
      const arr = [
        { id: 1, name: "Ignored", arr: this.dataStatusGroup[1] },
        { id: 2, name: "Backlog", arr: this.dataStatusGroup[2] },
        { id: 3, name: "Evaluate", arr: this.dataStatusGroup[3] },
        { id: 4, name: "Final result", arr: this.dataStatusGroup[4] }
      ];
      return arr;
    }
  },
  mounted() {
    this.getDataDigitalHowey();
  }
};
</script>
