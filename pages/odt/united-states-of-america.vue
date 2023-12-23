<template>
  <div>
    <TopBarOfUnitedStatesOfAmericaOdt />
    <TopBarUSAOdt />
    <!--<p>
      {{$route.name}}
    </p>-->
    <nuxt-child />
  </div>
</template>

<script>
import TopBarOfUnitedStatesOfAmericaOdt from '~/features/odt/TopBarOfUnitedStatesOfAmericaOdt'
import TopBarUSAOdt from '~/features/odt/TopBarUSAOdt'
export default {
  components: { TopBarUSAOdt, TopBarOfUnitedStatesOfAmericaOdt },
}
</script>

<style scoped></style>
