<template>
  <v-card max-width="300px">
    <v-date-picker no-title scrollable
                   v-model="val"
                   @change="clickItem"
    ></v-date-picker>
  </v-card>
</template>
<script>
  import baseSourceProps from "../../configs/props/baseSourceProps"

  export default {
    name: "DateSource",
    props: {
      ...baseSourceProps
    },
    data () {
      return {
        val: ""
      }
    },

    watch: {
      value: {
        deep: true,
        immediate: true,
        handler (val) {
          console.error("DATE", val)
          this.val = val
        }
      }
    },
    methods: {
      clickItem (val) {
        try {
          this.$$execute({ val })
        } catch (e) {
        }
      }
    }
  }
</script>
<style scoped></style>


