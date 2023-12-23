<template>
  <div>
    <TopBarLawFirmsOdt />
    <HomeLawFirmsOdt />
  </div>
</template>

<script>
export default {
  components: {
    HomeLawFirmsOdt: () =>
      import(
        /* webpackChunkName: "HomeLawFirmsOdt" */ '~/features/odt/HomeLawFirmsOdt'
      ),
    TopBarLawFirmsOdt: () =>
      import(
        /* webpackChunkName: "HomeLawFirmsOdt" */ '~/features/odt/TopBarLawFirmsOdt'
      ),
  },
}
</script>

<style scoped></style>
