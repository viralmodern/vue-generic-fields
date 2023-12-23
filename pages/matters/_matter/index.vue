<template>
  <v-main>
    <v-container>
      <v-card flat> </v-card>
    </v-container>
  </v-main>
</template>
<script>
import { ALL_CAF } from '~/mock/fields'
import { SLICK_GRID } from '@/sat-vue-toolkit/components/slick-grid/configs/attribute'

export default {
  data() {
    return {
      color: SLICK_GRID.COLOR,
    }
  },
  computed: {
    matterId() {
      return this.$route.params.matter
    },
    allCafActive() {
      return ALL_CAF.filter((caf) => caf.activate)
    },
  },
}
</script>

<style scoped></style>
