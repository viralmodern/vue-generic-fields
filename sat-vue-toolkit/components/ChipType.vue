<template>
  <v-chip
    :color="typeColor"
    small
    draggable
    :dark="dark"
    :close="close"
    @click:close="$emit('click-close')"
  >
    {{ typeName }}
  </v-chip>
</template>

<script>
export default {
  name: 'ChipType',
  props: {
    type: {
      type: Object,
      default: () => {}
    },
    dark: {
      type: Boolean,
      default: () => true
    },
    small: {
      type: Boolean,
      default: false
    },
    close: {
      type: Boolean,
      default: false
    },

    text: {
      type: String,
      default: () => 'N/A'
    },
    color: {
      type: String,
      default: () => '#000000'
    }
  },
  computed: {
    typeName() {
      try {
        return this.text
      } catch (e) {
        console.log('typeName', this.type, e.message)
        return 'N/A'
      }
    },
    typeColor() {
      try {
        return this.color
      } catch (e) {
        console.log('color', e.message)
        return '#000000'
      }
    }
  }
}
</script>

<style scoped></style>
