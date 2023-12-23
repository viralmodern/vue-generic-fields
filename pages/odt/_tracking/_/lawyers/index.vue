<template>
  <div>
    <!-- <p class="hidden-lg-and-down">
      Home <strong>{{ $route.name }}</strong>
    </p>-->
    <HomeLawyersOdt height="72.5vh" :includes-subs="includesSubs" />
  </div>
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
let { DocketParty } = ROUTES.Lawyers
export default {
  components: {
    HomeLawyersOdt: () =>
      import(
        /* webpackChunkName: "HomeLawyersOdt" */ '~/features/odt/HomeLawyersOdt'
      ),
  },
  computed: {
    includesSubs() {
      return [DocketParty]
    },
  },
}
</script>

<style scoped></style>
