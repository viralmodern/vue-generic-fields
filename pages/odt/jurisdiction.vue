<template>
  <div>
    <TopBarJurisdiction />
    <nuxt-child />
  </div>
</template>

<script>
import TheTopBarOdt from '~/features/odt/TheTopBarOdt'
import TopBarJurisdiction from '~/features/odt/TopBarJurisdiction'
export default {
  components: { TopBarJurisdiction, TheTopBarOdt },
}
</script>

<style scoped></style>
