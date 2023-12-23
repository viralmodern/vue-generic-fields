<template>
  <div :id="idPieChart"></div>
</template>

<script>
import * as echarts from "echarts/lib/echarts";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
export default {
  props: {
    dataPieChart: Array,
    colorPieChart: Array,
    title: String,
    idPieChart: {
      type: String,
      default: () => "idPieChart"
    }
  },
  created() {
    this.$eventHub.$on("resizeAgainPie", () => {
      setTimeout(() => {
        this.myChart.resize();
      }, 100);
    });
  },
  methods: {
    renderPieChart() {
      this.myChart = echarts.init(document.getElementById(this.idPieChart));
      var option = {
        title: {
          text: this.title,
          x: "center"
        },
        color: this.colorPieChart,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.name
        },
        series: [
          {
            name: "Structure",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.arrPieChart,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      this.myChart.setOption(option);
    }
  },
  data() {
    return {
      arrPieChart: [],
      myChart: null
    };
  },
  mounted() {
    this.arrPieChart = this.dataPieChart;
    this.renderPieChart();
  },
  computed: {
    name() {
      return this.dataPieChart.map(e => e.name);
    }
  },
  watch: {
    dataPieChart(val) {
      this.arrPieChart = val;
      this.renderPieChart();
    }
  }
};
</script>
