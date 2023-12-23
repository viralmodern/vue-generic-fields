<template>
  <div>
    <!-- <p class="hidden-lg-and-down">
      Home <strong>{{ $route.name }}</strong>
    </p>-->
    <v-container fluid>
      <HomeEntriesOfTrackerOdt :includesFields="includesFields" />
    </v-container>
  </div>
</template>

<script>
import { fieldsEntriesOfDocketTracker } from '~/features/odt/mixins/mxAttributesDocketEntry'

export default {
  components: {
    HomeEntriesOfTrackerOdt: () =>
      import('~/features/odt/HomeEntriesOfTrackerOdt'),
  },
  computed: {
    includesFields() {
      return [
        {
          ...fieldsEntriesOfDocketTracker.motion,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
