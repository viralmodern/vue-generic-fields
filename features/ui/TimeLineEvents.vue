<template>
  <div>
    <div id="ght" class="box_chart"></div>
  </div>
</template>

<script>
import * as d3 from 'd3'
import { createTimeline } from '~/features/ui/timeline/timeline'
console.log('LL', d3)
export default {
  name: 'TimeLineEvents',
  mounted() {
    createTimeline('#ght')
  },
  methods: {},
}
</script>

<style scoped lang="scss">
.box_chart {
  border: solid 1px red;
  width: 800px;
  height: 600px;
  margin: 0 auto;
}
</style>
