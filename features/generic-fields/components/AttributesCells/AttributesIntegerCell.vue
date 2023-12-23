<template>
  <div>
    <v-text-field
      label="Number"
      v-model="text"
      type="number"
      dense
      outlined
      hide-details
    />
  </div>
</template>

<script>
export default {
  name: 'AttributesIntegerCell',
  data() {
    return {
      text: ''
    }
  },
  props: {
    value: {}
  },
  watch: {
    text: {
      handler(v) {
        this.$emit('input', v)
      },
      immediate: true
    }
  }
}
</script>

<style scoped></style>
