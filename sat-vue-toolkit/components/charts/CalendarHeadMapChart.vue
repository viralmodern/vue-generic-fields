<template>
  <div>
    <v-card :id="idChart"
            tile
            color="transparent"
            flat
            :width="width"
            :height="height"></v-card>
  </div>
</template>

<script>
  import eChart from "./mixins/mxEchart"
  export default {
    name: "CalendarHeadMapChart",
    mixins: [eChart],
  }
</script>

<style scoped>

</style>
