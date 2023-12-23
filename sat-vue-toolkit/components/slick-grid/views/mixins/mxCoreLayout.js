import { $$keyRow, $$results, $$totalTask, $$totalTaskServer } from "~/sat-vue-toolkit/functions"
import { $$getEntriesSelected } from "~/sat-vue-toolkit/components/slick-grid/helpers/helpers"
const isDefault = (attribute) => {
  return !attribute.pinned && !attribute.hide
}
const isPinned = (attribute) => {
  return attribute.pinned && !attribute.hide
}
export const layoutMixin = {
  computed: {
    fieldsReduce () {
      let { fieldsConfig } = this
      return {
        pinned: fieldsConfig.filter(isPinned) || [],
        default: fieldsConfig.filter(isDefault) || []
      }
    }
  },
  methods: {
    $$results,
    getExpandGroup (index) {
      return !this.collapse.includes(index)
    },
    onCollapse (index) {
      this.$emit('onCollapse', index)
    },
    sortField ({ item, isSort }) {
      this.$emit('sortField', { item, isSort })
    },
    showContext (data) {
      this.$emit('showContext', data)
    },
    setRuleFilterField (data) {
      this.$emit('setRuleFilterField', data)
    },

    // todo: order row
    async orderRow (evt, list, groupByItem) {
      this.$emit('orderRow', evt, list, groupByItem)
    },
    clickRow (row, group) {
      this.$emit('clickRow', row, group)
    },
    selectedRow (row, group) {
      this.$emit('selectedRow', row, group)
    },
    showAddRowModal (group) {
      this.$emit('showAddRowModal', group)
    },
    async paginate ({ queryParams }) {
      this.$emit('paginate', { queryParams })
    },
    getRowSelected(row, uniqueId = 'pk') {
      let {selectedRows} = this
      let rowId = row[uniqueId]
      return $$getEntriesSelected(selectedRows, rowId)
    },
    showTooltip($$data) {
      this.$emit('showTooltip', $$data)
    }
  },
  filters: {
    $$totalTask,
    $$totalTaskServer,
    $$results,
    $$keyRow
  }
}
