<template>
  <div>
    <!--<p class="hidden-lg-and-down">
      Home <strong>{{ $route.name }}</strong>
    </p>-->
    <v-container fluid>
      <HomeSubPartiesOdt height="70vh" :includes-subs="includesSubs" />
    </v-container>
  </div>
</template>
<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
let { PartyInfo } = ROUTES.DocketTrackerParties
export default {
  components: {
    HomeSubPartiesOdt: () => import('~/features/odt/HomeSubPartiesOdt'),
  },
  computed: {
    includesSubs() {
      return [PartyInfo]
    },
  },
}
</script>

<style scoped></style>
