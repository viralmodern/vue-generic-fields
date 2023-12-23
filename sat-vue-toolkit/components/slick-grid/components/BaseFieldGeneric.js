import { SORT_TYPE } from "~/sat-vue-toolkit/components/slick-grid/configs/slickgrid.json"
import {
  getClassCell, getOperatorsAttribute
} from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
import { BUS_SOURCE } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"
import { $createMenuPortal } from "~/sat-vue-toolkit/functions/mouse"
export const BaseFieldGeneric = {
  props: {
    attribute: {
      type: Object,
      default: () => ({})
    },
    mainCellId: {
      type: String,
      default: () => ""
    }

  },
  data () {
    return {

    }
  },
  computed: {
    fieldName () {
      let { attribute } = this
      return attribute.name
    },
    fieldLabel () {
      let { attribute } = this
      return attribute.label
    },
    sortIndexLabel () {
      let { attribute } = this
      return attribute.sortIndexLabel
    },
    isMainCellId () {
      let { attribute, mainCellId } = this
      return attribute.name === mainCellId
    },
    isPinned () {
      let { attribute } = this
      return Boolean(attribute.pinned)
    },
    isHide () {
      let { attribute } = this
      return Boolean(attribute.hide)
    },
    isSortDown () {
      let { attribute } = this
      return Boolean(attribute.sort === 'DOWN')
    },
    hasSort () {
      let { attribute } = this
      let sortType = attribute.sort
      return sortType === SORT_TYPE.UP.TYPE || sortType === SORT_TYPE.DOWN.TYPE
    },

    attributeWidth () {
      let { attribute } = this
      return attribute.width
    },
    faviconLink() {
      let { attribute } = this
      return attribute['faviconLink'] || attribute['faviconValue']
    },
    getClassCell() {
      let { attribute } = this
      return getClassCell(attribute.type)
    },
    strFieldId() {
      let { attribute } = this
      return attribute['strFieldId']
    },
    operationsField() {
      let { attribute } = this
      return getOperatorsAttribute(attribute['type']) || []
    }
  },
  methods: {
    sortField(evt) {
      evt.preventDefault()
      let {attribute} = this
      let sortType, isSort
      if (attribute.sort === SORT_TYPE.DEFAULT.TYPE) {
        sortType = SORT_TYPE.UP.TYPE
        isSort = true
      } else if (attribute.sort === SORT_TYPE.UP.TYPE) {
        sortType = SORT_TYPE.DOWN.TYPE
        isSort = true
      } else if (attribute.sort === SORT_TYPE.DOWN.TYPE) {
        sortType = SORT_TYPE.DEFAULT.TYPE
        isSort = false
      } else {
        sortType = SORT_TYPE.UP.TYPE
        isSort = true
      }
      let name = attribute.name
      this.$emit("sort-field", { item: { sortType, name }, isSort })
      evt.stopPropagation()
    },
    showContext(evt) {
      evt.preventDefault()
      let {attribute, operationsField} = this
      this.$emit("show-context", {k: 'filter_column', data: {attribute, operationsField, evt}})
      evt.stopPropagation()
    },
    clickFieldSetting(evt) {
      evt.preventDefault()
      let {attribute} = this
      let options = {
        attribute,
        evt
      }
      // todo: Emit events for setting field header
      this.$trigger(BUS_SOURCE.HEADER, options)
      evt.stopPropagation()
    },
    clickFieldFilter(evt, refElm) {
      evt.preventDefault()
      let {attribute, operationsField} = this
      let options = {
        attribute,
        evt,
        operationsField,
        $$execute: (rule) => {
          this.$emit('setRuleFilterField', {rule})
        }
      }
      // todo: Emit events for setting field header
      this.$trigger(BUS_SOURCE.FILTER_FIELD, options)
      evt.stopPropagation()
    },

  },
  render () {
    return this.$scopedSlots.default({
      isHide: this.isHide,
      isMainCellId: this.isMainCellId,
      isPinned: this.isPinned,
      attributeName: this.fieldName,
      attributeLabel: this.fieldLabel,
      attributeWidth: this.attributeWidth,
      sortField: this.sortField,
      // showContext: this.showContext,
      showContext: this.clickFieldFilter,
      clickFieldSetting: this.clickFieldSetting,
      clickFieldFilter: this.clickFieldFilter,
      strFieldId: this.strFieldId,
      hasSort: this.hasSort,
      isSortDown: this.isSortDown,
      sortIndexLabel: this.sortIndexLabel,
      getClassCell: this.getClassCell,
      faviconLink: this.faviconLink,
      operationsField: this.operationsField,
    })
  }
}
