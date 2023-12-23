<template>
  <v-container fluid class="pa-0">
    <AllFacts :owner-id="ownerPk" height="85vh" />
  </v-container>
</template>

<script>
import AllFacts from '@/sat-vue-toolkit/satlegal/views/ui/AllFacts.vue'
export default {
  components: { AllFacts },
  props: {
    ownerPk: {},
  },
}
</script>

<style scoped></style>
