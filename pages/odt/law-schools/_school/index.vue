<template></template>

<script>
import { ROUTES } from '~/features/odt/helpers/odt.json'
let { Judges } = ROUTES.Jurisdiction
export default {
  functional: true,
  middleware({ store, redirect, from, route }) {
    const { path } = route
    redirect(`${path}/${Judges.path}`)
  },
}
</script>

<style scoped></style>
