<template>
  <v-btn v-bind="vBind || {}"
         @click.native="change"
         :id="id">
    <v-icon left>mdi-chart-bar</v-icon>
    histogram
  </v-btn>
</template>

<script>
  export default {
    name: "LinkHistogram",
    props: {
      id: {
        type: String,
        required: true,
        default: () => 'link-histogram-odt'
      },
      vBind: {
        type: Object,
        default: () => ({
          small: true,
          rounded: true,
          depressed: true,
          color: "teal",
          dark: true,
          class: 'caption text-capitalize',
        })
      }
    },
    mounted () {
      let {id} = this
      // todo received event data
      this.$events.on(id, this.receivedData)
    },
    methods: {
      receivedData(evt, data) {
        // todo emit data to parent
        this.$emit('received', data)
      },
      change(e) {
        // todo trigger event $$histogramFilter
        let {id} = this
        this.$trigger('$$histogramFilter', {activatorId: `#${id}`})
      }
    }
  }
</script>

<style scoped>

</style>
