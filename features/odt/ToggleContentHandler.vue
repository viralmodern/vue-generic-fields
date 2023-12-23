<template>
  <v-icon
    small
    @click="$emit('input', !value)"
    :class="{ 'collapsed-handler': value }"
    >mdi-chevron-double-left</v-icon
  >
</template>

<script>
export default {
  name: 'ToggleContentHandler',
  props: {
    value: {
      type: Boolean,
      default: () => false,
    },
  },
}
</script>

<style lang="scss">
.collapsed-handler {
  transform: scale(-1);
}
</style>
