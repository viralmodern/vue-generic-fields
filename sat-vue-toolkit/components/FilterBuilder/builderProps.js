export default {
  isBetweenOperation: {
    type: Boolean,
    default: () => false
  },
  sources: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: String,
    default: () => 'value'
  },
  itemText: {
    type: String,
    default: () => 'label'
  },
  value: {}
}
