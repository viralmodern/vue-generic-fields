<template>
  <div class="panels-group-parent">
    <draggable
      :draggable="draggable"
      :handle="handle"
      :style="{ height: height }"
      group="a"
      class="panels-group"
    >
      <slot></slot>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  name: 'ThePanelsDraggable',
  props: {
    draggable: {
      type: String,
      default: () => `.draggable-item`,
    },
    handle: {
      type: String,
      default: () => `.drag-handle-draggable`,
    },
    height: {
      type: String,
      default: () => `70vh`,
    },
  },
  components: {
    draggable,
  },
}
</script>

<style lang="scss">
@import 'features/odt/styles/panels.scss';
</style>
