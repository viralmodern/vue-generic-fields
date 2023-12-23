<template>
  <v-menu :activator="activatorId"
          offset-x
          top
          open-on-hover close-on-click
          v-model="uiShowMenu"
          :close-on-content-click="false">
    <v-card>
      <v-card-text>
        <TooltipsTrendLineSummary/>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
  import TooltipsTrendLineSummary from "@/sat-vue-toolkit/components/Tooltips/TooltipsTrendLineSummary"
  export default {
    name: "TooltipTrendLine",
    components: { TooltipsTrendLineSummary },
    data() {
      return {
        activatorId: "",
        uiShowMenu: false,
      }
    },
    mounted () {
      this.$events.on('heatMapTrendLine', this.handleTooltip)
    },
    methods: {
      handleTooltip(evt, data) {
        let {activatorId, options= {}} = data
        this.activatorId = `#${activatorId}`
        this.uiShowMenu = false
        this.$nextTick(() => {
          this.uiShowMenu = true
        })
      }
    }
  }
</script>

<style scoped>

</style>
