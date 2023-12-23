<template>
  <div>
    <v-text-field label="Title" v-model="text" dense outlined hide-details />
  </div>
</template>

<script>
export default {
  name: 'AttributesTextCell',
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
