<template>
  <div>
    <slot name="header"></slot>
    <GridAllDeposition height="89.5vh" />
  </div>
</template>

<script>
import GridAllDeposition from '~/features/odt/GridAllDeposition'
export default {
  components: { GridAllDeposition },
}
</script>

<style scoped></style>
