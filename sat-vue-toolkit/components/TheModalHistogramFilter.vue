<template>
  <MenuOptionsAbsolute  offset-y v-model="activatorId">
    <v-card width="520px"
            class="overflow-x-auto">
      <v-card-text v-if="activatorId">
        <HistogramFilter @change="change"/>
      </v-card-text>
    </v-card>
  </MenuOptionsAbsolute>
</template>

<script>
  import MenuOptionsAbsolute from "@/sat-vue-toolkit/components/MenuOptionsAbsolute.vue"
  import HistogramFilter from "@/sat-vue-toolkit/components/HistogramFilter.vue"

  export default {
    name: "TheModalHistogramFilter",
    components: { HistogramFilter, MenuOptionsAbsolute },
    data () {
      return {
        activatorId: null
      }
    },
    events: {
      $$histogramFilter(evt, {activatorId}) {
        this.openMenu(activatorId)
      }
    },
    methods: {
      openMenu(e) {
        this.activatorId = e
      },
      change(v) {
        let {activatorId} = this
        if(!Boolean(activatorId)) return
        let evt = activatorId.startsWith('#') && activatorId.replace('#','') || activatorId
        this.$trigger(evt, v)
      }
    }
  }
</script>

<style scoped>

</style>
