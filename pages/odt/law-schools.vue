<template>
  <div>
    <TopBarLawSchools />
    <nuxt-child />
  </div>
</template>

<script>
import TopBarLawSchools from '~/features/odt/TopBarLawSchools'
export default {
  components: { TopBarLawSchools },
}
</script>

<style scoped></style>
