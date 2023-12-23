<template>
  <div>
    <!--<p>
      {{ $route.name }}
    </p>-->
    <HomeCompanyPeopleOdt height="66vh" />
  </div>
</template>

<script>
import HomeCompanyPeopleOdt from '~/features/odt/HomeCompanyPeopleOdt'
export default {
  components: { HomeCompanyPeopleOdt },
}
</script>

<style scoped></style>
