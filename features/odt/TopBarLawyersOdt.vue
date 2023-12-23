<template>
  <TheTopBarOdt app>
    <v-btn replace v-bind="linkOption" :to="lawyersOption.path">
      <v-icon left>
        {{ lawyersOption.icon }}
      </v-icon>
      {{ lawyersOption.label }}
    </v-btn>
  </TheTopBarOdt>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
import TheTopBarOdt from '~/features/odt/TheTopBarOdt'
let { Lawyers } = ROUTES.LitigationResearch
export default {
  name: 'TopBarLawyersOdt',
  components: { TheTopBarOdt },
  computed: {
    linkOption() {
      return {
        small: true,
        rounded: false,
        depressed: true,
        class: 'caption text-capitalize',
      }
    },
    lawyersOption() {
      return Lawyers
    },
  },
}
</script>

<style scoped></style>
