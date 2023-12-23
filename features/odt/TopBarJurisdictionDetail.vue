<template>
  <TheTopBarOdt :app="false"> </TheTopBarOdt>
</template>

<script>
import TheTopBarOdt from '~/features/odt/TheTopBarOdt'
export default {
  name: 'TopBarJurisdictionDetail',
  components: { TheTopBarOdt },
}
</script>

<style scoped></style>
