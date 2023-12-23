<template>
  <div>
    <div class="d-flex align-center">
      <ChooseDate v-model="date" />
      <div class="mx-1"></div>
      <ChooseTime v-model="time" />
    </div>
  </div>
</template>

<script>
import ChooseDate from '../../../../components/utils/ChooseDate'
import ChooseTime from '../../../../components/utils/ChooseTime'
export default {
  name: 'AttributesDateTimeCell',
  components: { ChooseTime, ChooseDate },
  data() {
    return {
      date: '',
      time: ''
    }
  },
  props: {
    value: {}
  },
  watch: {
    date(v) {
      this.$emit('input', { date: v, time: this.time })
    },
    time(v) {
      this.$emit('input', { date: this.date, time: v })
    }
  }
}
</script>

<style scoped></style>
