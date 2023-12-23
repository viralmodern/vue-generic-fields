<template>
  <div>
    <TopBarDocketsODT />
    <TopBarSubsTabsTrackerDetail />
    <nuxt-child />
  </div>
</template>

<script>
import TopBarDocketsODT from '~/features/odt/TopBarDocketsODT'
import TopBarSubsTabsTrackerDetail from '~/features/odt/TopBarSubsTabsTrackerDetail'
export default {
  components: { TopBarSubsTabsTrackerDetail, TopBarDocketsODT },
  mounted() {
    console.error('TRACKING', this.$route)
  },
}
</script>

<style scoped></style>
