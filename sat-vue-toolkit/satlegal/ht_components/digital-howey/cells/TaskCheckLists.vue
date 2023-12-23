<template>
  <td>
    <v-menu
      style="width: 130px"
      transition="scale-transition"
      offset-x
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <span v-on="on">{{totalChecked}}/{{totals}}</span>
      </template>
      <v-card>
        <CheckList
          nameButton="Checklist"
          style="width:700px"
          :list="dataRow[column.name]"
          @update="$emit('update', $event)"
        />
      </v-card>
    </v-menu>
  </td>
</template>
<script>
import CheckList from "../../cards/CheckList";

export default {
  components: {
    CheckList
  },
  props: {
    dataRow: Object,
    column: Object
  },
  computed: {
    listCheckLists() {
      return (this.dataRow[this.column.name] || []).reduce(
        (x, result) => (x = [...x, ...result.list]),
        []
      );
    },
    totals() {
      return this.listCheckLists.length;
    },
    totalChecked() {
      return this.listCheckLists.filter(x => x.status).length;
    }
  }
};
</script>
