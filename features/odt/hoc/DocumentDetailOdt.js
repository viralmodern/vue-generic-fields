import mx_notification from '@/sat-vue-toolkit/mixins/mxNotification'

export default {
  props: {
    endpoint: {
      type: String,
    },
  },
  mixins: [mx_notification],
  data() {
    return {}
  },
  async mounted() {
    let { name } = this.$route
    await this.$store.dispatch('uiDocumentDetailOdt/initInterface', {
      rootPath: this.rootPath,
      routeName: name,
    })
  },
  events: {
    orderViews(evt, data) {
      let { field, fields } = data
      this.$store.commit('uiDocumentDetailOdt/orderViews', fields)
      if (field.hide === false) {
        this.changeView(field.path)
      }
    },
    orderPanels(evt, data) {
      let { fields } = data
      this.$store.commit('uiDocumentDetailOdt/orderPanels', fields)
    },
  },
  computed: {
    rootPath() {
      const {
        params: { docket, entry, document },
      } = this.$route
      return `${this.$$rootPathDocketOdt}/${docket}/${entry}/document/${document}`
    },
    views() {
      return this.$store.getters['uiDocumentDetailOdt/views']
    },
    panels() {
      return this.$store.getters['uiDocumentDetailOdt/panels']
    },
    titleView() {
      return this.$store.getters['uiDocumentDetailOdt/titleView']
    },
  },
  methods: {
    async load(v) {},
    changeView(path) {
      let {
        rootPath,
        $route: { query },
      } = this
      this.$router.replace({ path: `${rootPath}/${path}`, query: { ...query } })
    },
  },
  render() {
    return this.$scopedSlots.default({
      views: this.views,
      panels: this.panels,
      titleView: this.titleView,
    })
  },
  destroy() {},
}
