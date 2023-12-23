<template>
  <!-- <v-container fluid>
    <div>
      <GridAllJudgesCaseLoadOfFederalDocketsOdt />
    </div>
  </v-container>-->
</template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
let { FederalJudge } = ROUTES.FederalJurisdiction

export default {
  functional: true,
  middleware({ store, redirect, from, route }) {
    const { path } = route
    redirect(`${path}/${FederalJudge.path}`)
  },
}
</script>

<style scoped></style>
