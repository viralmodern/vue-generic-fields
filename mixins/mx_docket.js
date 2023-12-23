export default {
  computed: {
    $$detailMatter() {
      try {
        return this.$store.getters['matters/matterDetail']
      } catch (e) {
        return {}
      }
    },
    $$docketID() {
      try {
        return this.$$detailMatter.docket_number && this.$$detailMatter.courtID
      } catch (e) {
        console.log('$$docketID', e.message)
        return null
      }
    },
    $$loadingDocket() {
      try {
        return this.$store.getters['matters/pending']
      } catch (e) {
        return false
      }
    },
  },
  methods: {},
}
