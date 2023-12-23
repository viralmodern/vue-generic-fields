<template>
  <div>
    <v-text-field
      label="Phone"
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
  name: 'AttributesPhoneCell',
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
