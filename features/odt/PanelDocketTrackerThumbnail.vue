<template>
  <DrawerPicker :value="value" @input="input" width="55%">
    <slot> </slot>
  </DrawerPicker>
</template>

<script>
import DrawerPicker from '@/components/utils/DrawerPicker.vue'

export default {
  name: 'PanelDocketTrackerThumbnail',
  components: { DrawerPicker },
  props: {
    value: {},
  },
  methods: {
    input(show) {
      this.$emit('input', show)
    },
  },
}
</script>

<style scoped>
.iframe_cause {
  display: block;
  width: 100%;
  height: 65vh;
}
</style>
