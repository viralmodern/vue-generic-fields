<template>
  <div>
    <TheTopBarOdt>
      <v-btn v-bind="linkOption">
        <v-icon left>
          {{ judgesOption.icon }}
        </v-icon>
        {{ judgesOption.label }}
      </v-btn>
    </TheTopBarOdt>
    <nuxt-child />
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import TheTopBarOdt from '~/features/odt/TheTopBarOdt'

export default {
  components: { TheTopBarOdt, TopBarOfTableOdt },
  computed: {
    linkOption() {
      let rootJudges = ROUTES.LitigationResearch.Judges.path
      return {
        small: true,
        rounded: false,
        depressed: true,
        class: 'caption text-capitalize',
        to: `${rootJudges}`,
      }
    },

    judgesOption() {
      return ROUTES.Jurisdiction.Judges
    },
  },
}
</script>

<style scoped></style>
