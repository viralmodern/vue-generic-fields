<template>
  <AllCharactersRelated :owner-id="ownerPk" height="85vh" />
</template>

<script>
import AllCharactersRelated from '@/sat-vue-toolkit/satlegal/views/ui/AllCharactersRelated.vue'
export default {
  props: {
    ownerPk: {},
  },
  components: { AllCharactersRelated },
}
</script>

<style scoped></style>
