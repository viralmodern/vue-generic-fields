<template>
  <div class="pa-3">
    <div>
      <btn-link
        :btn-options="{ to: `${rootPath}/calendar` }"
        icon="mdi-view-agenda"
        label="Calendar view"
      />
      <btn-link
        :btn-options="{ to: `${rootPath}/stack` }"
        icon="mdi-chart-histogram"
        label="Stack view"
      />
    </div>
    <div class="pt-3">
      <nuxt-child keep-alive></nuxt-child>
    </div>
  </div>
</template>

<script>
import BtnLink from '~/sat-vue-toolkit/components/BtnLink'
export default {
  components: { BtnLink },
  mounted() {
    console.log(this.$router)
  },
  computed: {
    rootPath() {
      let {
        params: { docket, document, pathMatch, tracking },
      } = this.$route
      return `/odt/${tracking}/${pathMatch}/dockets/${docket}/entities/entity-explorer/${document}/heatmap-mentioned`
    },
  },
}
</script>

<style scoped></style>
