import { reduceAttributes } from "~/sat-vue-toolkit/components/slick-grid/helpers/attributes"

export const BaseTwoLegal = {
  props: {
    attributes: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  computed: {

  },
  watch: {
    attributes: {
      immediate: true,
      handler (attributes) {
        let items = reduceAttributes(attributes, [...this.fieldsConfig])
        this.fieldsConfig = items
      }
    },
    // queryParams: {

  },
  methods: {

  },
  render() {
    return this.$scopedSlots.default({
      fieldsConfig: this.fieldsConfig
    })
  }
}
