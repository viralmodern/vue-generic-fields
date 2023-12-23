<template>
  <div>
    <HistogramSlider style="margin: 0 auto"
                     :width="450"
                     :bar-height="100"
                     :data="dd"
                     :prettify="prettify"
                     :drag-interval="true"
                     :force-edges="false"
                     :colors="['#4facfe', '#00f2fe']"
                     :min="new Date(2004, 11, 24).valueOf()"
                     :max="new Date(2017, 11, 24).valueOf()" @change="onChange"/>
  </div>
</template>

<script>
  import  HistogramSlider from 'vue-histogram-slider'
  import 'vue-histogram-slider/dist/histogram-slider.css';

  const items = [
    "2004-11-23T22:00:00.000Z",
    "2005-02-28T22:00:00.000Z",
    "2005-03-09T22:00:00.000Z",
    "2005-03-21T22:00:00.000Z",
    "2005-05-06T21:00:00.000Z",
    "2005-06-01T21:00:00.000Z",
  ]
  export default {
    name: "HistogramFilter",
    components: {
      HistogramSlider
    },
    props: {
      items: {
        type: Array,
        default: () => items
      }
    },
    data() {
      return {
        v: '',
        prettify: function (ts) {
          return new Date(ts).toLocaleDateString("en", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        },
      };
    },
    computed: {
      dd() {
        let {items} = this
        return items.map((d) => new Date(d))
      }
    },
    methods: {
      onChange(data) {
        let v = {
          from_pretty: data.from_pretty,
          to_pretty: data.to_pretty
        }
        this.$emit('change', v)
        this.v = v
      }
    }
  }
</script>

<style scoped lang="scss">
</style>
