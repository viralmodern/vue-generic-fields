import { BUS_SOURCE } from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
import baseCellProps from "~/sat-vue-toolkit/components/slick-grid/configs/props/baseCellProps"

export default {
  props: {
    ...baseCellProps
  },
  computed: {
    busEventNameSource () {
      try {
        return BUS_SOURCE.MENU
        // return ATTRIBUTE_FIELDS[this.attributeType].BUS_EVENT_NAME_SOURCE
      } catch (e) {
        return "attribute-bus-name-evt"
      }
    },
    editableCell () {
      let {isOwnerRow} = this
      let { readOnly } = this.$$attribute
      return isOwnerRow && Boolean(readOnly) === false
    },
    reduceOptionsAttribute () {
      // todo: options attribute combined with row
      let { options } = this.$$attribute
      const { row } = this
      if (options && typeof options === "function") {
        let op = options.bind(row)
        return op()
      }
      return {}
    },
    getFieldTextContent() {
      // todo: custom main text | title row
      const { row } = this
      let { textContent } = this.$$attribute
      if(textContent && typeof textContent === "function") {
        let op = textContent.bind(row)
        return op()
      }
      return false
    },
    $$attribute () {
      const {
        itemText, itemValue, itemColor,
        multiple, chips, list,
        name, label, type,
        innerScope, shortLabelTitle,
        itemAvatar,
        returnObject,
        pathLink,
        pathLinkValue,
        pathLinkText,
        endPointList,
        readOnly,
        options,
        textContent,
        isHover,
        enabledTooltip,
        enabledTrendValue,
        groupBy,
        colorField,
        darkField,
        optionalField,
        dotPropText,
        itemFavicon,
        tooltipsValue,
      } = this.attribute
      return {
        itemText,
        itemValue,
        itemColor,
        multiple,
        chips,
        list,
        items: list,
        name,
        label,
        type,
        innerScope,
        shortLabelTitle,
        itemAvatar,
        returnObject,
        pathLink,
        pathLinkValue,
        pathLinkText,
        endPointList,
        readOnly,
        options,
        textContent,
        groupBy,
        isHover: Boolean(isHover),
        enabledTooltip: Boolean(enabledTooltip),
        enabledTrendValue: Boolean(enabledTrendValue),
        colorField,
        darkField,
        optionalField,
        dotPropText,
        itemFavicon,
        tooltipsValue,
      }
    }
  },
  methods: {
    $$execute (data) {
      console.log('updateContent',data)
      this.$emit("updateContent", data)
    },
    $$openDropDownSource (e, options = {}) {
      let { editableCell, uniqueId, row } = this
      if (!editableCell) {
        return
      }
      let { endPointList} = this.$$attribute
      let endPointListTemp = ""
      if (typeof endPointList === "function") {
        let idRow = row[uniqueId]
        endPointListTemp = endPointList(idRow)
      } else {
        endPointListTemp = endPointList
      }
      console.log("endPointList", endPointListTemp)
      let tempOptions = {
        e,
        k: this.cellPk,
        endPoint: this.endPoint,
        endPointList: endPointListTemp,
        val: this.val,
        $$execute: this.$$execute,
        attribute: this.attribute
      }
      try {
        let data = { ...tempOptions, ...options }
        this.$eventHub.$emit(this.busEventNameSource, data)
      } catch (e) {

      }
    },


  },

}
