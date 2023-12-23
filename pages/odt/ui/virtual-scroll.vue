<template>
  <v-container>
    <VirtualInfinite />
  </v-container>
</template>

<script>
import VirtualInfinite from '~/features/ui/VirtualInfinite'
export default {
  name: 'virtual-scroll',
  components: { VirtualInfinite },
}
</script>

<style scoped></style>
