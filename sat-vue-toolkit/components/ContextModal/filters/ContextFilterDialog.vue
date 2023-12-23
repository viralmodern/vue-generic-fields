<template>
  <div>
<!--  RULE: {{rule}}-->
    <div class="rule-row mb-4">
      <v-select label="Operator"
                item-text="label"
                item-value="type"
                hide-details
                :items="operations"
                v-model="operator"/>
    </div>
    <template v-if="operator">
      <!--Content filter options-->
      <div>
        <template v-if="getOperatorDetail.valueCount > 0">
          <div class="rule-row mb-4">
            <component is="FilterRuleValue"
                       :operator="getOperatorDetail"
                       :attribute="attribute"
                       @input="v => changeValueRule(v, T.valueBefore)"/>
          </div>
        </template>
        <template v-if="getOperatorDetail.valueCount === 2">
          <div class="rule-row mb-4">
            <div class="caption">
              <strong class="text-line-center">And</strong>
            </div>
          </div>
          <div class="rule-row mb-4">
            <component is="FilterRuleValue"
                       :operator="getOperatorDetail"
                       :attribute="attribute"
                       @input="v => changeValueRule(v, T.valueAfter)"/>
            <!--<FilterRuleValue :operator="getOperatorDetail"
                             :attribute="attribute"/>-->
          </div>
        </template>
      </div>
      <div class="d-flex justify-end">
        <v-btn @click="saveRule" small depressed class="text-capitalize caption">Ok</v-btn>
        <div class="mx-1"></div>
        <div evt-close>
          <v-btn @click="cancelRule" small depressed class="text-capitalize caption">Cancel</v-btn>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  import { OPERATIONS } from "~/sat-vue-toolkit/components/slick-grid/configs/operations"
  import FilterRuleValue from "~/sat-vue-toolkit/components/ContextModal/filters/FilterRuleValue"

  const T = {
    valueBefore: "valueBefore",
    valueAfter: "valueAfter"
  }
  export default {
    name: "ContextFilterDialog",
    components: { FilterRuleValue },
    props: {
      operations: {
        type: Array,
        default: () => []
      },
      attribute: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        operator: null,
        rule: {},
        T
      }
    },
    computed: {
      getOperatorDetail () {
        let { operator } = this
        return OPERATIONS[operator] || {}
      }
    },
    watch: {
      attribute: {
        immediate: true,
        handler: "initRuleFilterField"
      }
    },
    methods: {
      initRuleFilterField (attribute) {
        if (!attribute) {
          return false
        }
        this.resetRule()
      },
      resetRule () {
        this.operator = null
        this.rule = {}
      },
      setRuleValue (_rule = {}) {
        let { rule, getOperatorDetail, attribute } = this
        let isAttributeStarts = false
        rule['value'] = rule['value'] || {}
        rule['value'] = {...rule['value'], ..._rule['value']}
        this.rule = { ...rule, ..._rule, isAttributeStarts, attribute, operator:  getOperatorDetail}
      },
      changeValueRule ($$data = {}, t = "") {
        let { k, data = {} } = $$data
        let value = {
          [t]: data.value
        }
        let rule = {
          value
        }
        this.setRuleValue(rule)
      },
      saveRule () {
        let {rule} = this
        this.$emit("input", rule)
      },
      cancelRule () {
        this.$emit("cancel")
      }
    }
  }
</script>

<style scoped lang="scss">
  .text-line-center {
    display: block;
    text-align: right;

  }
</style>

<style lang="scss">
  .search_box_filter {
    border: $border-light-color;
    display: block;
    padding: 5px 5px;
    outline: none !important;
    font-size: 12px;

    &:focus, &:active, &:visited {
    }

    &::-webkit-calendar-picker-indicator {
      /*display: none;*/
      outline: none;
    }
  }
</style>
