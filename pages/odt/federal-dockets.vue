<template>
  <div>
    <TopBarFederalJurisdiction />
    <nuxt-child />
  </div>
</template>

<script>
import TheTopBarOdt from '~/features/odt/TheTopBarOdt'
import TopBarFederalJurisdiction from '~/features/odt/TopBarFederalJurisdiction'
export default {
  components: { TopBarFederalJurisdiction, TheTopBarOdt },
}
</script>

<style scoped></style>
