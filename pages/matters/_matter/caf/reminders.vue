<template>
  <v-main>
    <caf-reminders></caf-reminders>
  </v-main>
</template>

<script>
import Reminders from '../../../../components/matters/caf/categories/reminders'

export default {
  components: {
    'caf-reminders': Reminders,
  },
}
</script>

<style scoped></style>
