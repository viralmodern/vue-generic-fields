<template>
  <div>
    <TopBarLawyersOdt />
    <HomeLawyersOdt />
  </div>
</template>

<script>
export default {
  components: {
    HomeLawyersOdt: () =>
      import(
        /* webpackChunkName: "HomeLawyersOdt" */ '~/features/odt/HomeLawyersOdt'
      ),
    TopBarLawyersOdt: () =>
      import(
        /* webpackChunkName: "TopBarLawyersOdt" */ '~/features/odt/TopBarLawyersOdt'
      ),
  },
}
</script>

<style scoped></style>
