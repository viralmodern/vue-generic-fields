<template>
  <div>
    <slot name="breadcrumbs-authorities"></slot>
    <GridCitedOpinion :end-point="endPoint" height="75.5vh" />
  </div>
</template>

<script>
import GridCitedOpinion from '~/features/odt/GridCitedOpinion'
export default {
  components: { GridCitedOpinion },
  head() {
    return {
      title: 'Opinion Cited',
    }
  },
  computed: {
    endPoint() {
      let {
        params: { opinion },
      } = this.$route
      return `/api/opinions/${opinion}/opinions-citing/`
    },
  },
}
</script>

<style scoped></style>
