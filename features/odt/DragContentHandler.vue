<template>
  <v-icon small class="drag-handler-icon" @click="$emit('input', !value)"
    >mdi-drag</v-icon
  >
</template>

<script>
export default {
  name: 'DragContentHandler',
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>

<style lang="scss" scoped>
.drag-handler-icon {
  cursor: move;
}
</style>
