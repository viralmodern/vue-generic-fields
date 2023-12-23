<template>
  <div>
    <TheTopBarOdt>
      <v-btn v-bind="linkOption"> Timeline history </v-btn>
    </TheTopBarOdt>
    <v-container fluid>
      <v-card flat>
        <v-card-text>
          <TimeLineHistoryWorld />
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import TimeLineHistoryWorld from '~/features/ui/visual/TimeLineHistoryWorld'
import TheTopBarOdt from '~/features/odt/TheTopBarOdt'
export default {
  components: { TheTopBarOdt, TimeLineHistoryWorld },
  computed: {
    linkOption() {
      return {
        small: true,
        depressed: true,
        rounded: true,
        class: 'caption text-capitalize',
        activeClass: 'primary--text',
      }
    },
    showByMonth() {
      let { value } = this
      return value === 'm'
    },
  },
}
</script>

<style scoped></style>
