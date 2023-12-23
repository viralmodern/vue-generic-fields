<template>
  <v-main>
    <caf-notifications></caf-notifications>
  </v-main>
</template>

<script>
import notifications from '../../../../components/matters/caf/categories/notifications'

export default {
  components: {
    'caf-notifications': notifications,
  },
}
</script>

<style scoped></style>
