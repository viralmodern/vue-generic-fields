<template>
  <v-row no-gutters>
    <v-col cols="12" v-for="(item, index) in arrResultGroup" :key="index">
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
    ...mapGetters("ht_store/matter/digitalHowey", ["dataResultGroup"]),
    arrResultGroup() {
      const arr = [
        { id: 1, name: "N/A", arr: this.dataResultGroup[1] },
        { id: 2, name: "Pass", arr: this.dataResultGroup[2] },
        { id: 3, name: "Fail", arr: this.dataResultGroup[3] }
      ];
      return arr;
    }
  },
  mounted() {
    this.getDataDigitalHowey();
  }
};
</script>
