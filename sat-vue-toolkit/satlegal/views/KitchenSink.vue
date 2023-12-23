<template>
  <v-row no-gutters>
    <div class="text-h5 pa-2">Types Of Charts</div>
    <TypesOfCharts />
    <div class="text-h5 pa-2">Line Chart</div>
    <LayoutLineChart :dataLineChart="dataChart" />

    <div class="text-h5 pa-2">Request Task</div>
    <TableRequestTask />
  </v-row>
</template>
<script>
import LayoutLineChart from "../ht_components/chart/LayoutLineChart";
import TypesOfCharts from "../ht_components/chart/TypesOfCharts";
import TableRequestTask from "../ht_components/discovery-status/request-task/TableRequestTask";
import { dataChart } from "../mock-data/data-line-chart";
export default {
  data() {
    return {
      dataChart
    };
  },
  components: {
    LayoutLineChart,
    TypesOfCharts,
    TableRequestTask
  }
};
</script>
