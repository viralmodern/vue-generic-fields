<template>
  <div>
    <v-autocomplete :label="optionsField.label"
                    :value="value" ref="choices"
                    :multiple="valueMultiple"
                    :items="optionsField.list"
                    :item-text="optionsField.itemText"
                    :item-value="optionsField.itemValue"
                    hide-details
                    @input="change"/>
  </div>
</template>

<script>
  export default {
    name: "FilterRuleValueChoices",
    props: {
      value: {},
      operator: {
        type: Object,
        default: () => ({})
      },
      attribute: {
        type: Object,
        default: () => ({})
      },
    },
    computed: {
      optionsField() {
        let {label, list, type, name, itemText, itemValue} = this.attribute
        return {
          label, list, type, name, itemText, itemValue
        }
      },
      valueMultiple() {
        let {valueMultiple} = this.operator
        return valueMultiple
      }
    },
    mounted () {
      // todo: error when change mode single to multiple
      this.$watch('valueMultiple', this.resetValue)
    },
    methods: {
      change(value) {
        this.$emit("input", {k: '', data: {value}})
      },
      resetValue() {
        let r = this.$refs['choices']
        if(r) {
          r.reset()
        }
      }
    }
  }
</script>

<style scoped>

</style>
