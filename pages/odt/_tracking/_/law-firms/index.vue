<template>
  <div>
    <!--<p class="hidden-lg-and-down">
      Home <strong>{{ $route.name }}</strong>
    </p>-->
    <HomeLawFirmsOdt height="72.5vh" />
  </div>
</template>

<script>
export default {
  components: {
    HomeLawFirmsOdt: () =>
      import(
        /* webpackChunkName: "HomeLawFirmsOdt" */ '~/features/odt/HomeLawFirmsOdt'
      ),
  },
}
</script>

<style scoped></style>
