<template>
  <v-container fluid class="pa-0">
    <AllFactVersion :owner-id="ownerPk" height="85vh" />
  </v-container>
</template>

<script>
import AllFactVersion from '@/sat-vue-toolkit/satlegal/views/ui/AllFactVersion.vue'
export default {
  components: { AllFactVersion },
  props: {
    ownerPk: {},
  },
}
</script>

<style scoped></style>
