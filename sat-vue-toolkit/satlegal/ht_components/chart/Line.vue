<template>
  <div :id="idLineChart"></div>
</template>

<script>
import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
export default {
  props: {
    arrxAxis: Array,
    colorChart: Array,
    title: String,
    dataSeries: Array,
    idLineChart: {
      type: String,
      default: () => "idLineChart"
    }
  },
  data() {
    return {
      arrLineChart: [],
      myChart: null
    };
  },
  created() {
    this.$eventHub.$on("resizeAgainLine", () => {
      setTimeout(() => {
        this.myChart.resize();
      }, 100);
    });
  },
  methods: {
    renderLineChart() {
      this.myChart = echarts.init(document.getElementById(this.idLineChart));
      var option = {
        title: {
          text: this.title
        },
        color: this.colorChart,
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross"
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.arrxAxis
        },
        yAxis: {
          type: "value",
          axisLabel: {
            formatter: "{value}"
          },
          axisPointer: {
            snap: true
          }
        },
        series: this.dataSeries
      };
      this.myChart.setOption(option);
    }
  },
  mounted() {
    this.arrLineChart = this.dataSeries;
    this.renderLineChart();
  },
  watch: {
    dataSeries(val) {
      this.arrLineChart = val;
      this.renderLineChart();
    }
  }
};
</script>
