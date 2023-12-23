<template>
  <div class="d-flex">
    <v-date-picker no-title scrollable
                   v-model="date"></v-date-picker>
    <v-time-picker @click:minute="clickItem"
                   scrollable
                   landscape
                   v-model="time"></v-time-picker>
  </div>
</template>
<script>
  import baseSourceProps from "../../configs/props/baseSourceProps"

  export default {
    name: "DateTimeSource",
    props: {
      ...baseSourceProps
    },
    data () {
      return {
        date: "",
        time: ""
      }
    },

    watch: {
      value: {
        deep: true,
        immediate: true,
        handler (val) {
          console.error("DATE_TIME", val)
        }
      }
    },
    methods: {
      clickItem (v) {
        try {
          // return console.log(this.date, this.time)
          let val = `${this.date} ${this.time}`
          this.$$execute({ val })
          this.uiShowMenu = false
        } catch (e) {
        }
      }
    }
  }
</script>
<style scoped></style>


