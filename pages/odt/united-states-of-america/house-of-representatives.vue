<template>
  <div>
    <TopBarUSAHouseOfRepresentativesOdt />
    <nuxt-child />
  </div>
</template>

<script>
import TopBarUSAHouseOfRepresentativesOdt from '~/features/odt/TopBarUSAHouseOfRepresentativesOdt'

export default {
  components: { TopBarUSAHouseOfRepresentativesOdt },
}
</script>

<style scoped></style>
