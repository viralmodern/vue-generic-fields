<template>
  <div style="width: 150px;">
    <v-slider inverse-label hide-details v-model="slider">
      <template v-slot:append>
        <span class="text-caption">
          {{ slider }}
        </span>
      </template>
    </v-slider>
  </div>
</template>

<script>
export default {
  name: 'AttributesProgressCell',
  props: {
    value: {},
  },
  data() {
    return {
      slider: 0,
    }
  },
  watch: {
    slider: {
      handler(v) {
        this.$emit('input', v)
      },
      immediate: true,
    },
  },
}
</script>

<style scoped></style>
