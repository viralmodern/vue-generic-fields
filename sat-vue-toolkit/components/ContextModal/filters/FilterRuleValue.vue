<template>
  <div>
    <component :is="getLayoutValueOfAttributeType"
               :attribute="attribute"
               :operator="operator"
               @input="$$data => $emit('input', $$data)"/>
  </div>
</template>

<script>
  import FilterRuleValueText from "./FilterRuleValueText"
  import FilterRuleValueNumber from "./FilterRuleValueNumber"
  import FilterRuleValueDateTime from "./FilterRuleValueDateTime"
  import FilterRuleValueChoices from "./FilterRuleValueChoices"
  import { ATTRIBUTE_FIELDS, FILTER_TYPES } from "~/sat-vue-toolkit/components/slick-grid/configs/attribute"

  export default {
    name: "FilterRuleValue",
    components: {
      FilterRuleValueChoices,
      FilterRuleValueDateTime,
      FilterRuleValueNumber,
      FilterRuleValueText
    },
    props: {
      attribute: {
        type: Object,
        default: () => ({})
      },
      operator: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      getLayoutValueOfAttributeType () {
        let { type } = this.attribute
        if (!type) {
          return false
        }
        let filterType = ATTRIBUTE_FIELDS[type].FILTER_TYPE
        switch (filterType) {
          case FILTER_TYPES.TEXT:
            return "FilterRuleValueText"
          case FILTER_TYPES.NUMBER:
            return "FilterRuleValueNumber"
          case FILTER_TYPES.LIST:
            return "FilterRuleValueChoices"
          case FILTER_TYPES.DATE_TIME:
            return "FilterRuleValueDateTime"
          default:
            return "FilterRuleValueText"
        }
      }
    }
  }
</script>

<style scoped>

</style>
