<template>
  <v-navigation-drawer
    disable-route-watcher
    style="z-index: 7"
    v-bind="panelOptions"
    fixed
    @input="input"
  >
    <div class="fill-height d-flex flex-column">
      <v-btn
        icon
        fixed
        small
        top
        right
        @click="$emit('input', false)"
        style="z-index: 3; opacity: 0.6"
      >
        <v-icon small>mdi-close</v-icon>
      </v-btn>
      <div class="pa-4 pb-0">
        <slot name="header"></slot>
      </div>
      <div class="flex-grow-1 overflow-y-auto">
        <div class="pa-4 fill-height">
          <slot />
        </div>
      </div>
      <div class="pa-4">
        <slot name="footer" />
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'DrawerPicker',
  props: {
    title: {
      type: String,
      default: () => 'Title',
    },
    width: {
      default: () => '45%',
    },
    app: {
      type: Boolean,
      default: () => false,
    },
    temporary: {
      type: Boolean,
      default: () => false,
    },
    right: {
      type: Boolean,
      default: () => true,
    },
    value: {},
  },
  computed: {
    panelOptions() {
      let { width, value, app, right } = this
      return {
        width,
        value,
        app,
        right,
      }
    },
  },
  methods: {
    input(drawer) {
      this.$emit('input', drawer)
    },
  },
}
</script>

<style scoped></style>
