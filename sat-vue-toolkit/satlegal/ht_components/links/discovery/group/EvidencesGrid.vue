<template>
  <v-row no-gutters>
    <v-col cols="12">
      <TableEvidences :dataEvidences="dataEvidences"/>
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
    dataEvidences: Array
  }
};
</script>