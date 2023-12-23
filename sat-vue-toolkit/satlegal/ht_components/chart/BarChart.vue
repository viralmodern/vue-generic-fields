<template>
  <div :id="idBarChart"></div>
</template>

<script>
import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/bar";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/grid";
import "echarts/lib/component/toolbox";
export default {
  props: {
    arrxAxis: Array,
    dataInvoiced: Array,
    dataExpense: Array,
    title: String,
    colorChart: Array,
    dataLegend: Array,
    dataSeries: Array,
    idBarChart: {
      type: String,
      default: () => "idBarChart"
    }
  },
  created() {
    this.$eventHub.$on("resizeAgainBar", () => {
      setTimeout(() => {
        this.myChart.resize();
      }, 100);
    });
  },
  methods: {
    renderBarChart() {
      this.myChart = echarts.init(document.getElementById(this.idBarChart));
      var option = {
        title: {
          text: this.title
        },
        color: this.colorChart,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: this.dataLegend
        },
        toolbox: {
          shorotatew: true,
          orient: "vertical",
          left: "right",
          top: "center"
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            axisTick: { show: false },
            data: this.arrxAxis
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: this.arrBarChart
      };
      this.myChart.setOption(option);
    }
  },
  data() {
    return {
      arrBarChart: [],
      myChart: null
    };
  },
  mounted() {
    this.arrBarChart = this.dataSeries;
    this.renderBarChart();
  },
  watch: {
    dataSeries(val) {
      this.arrBarChart = val;
      this.renderBarChart();
    }
  }
};
</script>
