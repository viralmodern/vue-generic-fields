export const optionalFieldOptionsMixin = {
  props: {
    value: {
      default: () => ({})
    }
  },
  computed: {
    optionalField() {
      let {value = {}, types = {}} = this
      let t = {}
      for (let type in types) {
        t[type] = value[type]
      }
      return t
    }
  },
  methods: {
    setValueOptional(option = {}) {
      let {value = {}} = this
      let temp = {...value, ...option}
      this.$emit('input', {data: {...temp}, k: 'field_optional'})
      // this.val = {...temp}
    }
  }
}
