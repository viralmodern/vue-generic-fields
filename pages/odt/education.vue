<template>
  <div>
    <!--    {{$route.name}}-->
    <TheTopBarOdt>
      <v-btn replace v-bind="linkOption" :to="opts.path">
        <v-icon left>
          {{ opts.icon }}
        </v-icon>
        {{ opts.label }}
      </v-btn>
    </TheTopBarOdt>
    <TopBarEducationOdt />
    <nuxt-child />
  </div>
</template>

<script>
import TopBarEducationOdt from '~/features/odt/TopBarEducationOdt'
import TheTopBarOdt from '~/features/odt/TheTopBarOdt'
import { ROUTES } from '~/features/odt/helpers/odt.json'

export default {
  components: { TheTopBarOdt, TopBarEducationOdt },
  computed: {
    linkOption() {
      return {
        small: true,
        rounded: false,
        depressed: true,
        class: 'caption text-capitalize',
      }
    },
    opts() {
      return ROUTES.LitigationResearch.Education
    },
  },
}
</script>

<style scoped></style>
