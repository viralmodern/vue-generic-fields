<template>
  <v-menu
    :return-value="showMenu"
    absolute
    style="z-index: 999;"
    :close-on-content-click="false"
    offset-x
    width="250"
  >
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on" :min="min" :max="max" :time="time">
        <v-chip small label v-on="on" title="Select Time">
          {{ time ? time : 'HH:MM' }}
          <v-icon small right>mdi-timer</v-icon>
        </v-chip>
      </slot>
    </template>
    <v-time-picker
      v-model="time"
      :min="min"
      :max="max"
      @click:minute="change(time)"
    ></v-time-picker>
  </v-menu>
</template>

<script>
export default {
  name: 'ChooseTime',
  data: () => ({
    x: 0,
    y: 0,
    temp: {},
    time: null,
    min: null,
    max: null
  }),
  props: {
    showMenu: {
      type: Boolean,
      default: () => false
    },
    value: {}
  },
  methods: {
    change(time) {
      try {
        // this.$store.dispatch('utils/changeTimePicker', { time })
        const { time } = this
        this.$emit('time-change', { time })
      } catch (e) {
        console.log('change', e.message)
        // this.$emit("update", date)
      }
    }
  },
  mounted() {},
  watch: {
    showMenu(n) {
      if (n === false) {
        this.time = null
        this.min = null
        this.max = null
      }
    },
    time(v) {
      this.$emit('input', v)
    }
  }
}
</script>

<style scoped></style>
