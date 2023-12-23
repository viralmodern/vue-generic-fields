<template>
  <v-card min-width="200px">
    <v-col cols="12">
      <v-slider :label="`${val} %`"
                inverse-label
                hide-details
                v-model="val"
                @end="clickItem"
                :thumb-size="24"></v-slider>
    </v-col>
  </v-card>
</template>
<script>
  import baseSourceProps from "../../configs/props/baseSourceProps"
  export default {
    name: "ProgressSource",
    props: {
      ...baseSourceProps
    },
    data () {
      return {
        val: 0,
      }
    },
    watch: {
      value: {
        deep: true,
        immediate: true,
        handler (v) {
          this.val = v
        }
      }
    },
    methods: {
      clickItem () {
        try {
          this.$$execute({ val: this.val })
          this.uiShowMenu = false
        } catch (e) {
          console.log("choose-cell-progress", e.message)
        }
        return false
      }
    },
    filters: {}
  }
</script>
<style scoped></style>


