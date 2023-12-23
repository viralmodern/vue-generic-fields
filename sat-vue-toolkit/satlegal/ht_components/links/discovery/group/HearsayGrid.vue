<template>
  <v-row no-gutters>
    <v-col cols="12">
      <TableEvidences :dataEvidences="dataHearsay"/>
    </v-col>
  </v-row>
</template>

<script>
import TableEvidences from "../../../tables/TableEvidences";
export default {
  components: {
    TableEvidences
  },
  props: {
    dataHearsay: Array
  }
};
</script>