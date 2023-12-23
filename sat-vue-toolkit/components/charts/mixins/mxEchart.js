import * as echarts from 'echarts';
export default {
  props: {
    width: {
      type: String,
      default: () => '100%'
    },
    height: {
      type: String,
      default: () => '600px'
    },
    chartOptions: {
      type: Object,
      default: () => {}
    },
    idChart: {
      type: String,
      required: true,
      default: () => ''
    }
  },
  data () {
    return {
      myChart: null,
      options: {},
    }
  },
  mounted () {
    this.initChart()
  },
  watch: {
    chartOptions: {
      // immediate: true,
      handler(v) {
        try {
          // this.myChart.showLoading()
          this.options = {...v}
          this.myChart.setOption({...v})
        }catch (e) {
          console.log('chartOptions',this.myChart, v, e.message)
        }finally {
          // this.myChart.hideLoading()
        }
      },
    },
  },
  methods: {
    initChart() {
      try {
        let elm = document.getElementById(this.idChart)
        this.myChart = echarts.init(elm)
        // this.myChart.showLoading()
        this.myChart.setOption(this.chartOptions)
        // this.myChart.hideLoading()
        console.log(this.myChart)
      } catch (e) {
        console.error("ECHARTS", e.message)
        // this.myChart.hideLoading()
      }finally {

      }
    }
  },
  destroyed () {
    this.myChart = null
    this.options = {}
  }
}
