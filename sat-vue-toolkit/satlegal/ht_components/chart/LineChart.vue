<template>
  <div id="main" class="line-Chart"></div>
</template>

<script>
import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/grid";
import "echarts/lib/component/toolbox";
export default {
  props: {
    arrCurrentMonthDays: Array,
    dataChartOfYears: Array
  },
  data() {
    return {
      currentLabels: [],
      arrEvidences: [],
      arrLogs: [],
      arrIndexes: [],
      arrToolbox: []
    };
  },
  methods: {
    renderLineChart() {
      var myChart = echarts.init(document.getElementById("main"));
      var option = {
        title: {
          text: "Year"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["Evidences", "Logs", "Indexes", "Toolbox"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.currentLabels
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "Evidences",
            type: "line",
            stack: "Evidences",
            data: this.arrEvidences
          },
          {
            name: "Logs",
            type: "line",
            stack: "Logs",
            data: this.arrLogs
          },
          {
            name: "Indexes",
            type: "line",
            stack: "Indexes",
            data: this.arrIndexes
          },
          {
            name: "Toolbox",
            type: "line",
            stack: "Toolbox",
            data: this.arrToolbox
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  mounted() {
    this.renderLineChart();
    this.arrEvidences = this.dataChartOfYears[0].Evidences;
    this.arrLogs = this.dataChartOfYears[0].Logs;
    this.arrIndexes = this.dataChartOfYears[0].Indexes;
    this.arrToolbox = this.dataChartOfYears[0].Toolbox;
  },
  watch: {
    arrCurrentMonthDays(val) {
      this.currentLabels = val;
      this.renderLineChart();
    },
    dataChartOfYears(val) {
      this.arrEvidences = val[0] ? val[0].Evidences : [];
      this.arrLogs = val[0] ? val[0].Logs : [];
      this.arrIndexes = val[0] ? val[0].Indexes : [];
      this.arrToolbox = val[0] ? val[0].Toolbox : [];
      this.renderLineChart();
    }
  }
};
</script>
<style scoped>
.line-Chart {
  width: 100%;
  height: 500px;
}
</style>
