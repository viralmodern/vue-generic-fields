<template>
  <div>
    <TopBarUsCityDetailOfCountyOdt />
    <nuxt-child />
  </div>
</template>

<script>
import TopBarUsCityDetailOfCountyOdt from '~/features/odt/TopBarUsCityDetailOfCountyOdt'
export default {
  components: { TopBarUsCityDetailOfCountyOdt },
}
</script>

<style scoped></style>
