<template>
  <v-row no-gutters>
    <v-col cols="12">
      <TableEvidences :dataEvidences="dataTestimony"/>
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
    dataTestimony: Array
  }
};
</script>