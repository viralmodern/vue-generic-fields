<template>
  <nuxt-child />
</template>
<script>
export default {
  middleware({ store, redirect, route }) {
    if (route.name.localeCompare('odt-opinions-opinion-ner') === 0) {
      redirect(`${route.path}/name-entity-recognition`)
    }
  },
}
</script>

<style scoped></style>
