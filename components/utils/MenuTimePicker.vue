<template>
  <v-menu
    v-model="showMenu"
    :position-x="x"
    :position-y="y"
    absolute
    style="z-index: 999;"
    :close-on-content-click="false"
    offset-x
    width="250"
  >
    <v-time-picker
      v-model="time"
      :min="min"
      :max="max"
      @click:minute="change(time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MenuTimePicker',
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
    temp: {},
    time: null,
    k: null,
    min: null,
    max: null
  }),
  methods: {
    show(e) {
      e.preventDefault()
      this.showMenu = false
      this.x = e.clientX
      this.y = e.clientY
      this.$nextTick(() => {
        this.showMenu = true
      })
    },
    change(time) {
      try {
        // this.$store.dispatch('utils/changeTimePicker', { time })
        const { time, k } = this
        this.$eventHub.$emit('time-change-picker', { time, k })
      } catch (e) {
        // this.$emit("update", date)
      }
    }
  },
  mounted() {
    let _self = this
    this.$eventHub.$on('menu-time-picker', ({ e, time, k, min, max }) => {
      if (time) {
        _self.time = time
      }
      if (k) {
        _self.k = k
      }
      if (min) {
        _self.min = min
      }
      if (max) {
        _self.max = max
      }

      _self.show(e)
    })
  },
  watch: {
    showMenu(n) {
      if (n === false) {
        this.time = null
        this.k = null
        this.min = null
        this.max = null
      }
    }
  }
}
</script>

<style scoped></style>
