<template>
  <div>
    <slot name="breadcrumbs-authorities"></slot>
    <GridAuthoritiesOpinion :end-point="endPoint" height="75.5vh" />
  </div>
</template>

<script>
import GridAuthoritiesOpinion from '~/features/odt/GridAuthoritiesOpinion'
export default {
  components: { GridAuthoritiesOpinion },
  head() {
    return {
      title: 'Opinion Authorities',
    }
  },
  computed: {
    endPoint() {
      let {
        params: { opinion },
      } = this.$route
      return `/api/opinions/${opinion}/opinions-cited/`
    },
  },
}
</script>

<style scoped></style>
