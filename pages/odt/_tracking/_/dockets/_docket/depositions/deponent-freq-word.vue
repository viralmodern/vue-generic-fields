<template>
  <v-container fluid>
    <div>
      <slot name="header"></slot>
      <div>
        <GridDepositionsDeponentFreqWord height="72.5vh" />
      </div>
    </div>
  </v-container>
</template>

<script>
import GridDepositionsDeponentFreqWord from '~/features/odt/GridDepositionsDeponentFreqWord'
export default {
  components: { GridDepositionsDeponentFreqWord },
}
</script>

<style scoped></style>
