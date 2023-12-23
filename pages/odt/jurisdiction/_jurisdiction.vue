<template>
  <div>
    <nuxt-child />
  </div>
</template>

<script>
export default {
  mounted() {
    this.fetchJurisdiction()
  },
  methods: {
    fetchJurisdiction() {
      let {
        params: { jurisdiction },
      } = this.$route
      this.$store.dispatch(
        'odtJurisdiction/getJurisdictionDetail',
        jurisdiction
      )
    },
  },
  destroyed() {
    this.$store.commit('odtJurisdiction/getJurisdictionDetail', null)
  },
}
</script>

<style scoped></style>
