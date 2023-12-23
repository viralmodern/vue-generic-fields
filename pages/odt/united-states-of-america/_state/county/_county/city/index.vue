<template>
  <div>
    <!--    {{ $route.name }}-->
    <TopBarUsCityOfCountyOdt />
    <GridAllCityOfCountyOdt height="70vh" />
  </div>
</template>

<script>
import GridAllCityOfCountyOdt from '~/features/odt/GridAllCityOfCountyOdt'
import TopBarUsCityOfCountyOdt from '~/features/odt/TopBarUsCityOfCountyOdt'
export default {
  components: { TopBarUsCityOfCountyOdt, GridAllCityOfCountyOdt },
}
</script>

<style scoped></style>
