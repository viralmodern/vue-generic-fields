export default {
  data() {
    return {
      detail: null,
      loading: false,
    }
  },
  async mounted() {
    await this.fetchNerDetail()
  },
  computed: {
    endPoint() {
      const {
        params: { opinion },
        name,
      } = this.$route
      let nerType = 'ner'
      if (
        name.localeCompare(
          'odt-opinions-opinion-ner-coreference-resolution'
        ) === 0
      ) {
        nerType = 'coreference-resolution'
      } else if (
        name.localeCompare('odt-opinions-opinion-ner-legal-recognition') === 0
      ) {
        nerType = 'legal-ner'
      }
      return `/api/opinions/${opinion}/${nerType}/`
    },
  },
  methods: {
    async fetchNerDetail() {
      try {
        this.loading = true
        let res = await this.$api.get(this.endPoint)
        this.detail = res['data']
        this.$trigger('updateNer', res['data'])
      } catch (e) {
      } finally {
        this.loading = false
      }
    },
  },
  destroyed() {
    this.detail = null
  },
}
