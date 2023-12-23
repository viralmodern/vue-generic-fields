<template>
  <v-container fluid class="pa-0 ma-0" style="overflow: auto">
    <table class="log-table">
      <thead>
        <tr>
          <th rowspan="2">
            <div :style="{width: firstColumnWidth}">Symptom Name</div>
          </th>
        </tr>
        <tr>
          <th v-for="(date, index) in tableHeaders" :key="index" class="text-xs-center">
            <TdLog class="header">{{date}}</TdLog>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="!tableRows.length">
          <td :colspan="tableHeaders.length+1" class="text-xs-center py-2">No data available</td>
        </tr>
        <tr v-else v-for="row in tableRows" :key="row.id">
          <td>
            <div class="text-xs-center" :style="{width: firstColumnWidth}">{{row.name}}</div>
          </td>
          <td v-for="cell in row.cells" :key="cell.id">
            <TdLog
              :value="cell.value"
              @update="$emit('update', {id: row.id, symptom:[...row.symptom,{date: cell.date, value: $event}]})"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <v-progress-linear v-if="dataSymptomLog === null" height="2" :indeterminate="true"></v-progress-linear>
  </v-container>
</template>

<script>
import TdLog from "./cells/TdLog";

const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export default {
  components: {
    TdLog
  },
  props: {
    dataSymptomLog: Array,
    date: Object
  },
  computed: {
    gridWidth() {
      return this.dates.length * 40 + "px";
    },
    tableHeaders() {
      return range(0, this.daysInMonth, 1).map(d => d + 1);
    },
    tableRows() {
      const { year, month } = this.date;
      return this.dataSymptomLog.map(e => {
        const { name, symptom = [] } = e;
        const id = e.id;
        const cells = range(1, this.daysInMonth + 1, 1).map(d => {
          const mDay = `${month}${d}${year}`;
          const findDays =
            symptom.find(v => v.date.split("/").join("") === mDay) || {};
          return { date: `${month}/${d}/${year}`, value: findDays.value };
        });
        return {
          id,
          name,
          cells,
          symptom: e.symptom
        };
      });
    },
    firstColumnWidth: () => "150px",
    daysInMonth() {
      return new Date(this.date.year, this.date.month, 0).getDate();
    }
  }
};
</script>
<style scoped>
.log-table {
  background: white;
  border-collapse: collapse;
}
.log-table /deep/ th,
.log-table /deep/ td {
  border: 1px solid #c4c4c4;
}
.header {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
