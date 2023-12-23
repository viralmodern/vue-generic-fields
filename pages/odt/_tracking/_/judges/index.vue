<template>
  <div>
    <v-container fluid>
      <!--<p class="hidden-lg-and-down">
      Home <strong>{{ $route.name }}</strong>
    </p>-->
      <HomeJudgesOdt :height="`${72}vh`" :includes-subs="includesSubs" />
    </v-container>
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
let { AssignedToJudges, OrderStatus } = ROUTES.Jurisdiction
export default {
  components: {
    HomeJudgesOdt: () => import('~/features/odt/HomeJudgesOdt'),
  },
  computed: {
    includesSubs() {
      return [AssignedToJudges, OrderStatus]
    },
  },
}
</script>

<style scoped></style>
