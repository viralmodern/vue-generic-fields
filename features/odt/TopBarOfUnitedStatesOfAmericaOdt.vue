<template>
  <TheTopBarOdt>
    <v-btn replace v-bind="linkOption" :to="jurisdictionOption.path">
      <v-icon left>
        {{ jurisdictionOption.icon }}
      </v-icon>
      {{ jurisdictionOption.label }}
    </v-btn>
  </TheTopBarOdt>
</template>

<script>
import TopBarOfTableOdt from '~/features/odt/TopBarOfTableOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
import TheTopBarOdt from '~/features/odt/TheTopBarOdt'
let { UnitedStatesOfAmerica } = ROUTES.LitigationResearch
export default {
  name: 'TopBarOfUnitedStatesOfAmericaOdt',
  components: { TheTopBarOdt, TopBarOfTableOdt },
  computed: {
    linkOption() {
      return {
        small: true,
        rounded: false,
        depressed: true,
        class: 'caption text-capitalize',
      }
    },
    jurisdictionOption() {
      return UnitedStatesOfAmerica
    },
  },
}
</script>

<style scoped></style>
