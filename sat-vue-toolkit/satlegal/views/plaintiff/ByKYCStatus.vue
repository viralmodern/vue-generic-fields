<template>
  <v-row no-gutters>
    <v-col cols="12" v-for="(item, index) in dataGroupByKYCStatus" :key="index">
      <div class="title pa-2">{{ item.name }}</div>
      <TablePlaintiff :items="item.arr" />
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
    ...mapGetters("ht_store/matter/plaintiff", ["groupByKYCStatus"]),
    dataGroupByKYCStatus() {
      const arr = [
        { id: 1, name: "KYC Status False", arr: this.groupByKYCStatus.false },
        { id: 2, name: "KYC Status True", arr: this.groupByKYCStatus.true }
      ];
      return arr;
    }
  }
};
</script>
