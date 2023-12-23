<template>
  <AllCharacters height="85vh" :owner-id="ownerPk" />
</template>

<script>
import AllCharacters from '@/sat-vue-toolkit/satlegal/views/ui/AllCharacters.vue'

export default {
  props: {
    ownerPk: {},
  },
  components: { AllCharacters },
}
</script>

<style scoped></style>
