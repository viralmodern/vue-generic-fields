<template>
  <div>
    <StackBarHeatMapEntityExplorer
      id-chart="StackBarHeatMapEntityExplorer-2020"
    />
  </div>
</template>

<script>
import StackBarHeatMapEntityExplorer from '~/features/odt/StackBarHeatMapEntityExplorer'
export default {
  components: { StackBarHeatMapEntityExplorer },
  mounted() {
    // alert('stack')
  },
}
</script>

<style scoped></style>
