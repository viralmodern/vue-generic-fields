<template>
  <v-menu
    v-model="showMenu"
    :position-x="x"
    :position-y="y"
    absolute
    style="z-index: 999;"
    :close-on-content-click="true"
    offset-x
    max-width="290"
  >
    <v-date-picker
      no-title
      scrollable
      v-model="date"
      @change="change"
    ></v-date-picker>
  </v-menu>
</template>

<script>
import moment from 'moment'

export default {
  name: 'MenuDatePicker',
  data: () => ({
    showMenu: false,
    x: 0,
    y: 0,
    temp: {},
    date: moment(new Date()).format('YYYY-MM-DD'),
    k: null
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
    change(date) {
      try {
        const { k } = this
        this.$eventHub.$emit('date-change-picker', { date, k })

        this.$store.dispatch('utils/changeDatePicker', { date })
      } catch (e) {
        console.log('datepick')
        // this.$emit("update", date)
      }
    }
  },
  mounted() {
    let _self = this
    this.$eventHub.$on('menu-date-picker', ({ e, date, k }) => {
      if (date) {
        _self.date = date
      }
      if (k) {
        _self.k = k
      }
      _self.show(e)
    })
  },
  watch: {
    showMenu(n) {
      if (n === false) {
        this.date = moment(new Date()).format('YYYY-MM-DD')
        this.k = null
      }
    }
  }
}
</script>

<style scoped></style>
