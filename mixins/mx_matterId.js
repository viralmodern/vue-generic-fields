export default {
  computed: {
    $$matterId() {
      try {
        const { params } = this.$route
        return params.projectId || params.matter
      } catch (e) {
        console.log(e.message)
        return null
      }
    }
  }
}
