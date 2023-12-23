<template>
  <TheTopBarOdt app>
    <v-btn v-bind="linkOption" :to="rootPath">
      <v-icon left>{{ homeOption.icon }}</v-icon>
      {{ homeOption.label }}
    </v-btn>
  </TheTopBarOdt>
</template>

<script>
import TheTopBarOdt from '~/features/odt/TheTopBarOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'
let { USPresidents } = ROUTES.LitigationResearch
export default {
  name: 'TopBarUsPresident',
  components: { TheTopBarOdt },
  props: {
    rootPath: {
      type: String,
      default: () => `${USPresidents.path}`,
    },
    linkOption: {
      type: Object,
      default: () => ({
        small: true,
        rounded: false,
        depressed: true,
        replace: true,
        class: 'caption text-capitalize',
      }),
    },
  },
  computed: {
    homeOption() {
      return USPresidents
    },
  },
}
</script>

<style scoped></style>
