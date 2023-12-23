<template>
  <v-app-bar
    :flat="true"
    dense
    :app="app"
    height="38px"
    :color="color"
    dark
    v-bind="vBind || {}"
  >
    <slot></slot>
  </v-app-bar>
</template>

<script>
export default {
  name: 'TheTopBarOdt',
  props: {
    app: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: () => `#363636`,
    },
    vBind: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style scoped></style>
