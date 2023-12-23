export default {
  props: {
    entity: {
      type: Object,
    },
    $$endpoint: {
      type: [String],
    },
    filter: {
      type: Object,
    },
  },
  data() {
    return {
      detail: {},
      comments: [],
      loading: false,
      error: null,
      documentSelected: null,
    }
  },
  mounted() {
    this.$eventHub
      .$on('form-added-document', this.addNewDoc)
      .$on('form-updated-document', this.updateDoc)
      .$on('form-selected-document', this.selectedDoc)
  },
  methods: {
    addNewDoc({ row }) {
      let detail = { ...this.detail }
      detail.documents = [row, ...detail.documents]
      this.detail = { ...detail }
    },
    updateDoc(row) {
      let detail = { ...this.detail }
      detail.documents = detail.documents.map((doc) => {
        let temp = { ...doc }
        if (temp['pk'] == row['pk']) {
          temp = { ...row }
        }
        return temp
      })
      this.detail = { ...detail }
    },
    selectedDoc(row) {
      try {
        let document = row['pk']
        this.documentSelected = document
      } catch (e) {}
    },
    async loadDetail() {
      try {
        this.loading = true
        let detail = await this.$axios.$get(this.$$endpoint, {
          params: this.filter,
        })
        this.detail = detail
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    load() {
      try {
        this.loadDetail()
      } catch (e) {
        console.error('$$endpointLoad', e.message)
      }
    },
  },
  computed: {
    matterDetail() {
      try {
        return this.$store.getters['matters/matterDetail']
      } catch (e) {
        return {}
      }
    },
  },
  watch: {
    entity: {
      handler(val, oldVal) {
        // this.find()
      },
      deep: true,
      immediate: true,
    },
    $$endpoint: {
      async handler(val, oldVal) {
        try {
          this.load()
        } catch (e) {}
      },
      immediate: true,
    },
  },
  render() {
    return this.$scopedSlots.default({
      detail: this.detail,
      error: this.error,
      loading: this.loading,
      matter: this.matterDetail,
      documentSelected: this.documentSelected,
    })
  },
}
