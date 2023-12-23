<template>
  <v-row no-gutters>
    <v-col>
      <h1>Check lists</h1>
      <CheckList nameButton="Checklist" :list="checklist" @update="$emit('update', $event)"/>
    </v-col>
  </v-row>
</template>
<script>
import CheckList from "../../cards/CheckList";

export default {
  components: {
    CheckList
  },
  props: {
    checklist: Array
  },
  computed: {
    listCheckList() {
      return (this.checklist || []).reduce(
        (x, result) => (x = [...x, ...result.list]),
        []
      );
    },
    totals() {
      return this.listCheckList.length;
    },
    totalChecked() {
      return this.listCheckList.filter(x => x.status).length;
    }
  }
};
</script>
