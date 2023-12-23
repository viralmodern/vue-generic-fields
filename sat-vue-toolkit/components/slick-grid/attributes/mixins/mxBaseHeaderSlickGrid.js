import { STATUS } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
import { getItemValueKey, $$strNumFormat } from "@/sat-vue-toolkit/functions"
import baseHeaderProps from "@/sat-vue-toolkit/components/slick-grid/configs/props/baseHeaderProps"

export default {
  props: {
    ...baseHeaderProps
  },
  computed: {
    getAttributeList() {
      try {
        return this.attributes.filter(attribute => attribute.name === this.groupType)[0]['list']
      } catch (e) {
        return this.list
      }
    },
    getAttributeType() {
      try {
        return this.attributes.filter(attribute => attribute.name === this.groupType)[0]['type']
      } catch (e) {
        return null
      }
    },
    itemStatus() {
      let k;
      return this.getAttributeList.filter(l => {
        k = getItemValueKey(l)
        return l[k] == this.childInfo
      })[0] || {}
    },
    isManyTask() {
      return this.totalTask >= 2
    },
    labelCountTotalTask() {
      let label = `${this.isManyTask ? this.countLabelMany : this.countLabelSingular}`
      return `${$$strNumFormat(this.totalTask)} of ${$$strNumFormat(this.totalTaskServer)} ${label}`
    }

  },
  methods: {
    clickCollapse () {
      this.$emit("collapse")
    },
    isStackedColumns(attribute) {
      return attribute.stackedColumns && attribute.stackedColumns.length
    }
  },
  filters: {
    colorStatusLabel(v) {
      try {
        let status = v.pk || v.label || v.name || v.short_name || 'No group'
        return STATUS[status].COLOR
      } catch (e) {
        return ''
      }
    },

  }
}
