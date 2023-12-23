<template>
  <div>
    <TopBarUsPresident />
    <nuxt-child />
  </div>
</template>

<script>
import TopBarUsPresident from '~/features/odt/TopBarUsPresident'
export default {
  components: { TopBarUsPresident },
}
</script>

<style scoped></style>
