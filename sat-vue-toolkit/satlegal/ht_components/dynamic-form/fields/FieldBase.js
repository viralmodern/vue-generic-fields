export default {
  props: {
    config: {
      type: Object,
      default: () => ({
        type: "textfield",
        placeholder: "Type value...",
        label: "Untitled field",
        multiple: false
      })
    },
    value: {
      type: [String, Object, Array],
      default: () => ""
    }
  },
  methods: {
    updateValue(value) {
      this.$emit('change', value);
    }
  }
}