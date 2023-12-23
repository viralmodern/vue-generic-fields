<template>
  <div>
    <template v-if="emptyValueFilter">

    </template>
    <template v-else>
      <component :is="layoutBuilderValue"
                 :sources="sources"
                 v-model="localState"
                 :itemText="itemText"
                 :itemValue="itemValue"
                 :isBetweenOperation="isBetweenOperation">
      </component>
    </template>
  </div>
</template>

<script>
import BuilderDateTime from "./BuilderDateTime"
import BuilderNumber from "./BuilderNumber"
import BuilderTextField from "./BuilderTextField"
import BuilderBetweenDateTime from "./BuilderBetweenDateTime"
import BuilderList from "./BuilderList"
import {vBindField} from "@/sat-vue-toolkit/components/FilterBuilder/configs"
import {ATTRIBUTE_FIELDS, FILTER_TYPES} from "@/sat-vue-toolkit/components/slick-grid/configs/attribute"
import {emptyValueFilter, OPERATIONS} from "@/sat-vue-toolkit/components/slick-grid/configs/operations"
import {isBetweenOperation} from "@/sat-vue-toolkit/components/slick-grid/configs/operations"

export default {
  name: "ValueFilterOptions",
  filters: {
    isDateTime(attributeType) {
      return attributeType === ATTRIBUTE_FIELDS.DATE_TIME.TYPE || attributeType === ATTRIBUTE_FIELDS.DATE.TYPE
    }
  },
  components: {
    BuilderTextField,
    BuilderNumber,
    BuilderDateTime,
    BuilderBetweenDateTime,
    BuilderList
  },
  props: {
    ATTRIBUTE_FIELDS: {
      default: () => ATTRIBUTE_FIELDS
    },
    item: {},
    sources: {
      type: Array,
      default: () => []
    },
    itemText: {},
    itemValue: {},
    attributeType: {},
    operatorType: {},
    vBind: {
      type: Object,
      default: () => {
        return {
          ...vBindField
        }
      }
    },
    value: {
      type: Object,
      default: () => ({
        valueBefore: "",
        valueAfter: ""
      })
    }
  },
  computed: {
    emptyValueFilter() {
      return emptyValueFilter(this.operatorType)
    },
    isBetweenOperation() {
      return isBetweenOperation(this.operatorType)
    },
    localState: {
      get() {
        return this.item.value
      },
      set(localState) {
        this.$emit("input", localState)
      }
    },
    layoutBuilderValue() {
      let filterType = ATTRIBUTE_FIELDS[this.attributeType].FILTER_TYPE
      switch (filterType) {
        case FILTER_TYPES.DATE_TIME:
          if (this.operatorType === OPERATIONS.IsBetween.type) {
            return "BuilderBetweenDateTime"
          }
          return "BuilderDateTime"
        case FILTER_TYPES.TEXT:
          return "BuilderTextField"
        case FILTER_TYPES.NUMBER:
          return "BuilderNumber"
        case FILTER_TYPES.LIST:
          return "BuilderList"
        default:
          return false
      }
    }
  },
  watch: {},
  methods: {}
}
</script>

<style scoped></style>
