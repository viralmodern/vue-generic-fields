<template>
  <div>
    <FormRowAddTracker />
    <GridTimeTracking />
  </div>
</template>
<script>
import GridTimeTracking from './general/GridTimeTracking'
import FormRowAddTracker from './general/FormRowAddTracker'
export default {
  name: 'TimeTrackingGeneral',
  components: { FormRowAddTracker, GridTimeTracking }
}
</script>

<style scoped></style>
