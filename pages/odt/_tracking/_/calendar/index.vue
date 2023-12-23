<template>
  <div>
    <!--<p class="hidden-lg-and-down">
      Home <strong>{{ $route.name }}</strong>
    </p>-->
    <v-container fluid>
      <GridAllLitigationOfDocketTracker
        :height="`${77.5}vh`"
        :includes-fields="includesFields"
      />
    </v-container>
  </div>
</template>

<script>
import { fieldsLitigationCalendar } from '~/features/odt/mixins/mxLitigationCalendarOdt'

export default {
  components: {
    GridAllLitigationOfDocketTracker: () =>
      import('~/features/odt/GridAllLitigationOfDocketTracker'),
  },
  computed: {
    includesFields() {
      return [
        {
          ...fieldsLitigationCalendar.case_name,
        },
      ]
    },
  },
}
</script>

<style scoped></style>
