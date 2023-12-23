<template>
  <div>
    <nuxt-child :key="`odt-mode-${$route.params.tracking}`" />
  </div>
</template>

<script>
export default {
  validate({ params }) {
    // Must be a number
    let isTracker = params.tracking.localeCompare('t') === 0
    let isDefaultTracker = params.tracking.localeCompare('d') === 0
    let isLitigation = params.tracking.localeCompare('l') === 0

    return isTracker || isDefaultTracker || isLitigation
  },
}
</script>

<style scoped></style>
